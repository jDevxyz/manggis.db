const { EventEmitter } = require('events')
const { MongoClient } = require('mongodb')
const { strictEqual, notStrictEqual, deepStrictEqual } = require('assert')
const { Error, TypeError, RangeError } = require('../localization')
const _ = require('lodash')

const _init = Symbol('init')
const _debugStackTrace = Symbol('debugStackTrace')
const _check = Symbol('check')

/**
 * @module Manggis
 * @extends {EventEmitter}
 * @author Riichi_Rusdiana#6815
 */
class Manggis extends EventEmitter {
  /**
   * Construct a Manggis Instance.
   * @constructor
   * @param {*} url Mongodb URI connection string.
   * @param {*} db Database name.
   * @param {*} collection Collection name.
   * @param  {...any} args Any argument that will be passed into EventEmitter.
   */
  constructor (url, db, collection, ...args) {
    super(...args)

    this.url = url
    this.db = db
    this.collection = collection

    // Initiate the listener
    this[_init]()
  }

  async [_init] () {
    MongoClient.connect(this.url, function (err, client) {
      strictEqual(null, err)
      /**
       * Emit error so the developers can handle it
       */
      this.emit('connected', err)
      const database = client.db(this.db)
      /**
       * Send the database connection and session outside the emitter
       */
      this.emit('internal:connector', database)
      /**
       * Listen to data Insertion event
       * @typedef DataInsertion always prefixed with `internal:${methodType}`
       * - insertOne => callback(collection, data)
       * - insertMany => callback(collection, array) => emit(databaseInserted, callback(err, result))
       * - find => callback(collection, filter) => emit(databaseLookup, callback(err, document))
       * - close => callback(void)
       */
      this.on('internal:insert', (collection, array) => {
        if (!this[_check](array, 'array')) throw new Error('INVALID_OPTION', 'array', 'proper valid array')
        const coll = database.collection(collection)
        coll.insertMany(array, (err, result) => {
          this.emit('internal:databaseInserted', err, result)
          strictEqual(err, null)
        })
      })
      this.on('internal:insertOne', (collection, data) => {
        const coll = database.collection(collection)
        coll.insertOne(data, (err, result) => {
          this.emit('internal:databaseInserted', err, result)
          strictEqual(err, null)
        })
      })
      /**
       * filter should be `{ 'a': 3 }` and such, as mentioned [here](https://github.com/mongodb/node-mongodb-native#find-documents-with-a-query-filter)
       */
      this.on('internal:find', (collection, filter) => {
        const coll = database.collection(collection)
        coll.find(filter).toArray((err, document) => {
          this.emit('internal:databaseLookup', err, document)
          strictEqual(err, null)
        })
      })
      this.on('internal:findOne', (collection, filter) => {
        const coll = database.collection(collection)
        coll.findOne(filter, (err, document) => {
          this.emit('internal:databaseLookup', err, document)
          strictEqual(err, null)
        })
      })

      /**
       * data should be `{ $set: { b : 1 } }` and such, as mentioned [here](https://github.com/mongodb/node-mongodb-native#update-a-document)
       */
      this.on('internal:update', (collection, filter, data) => {
        const coll = database.collection(collection)
        coll.updateMany(filter, data, (err, document) => {
          this.emit('internal:databaseUpdated', err, document)
          strictEqual(err, null)
        })
      })
      this.on('internal:updateOne', (collection, filter, data) => {
        const coll = database.collection(collection)
        coll.updateOne(filter, data, (err, document) => {
          this.emit('internal:databaseUpdated', err, document)
          strictEqual(err, null)
        })
      })

      /**
       * Emits connection close
       */
      this.on('internal:close', () => {
        client.close((err) => {
          this.emit('disconnected', err)
        })
      })
    })
  }

  /**
   * To run an Array of debugging stack trace.
   * @private
   * @method _debugStackTrace
   * @param {Array<String>} array The string that will be sent to the Debugger `.on()` event.
   */
  [_debugStackTrace] (array) {
    if (_.isArray(array)) {
      array.forEach(element => {
        const debugtrace = this.debugHeader + element
        return this.emit('debug', debugtrace)
      })
    } else {
      throw new TypeError('EMITTED', 'passed argument is not Array!')
    }
  }

  /**
   * @typedef DesiredValue
   * - array
   * - string
   * - integer
   * - not a number
   * - regexp
   */
  /**
   * To check wheter a value is a proper `DesiredValue`.
   * @private
   * @method _check
   * @param {*} data The data that will be verified.
   * @param {DesiredValue} desired an instance of `DesiredValue`
   */
  [_check] (data, desired) {
    switch (desired) {
      case 'array':
        return _.isArray(data)
      case 'string':
        return _.isString(data)
      case 'integer':
        return _.isInteger(data)
      case 'not a number':
        return _.isNaN(data)
      case 'regexp':
        return _.isRegExp(data)
      default:
        break
    }
  }
}

module.exports = Manggis
