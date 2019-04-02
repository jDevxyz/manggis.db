const _ = require('lodash')
const PromiseProvider = require('./PromiseProvider')

// Declare private methods using Symbol
const _check = Symbol('check')

/**
 * A Module to cache data into memory for ease of use.
 * Similar to map, Internal Shift extends with a bunch of utilities and will be used throughout Manggis.db
 * @module IntrShift
 * @extends {Map}
 * @author Riichi_Rusdiana
 */
class IntrShift extends Map {
  /**
   * Construct a data caching session.
   * @constructor
   * @param {*} iterable An iterable data.
   */
  constructor (iterable) {
    super(iterable)

    this._Array = null
    this._ArrayKeymap = null
    this.iterable = iterable
  }

  set (key, val) {
    this._Array = null
    this._ArrayKeymap = null
    return super.set(key, val)
  }
  delete (key) {
    this._Array = null
    this._ArrayKeymap = null
    return super.delete(key)
  }

  /**
   * Converts the content of Internal Shift into Array. This array will be cached into the Internal Shift.
   * Reconstruction will occur if `.delete()` and `.set()` is triggered.
   * @method toArray
   * @param {boolean} cached Array Caching on Internal Shift. Preferable true.
   * @returns {Array}
   */
  toArray (cached = true) {
    if (cached) {
      // eslint-disable-next-line no-return-assign
      return this._Array = [...this.values()]
    }
    return Array.from(this.values())
  }

  /**
   * Converts the content of Internal Shift into JavaScript Object Notation. This method will not be cached.
   * @method toJSON
   * @returns {JSON}
   */
  toJSON () {
    return this.map(element => typeof element.toJSON === 'function' ? element.toJSON() : PromiseProvider.flat(element))
  }

  /**
   * Maps each item into another value, similar to `Array.map()`.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
   * @method map
   * @param {*} func Function that produces an element of the new array, taking three arguments.
   * @param {*} thisInst Value to use as `this` when executing function.
   * @returns {Array<any>}
   */
  map (func, thisInst) {
    if (typeof thisInst !== 'undefined') func = func.bind(thisInst)
    const final = new Array(this.size)
    let i = 0
    for (const [key, val] of this) final[i++] = func(val, key, this)
    return final
  }

  /**
   * Clone an instance of Internal Shift
   * @method clone
   * @returns {IntrShift}
   */
  clone () {
    return new this.constructor[Symbol.species](this)
  }

  /**
   * Merge two or more of Internal Shift instance.
   * @method merge
   * @param {...IntrShift} intrshift Internal Shift instance to merge.
   * @returns {IntrShift}
   * @example const newColl = someColl.concat(someOtherColl, anotherColl, ohBoyAColl);
   */
  merge (...intrshift) {
    const newIntr = this.clone()
    for (const element of intrshift) {
      for (const [key, val] of element) newIntr.set(key, val)
    }
    return newIntr
  }

  /**
   * Filter an Internal Shift instance with a function.
   * Function should return boolean.
   * @method filter
   * @param {Function} func The function to test with (should return boolean).
   * @param {*} [thisInst] Value to use as `this` when executing function.
   * @returns {IntrShift}
   * @example intrshift.filter(data => data.uuid === '1234567890');
   */
  filter (func, thisInst) {
    if (typeof thisInst !== 'undefined') func = func.bind(thisInst)
    const results = new this.constructor[Symbol.species]()
    for (const [key, val] of this) {
      if (func(val, key, this)) results.set(key, val)
    }
    return results
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
      default:
        break
    }
  }
}

module.exports = IntrShift
