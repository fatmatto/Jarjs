![Jarjs Logo](https://camo.githubusercontent.com/434818ccd1140bdb42053c8584d39e8ce81e1cf6/687474703a2f2f6935382e74696e797069632e636f6d2f323831767166612e6a7067)
# Jarjs
A minimalistic Javascript in-memory database
## Status
  **Warning!** JarJS is under development! the API is not yet finished! use this as preview only, not for production puprpose.

## Roadmap
* Persistance
* Standalone server


## Install

```
npm install jarjs
```

## Quick start

```javascript
var Jar = require('jarjs');
var db = new Jar({name : 'myDatabase'});

//create a new collection
db.createCollection('users');

//add a document to the collection
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
//Update a document
db.collection('users').update({email : 'john@mail.com'},{data : {salary : 4000}})

//Query the database
db.collection('users').findOne({email : 'john@mail.com'});
```
