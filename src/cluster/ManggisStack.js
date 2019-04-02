const { Error, TypeError, RangeError } = require('../localization')
const { parseConnectionString } = require('mongodb-core')
const { strictEqual } = require('assert')
const { get } = require('lodash')
const bluebird = require('bluebird')
const IntrShift = require('./IntrShift')
const Manggis = require('./Manggis')
const PromiseProvider = require('./PromiseProvider')

// Private methods
const _init = Symbol('init')
const _parseUrl = Symbol('parseUrl')
const _uriBuilder = Symbol('uriBuilder')

/**
 * @module ManggisStack
 * @extends {IntrShift}
 * @author Riichi_Rusdiana#6815
 */
class ManggisStack extends IntrShift {
  /**
   * A constructor for ManggisStack.
   * @constructor
   * @param {*} session
   * @param {*} collection
   * @param {*} iterable
   */
  constructor (session = {}, collection, iterable) {
    super(iterable)

    this.user = session.user
    this.password = session.password
    this.uri = session.uri
    // The database name
    this.provider = session.provider
    // The database collection
    this.collection = collection

    var options = {
      useNewUrlParser: true
    }

    this.url = this[_uriBuilder](this.user, this.password, this.uri, 'DEFAULT')
    this.options = options

    this.client = new Manggis(this.url, this.provider, this.collection)
    this[_init]()
  }

  fetchEverything () {
    this.client.on('internal:connector', (database) => {
      const coll = database.collection(this.collection)
      coll.find({}).toArray((err, document) => {
        return new bluebird.Promise((resolve, reject) => {
          strictEqual(err, null)
          document.forEach((element) => {
            super.set(element._id, element)
          })
          resolve()
        })
      })
    })
  }

  async [_init] () {
    await this.fetchEverything()
  }

  /**
   * Build a couple of strings into encoded URI component.
   * @method _uriBuilder
   * @private
   * @param {String} user MongoDB username
   * @param {String} password MongoDB password
   * @param {String} url MongoDB server URL. Also you need to include the port, for example `localhost:27017`
   * @param {String} authMechanism Authentication mechanism that will be used for connection
   * @returns {String} An encoded URI for Mongodb connection
   */
  [_uriBuilder] (user, password, url, authMechanism) {
    const encodedUser = encodeURIComponent(user)
    const encodedPassword = encodeURIComponent(password)
    return `mongodb://${encodedUser}:${encodedPassword}@${url}/?authMechanism=${authMechanism}`
  }

  [_parseUrl] () {
    parseConnectionString(this.uri, this.options, (err, parsed) => {
      strictEqual(err, null)
      return PromiseProvider.Promise(parsed, err)
    })
  }
}

module.exports = ManggisStack
