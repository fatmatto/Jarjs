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
var db = new Jar('myDatabase');

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
