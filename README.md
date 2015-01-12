![Jarjs Logo](https://camo.githubusercontent.com/434818ccd1140bdb42053c8584d39e8ce81e1cf6/687474703a2f2f6935382e74696e797069632e636f6d2f323831767166612e6a7067)
# Jarjs
A minimalistic Javascript in-memory database
## Status
  **Warning!** JarJS is under development! the API is not yet finished! use this as preview only, not for production puprpose.
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
db.collection('users').insert({
     username : 'John',
     email : 'john@mail.com'
})
//Query the database
db.collection('users').findOne({emaik : 'john@mail.com'});
```
