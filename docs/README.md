## Modules

<dl>
<dt><a href="#module_IntrShift">IntrShift</a> ⇐ <code>Map</code></dt>
<dd><p>A Module to cache data into memory for ease of use.
Similar to map, Internal Shift extends with a bunch of utilities and will be used throughout Manggis.db</p>
</dd>
<dt><a href="#module_Manggis">Manggis</a> ⇐ <code>EventEmitter</code></dt>
<dd></dd>
<dt><a href="#module_ManggisStack">ManggisStack</a> ⇐ <code>IntrShift</code></dt>
<dd></dd>
<dt><a href="#module_PromiseProvider">PromiseProvider</a></dt>
<dd><p>A Module to provide Promise Conversion, Buffer Utility, and stuff.</p>
</dd>
</dl>

<a name="module_IntrShift"></a>

## IntrShift ⇐ <code>Map</code>
A Module to cache data into memory for ease of use.Similar to map, Internal Shift extends with a bunch of utilities and will be used throughout Manggis.db

**Extends**: <code>Map</code>  
**Author**: Riichi_Rusdiana  

* [IntrShift](#module_IntrShift) ⇐ <code>Map</code>
    * [~IntrShift](#module_IntrShift..IntrShift)
        * [new IntrShift(iterable)](#new_module_IntrShift..IntrShift_new)
    * [~toArray(cached)](#module_IntrShift..toArray) ⇒ <code>Array</code>
    * [~toJSON()](#module_IntrShift..toJSON) ⇒ <code>JSON</code>
    * [~map(func, thisInst)](#module_IntrShift..map) ⇒ <code>Array.&lt;any&gt;</code>
    * [~clone()](#module_IntrShift..clone) ⇒ <code>IntrShift</code>
    * [~merge(...intrshift)](#module_IntrShift..merge) ⇒ <code>IntrShift</code>
    * [~filter(func, [thisInst])](#module_IntrShift..filter) ⇒ <code>IntrShift</code>
    * [~DesiredValue](#module_IntrShift..DesiredValue)

<a name="module_IntrShift..IntrShift"></a>

### IntrShift~IntrShift
**Kind**: inner class of [<code>IntrShift</code>](#module_IntrShift)  
<a name="new_module_IntrShift..IntrShift_new"></a>

#### new IntrShift(iterable)
Construct a data caching session.


| Param | Type | Description |
| --- | --- | --- |
| iterable | <code>\*</code> | An iterable data. |

<a name="module_IntrShift..toArray"></a>

### IntrShift~toArray(cached) ⇒ <code>Array</code>
Converts the content of Internal Shift into Array. This array will be cached into the Internal Shift.Reconstruction will occur if `.delete()` and `.set()` is triggered.

**Kind**: inner method of [<code>IntrShift</code>](#module_IntrShift)  

| Param | Type | Description |
| --- | --- | --- |
| cached | <code>boolean</code> | Array Caching on Internal Shift. Preferable true. |

<a name="module_IntrShift..toJSON"></a>

### IntrShift~toJSON() ⇒ <code>JSON</code>
Converts the content of Internal Shift into JavaScript Object Notation. This method will not be cached.

**Kind**: inner method of [<code>IntrShift</code>](#module_IntrShift)  
<a name="module_IntrShift..map"></a>

### IntrShift~map(func, thisInst) ⇒ <code>Array.&lt;any&gt;</code>
Maps each item into another value, similar to `Array.map()`.

**Kind**: inner method of [<code>IntrShift</code>](#module_IntrShift)  
**See**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>\*</code> | Function that produces an element of the new array, taking three arguments. |
| thisInst | <code>\*</code> | Value to use as `this` when executing function. |

<a name="module_IntrShift..clone"></a>

### IntrShift~clone() ⇒ <code>IntrShift</code>
Clone an instance of Internal Shift

**Kind**: inner method of [<code>IntrShift</code>](#module_IntrShift)  
<a name="module_IntrShift..merge"></a>

### IntrShift~merge(...intrshift) ⇒ <code>IntrShift</code>
Merge two or more of Internal Shift instance.

**Kind**: inner method of [<code>IntrShift</code>](#module_IntrShift)  

| Param | Type | Description |
| --- | --- | --- |
| ...intrshift | <code>IntrShift</code> | Internal Shift instance to merge. |

**Example**  
```js
const newColl = someColl.concat(someOtherColl, anotherColl, ohBoyAColl);
```
<a name="module_IntrShift..filter"></a>

### IntrShift~filter(func, [thisInst]) ⇒ <code>IntrShift</code>
Filter an Internal Shift instance with a function.Function should return boolean.

**Kind**: inner method of [<code>IntrShift</code>](#module_IntrShift)  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | The function to test with (should return boolean). |
| [thisInst] | <code>\*</code> | Value to use as `this` when executing function. |

**Example**  
```js
intrshift.filter(data => data.uuid === '1234567890');
```
<a name="module_IntrShift..DesiredValue"></a>

### IntrShift~DesiredValue
**Kind**: inner typedef of [<code>IntrShift</code>](#module_IntrShift)  
<a name="module_Manggis"></a>

## Manggis ⇐ <code>EventEmitter</code>
**Extends**: <code>EventEmitter</code>  
**Author**: Riichi_Rusdiana#6815  

* [Manggis](#module_Manggis) ⇐ <code>EventEmitter</code>
    * [~Manggis](#module_Manggis..Manggis)
        * [new Manggis(url, db, collection, ...args)](#new_module_Manggis..Manggis_new)
    * [~DataInsertion](#module_Manggis..DataInsertion) : <code>methodType</code>
    * [~DesiredValue](#module_Manggis..DesiredValue)

<a name="module_Manggis..Manggis"></a>

### Manggis~Manggis
**Kind**: inner class of [<code>Manggis</code>](#module_Manggis)  
<a name="new_module_Manggis..Manggis_new"></a>

#### new Manggis(url, db, collection, ...args)
Construct a Manggis Instance.


| Param | Type | Description |
| --- | --- | --- |
| url | <code>\*</code> | Mongodb URI connection string. |
| db | <code>\*</code> | Database name. |
| collection | <code>\*</code> | Collection name. |
| ...args | <code>any</code> | Any argument that will be passed into EventEmitter. |

<a name="module_Manggis..DataInsertion"></a>

### Manggis~DataInsertion : <code>methodType</code>
Listen to data Insertion event

**Kind**: inner typedef of [<code>Manggis</code>](#module_Manggis)  
<a name="module_Manggis..DesiredValue"></a>

### Manggis~DesiredValue
**Kind**: inner typedef of [<code>Manggis</code>](#module_Manggis)  
<a name="module_ManggisStack"></a>

## ManggisStack ⇐ <code>IntrShift</code>
**Extends**: <code>IntrShift</code>  
**Author**: Riichi_Rusdiana#6815  

* [ManggisStack](#module_ManggisStack) ⇐ <code>IntrShift</code>
    * [~ManggisStack](#module_ManggisStack..ManggisStack)
        * [new ManggisStack(session, collection, iterable)](#new_module_ManggisStack..ManggisStack_new)

<a name="module_ManggisStack..ManggisStack"></a>

### ManggisStack~ManggisStack
**Kind**: inner class of [<code>ManggisStack</code>](#module_ManggisStack)  
<a name="new_module_ManggisStack..ManggisStack_new"></a>

#### new ManggisStack(session, collection, iterable)
A constructor for ManggisStack.


| Param | Type |
| --- | --- |
| session | <code>\*</code> | 
| collection | <code>\*</code> | 
| iterable | <code>\*</code> | 

<a name="module_PromiseProvider"></a>

## PromiseProvider
A Module to provide Promise Conversion, Buffer Utility, and stuff.

**Author**: Riichi_Rusdiana#6815  

* [PromiseProvider](#module_PromiseProvider)
    * [~Promise(resolve, reject)](#module_PromiseProvider..Promise) ⇒ <code>Promise.&lt;any&gt;</code>
    * [~toBuffer(arrayBuffer)](#module_PromiseProvider..toBuffer) ⇒ <code>Buffer</code>
    * [~toArrayBuffer(string)](#module_PromiseProvider..toArrayBuffer) ⇒ <code>ArrayBuffer</code>
    * [~flat(obj, ...props)](#module_PromiseProvider..flat)
    * [~DesiredValue](#module_PromiseProvider..DesiredValue)

<a name="module_PromiseProvider..Promise"></a>

### PromiseProvider~Promise(resolve, reject) ⇒ <code>Promise.&lt;any&gt;</code>
Promisify an object.

**Kind**: inner method of [<code>PromiseProvider</code>](#module_PromiseProvider)  

| Param | Type | Description |
| --- | --- | --- |
| resolve | <code>\*</code> | A value that will be resolved. |
| reject | <code>Error</code> | A value that will be rejected. Preferable an error |

<a name="module_PromiseProvider..toBuffer"></a>

### PromiseProvider~toBuffer(arrayBuffer) ⇒ <code>Buffer</code>
Converts an ArrayBuffer or string to a Buffer.

**Kind**: inner method of [<code>PromiseProvider</code>](#module_PromiseProvider)  

| Param | Type | Description |
| --- | --- | --- |
| arrayBuffer | <code>ArrayBuffer</code> \| <code>string</code> | ArrayBuffer to convert. |

<a name="module_PromiseProvider..toArrayBuffer"></a>

### PromiseProvider~toArrayBuffer(string) ⇒ <code>ArrayBuffer</code>
Converts a string to an ArrayBuffer.

**Kind**: inner method of [<code>PromiseProvider</code>](#module_PromiseProvider)  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | Should be a value of string to convert. |

<a name="module_PromiseProvider..flat"></a>

### PromiseProvider~flat(obj, ...props)
Flatten object into a flat instance.

**Kind**: inner method of [<code>PromiseProvider</code>](#module_PromiseProvider)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | An object that will be converted into flat instance. |
| ...props | <code>any</code> |  |

<a name="module_PromiseProvider..DesiredValue"></a>

### PromiseProvider~DesiredValue
**Kind**: inner typedef of [<code>PromiseProvider</code>](#module_PromiseProvider)  
