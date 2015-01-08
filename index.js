/**
* SOME LICENSE HURR DURR
*
*
**/

(function(){
  var fs = require('fs');
  var _ = require('highland');
  var DEBUGGING = true;

  function debug (message) {
    if (DEBUGGING)
      console.log(message)
  }

  var applyUpdateToDoc = function(update) {
    return function(doc){
      for (var k in update)
        doc[k] = update[k];
    }

  }

  var matchDoc = function(doc){
    var flag = true
    for (var q in query)
      if (doc[q] !== query[q])
        flag = false
    return flag;
  }

  /**
  * In memory json data store for javascript
  */
  function Jar(dbname) {
    this.dbname = dbname;
    this.collections = {};
    this._cache = {};
    debug('Created database '+dbname)
  }

  /**
  *
  */
  function Collection(collection_name) {
    this.documents = [];
    this.name = collection_name;
  }

  /**
  *
  */
  Collection.prototype.insert = function(document) {
    debug('inserting an object: \n '+JSON.stringify(document));
    this.documents.push(document);
    debug('The collection '+this.name+" has "+this.documents.length+" documents;");
  }

  /**
  *
  */
  Collection.prototype.update = function(query,update,options) {

    if ('undefined' !== typeof options && options.hasOwnProperty('multi') && options.multi === true){
      _(this.documents)
      .where(query)
      .each(applyUpdateToDoc(update))
    }
    else {
      console.log("else")
      _(this.documents)
      .findWhere(query)
      .each(applyUpdateToDoc(update))
    }



  }

  /**
  *
  */
  Collection.prototype.find = function (query) {
    var _return = [];
    debug('Find e la collection ha'+this.documents.length)
    _(this.documents)
    .where(query)
    .toArray(function(a){
      _return = a;
    })

    return _return;
    debug('fine find()');

  }

  /**
  *
  */
  Collection.prototype.findOne = function (query) {
    var _return = {};
    _(this.documents)
    .findWhere(query)
    .each(function(d){
      _return = d;
    });
    return _return;

  }




  /**
  *
  **/
  Jar.prototype.createCollection = function(collection_name){
    if (this.collections.hasOwnProperty(collection_name))
      throw new Error('This Jar already has a collection named '+collection_name+' thus cannot create another with the same name');

    this.collections[collection_name] = new Collection(collection_name);
    return this.collections[collection_name];
  };

  /**
  *
  **/
  Jar.prototype.deleteCollection = function(collection_name,delete_not_empty) {
    if (!this.collections.hasOwnProperty(collection_name))
      throw new Error('This Jar has not a collection named '+collection_name);

    var collection = this.collections[collection_name];

    if (collection.documents.length >0 && delete_not_empty == false)
      throw new Error('The collection '+collection_name+' is not empty, if you want to delete it anyway, please call deleteCollection(collection,true)');

    delete this.collections[collection_name];
    //TODO pulisci dalla cache i risultati relativi

  }
  /**
  *
  */
  Jar.prototype.collection = function(collection_name) {
    //returns a collection object
    if (!this.collections.hasOwnProperty(collection_name))
      throw new Error('This Jar has not a collection named '+collection_name);

    return this.collections[collection_name];
  }

module.exports = Jar;

})();
