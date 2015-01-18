![Jarjs Logo](https://camo.githubusercontent.com/434818ccd1140bdb42053c8584d39e8ce81e1cf6/687474703a2f2f6935382e74696e797069632e636f6d2f323831767166612e6a7067)
# Jarjs
A minimalistic Javascript in-memory database
## Status
  **Warning!** JarJS is under development! the API is not yet finished! use this as preview only, not for production puprpose.

## Roadmap
* Persistance
* Standalone server
* Key-Value capabilities


## Install

```
npm install jarjs
```

## Quick start

```javascript
var Jar = require('jarjs');
var db = new Jar({name : 'myDatabase'});

/* OPERATIONS ON DOCUMENTS */

//Creates a new collection
db.createCollection('users');

//Adds a document to the collection
db
.collection('users')
.insert({
     name : 'John',
     email : 'john@mail.com',
     data : {
       skills : ['javascript','nodejs'],
       salary : 3000
     }
});
//Updates a document
db.collection('users').update({email : 'john@mail.com'},{data : {salary : 4000}})

//Query the database
db.collection('users').findOne({email : 'john@mail.com'});

/* OPERATION ON VALUES */

//Creates a new key value pair
db.set('myKey','myValue');

//Returns 'myValue'
db.get('myKey');

//Returns undefined
db.get('wrongKey');

//Deletes the myKey pair
db.unset('myKey');

/* OPERATIONS ON LISTS */

//Creates an empty list with 'myList' key
db.list('myList');

//pushes an element on the left of the list
db.lpush('myList','LEFT');

//pushes an element on the right of the list
db.rpush('myLyst','RIGHT');

//deletes every key
db.flushall();

```
