const bluebird = require('bluebird')
const { Error } = require('../localization')
const _ = require('lodash')

// Private method
const _check = Symbol('check')

/**
 * A Module to provide Promise Conversion, Buffer Utility, and stuff.
 * @module PromiseProvider
 * @author Riichi_Rusdiana#6815
 */
class PromiseProvider {
  constructor () {
    throw new Error('NO_CONSTRUCTOR', this.constructor.name)
  }
  /**
   * Promisify an object.
   * @method Promise
   * @param {*} resolve A value that will be resolved.
   * @param {Error} reject A value that will be rejected. Preferable an error
   * @returns {Promise<any>}
   */
  static Promise (resolve, reject = undefined) {
    return new bluebird.Promise((res, rej) => {
      res(resolve)
      // Reject a value if the second parameter is not undefined
      if (typeof reject !== 'undefined') rej(reject)
    })
  }

  /**
   * Converts an ArrayBuffer or string to a Buffer.
   * @method toBuffer
   * @param {ArrayBuffer|string} arrayBuffer ArrayBuffer to convert.
   * @returns {Buffer}
   */
  static toBuffer (arrayBuffer) {
    if (typeof arrayBuffer === 'string') arrayBuffer = PromiseProvider.toArrayBuffer(arrayBuffer)
    return Buffer.from(arrayBuffer)
  }

  /**
   * Converts a string to an ArrayBuffer.
   * @method toArrayBuffer
   * @param {string} string Should be a value of string to convert.
   * @returns {ArrayBuffer}
   */
  static toArrayBuffer (string) {
    const buffer = new ArrayBuffer(string.length * 2)
    const view = new Uint16Array(buffer)
    for (var i = 0, strLen = string.length; i < strLen; i++) view[i] = string.charCodeAt(i)
    return buffer
  }

  /**
   * Flatten object into a flat instance.
   * @method flat
   * @param {*} obj An object that will be converted into flat instance.
   * @param  {...any} props
   */
  static flat (obj, ...props) {
    if (!this[_check](obj, 'object')) return obj

    // Assign object
    props = Object.assign(...Object.keys(obj).filter(k => !k.startsWith('_')).map(k => ({ [k]: true })), ...props)

    const out = {}

    for (let [prop, newProp] of Object.entries(props)) {
      if (!newProp) continue
      newProp = newProp === true ? prop : newProp

      const element = obj[prop]
      const elemIsObj = this[_check](element, 'object')
      const valueOf = elemIsObj && typeof element.valueOf === 'function' ? element.valueOf() : null

      if (element instanceof require('./IntrShift')) out[newProp] = Array.from(element.keys())
      else if (Array.isArray(element)) out[newProp] = element.map(e => PromiseProvider.flatten(e))
      else if (typeof valueOf !== 'object') out[newProp] = valueOf
      else if (!elemIsObj) out[newProp] = element
    }

    // return the result
    return out
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
   * @param {*} data
   * @param {DesiredValue} desired
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
      case 'object':
        return _.isObject(data)
      case 'object like':
        return _.isObjectLike(data)
      default:
        break
    }
  }
}

module.exports = PromiseProvider
