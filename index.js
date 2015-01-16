/**
* Jarjs, minimalistic in-memory javascript database
*
*
**/

(function(){
  var _ = require('highland');
  var fs = require('fs');




  function debug (message) {
    if (process.env.NODE_ENV === 'development')
      console.log(message)
  }

  var applyUpdateToDoc = function(update) {
    var patchThis = function(object,patch) {
      for (var j in patch){
        if ('object' == typeof patch[j])
          patchThis(object[j],patch[j]);
        else
          object[j] = patch[j];
        }
    }
    var fn = function(doc){
      patchThis(doc,update)

    }
    return fn;

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
  *
  * config Object
  * name String The database name
  * filename String The database file path
  */

  function Jar(config) {
    if (!config.hasOwnProperty('name'))
      throw new Error('Database name is required in constructor Jar(config)');
    this.dbname = config.name;

    for (var k in config)
      this[k] = config[k];



    this.collections = {};
    /*
        These are coming soon features
        -> Persistance
        -> REST api
        -> TCP socket
        if (this.hasOwnProperty('filename') && fs.existsSync(this.filename))
          this.loadFromDisk();

        this._cache = {};
    */
    debug('Created database '+config.name);
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
  **/
  Collection.prototype.insert = function(document) {
    //type checking
    if ('object' !== typeof document)
      throw new Error("Wrong type Error : document must be Object");
    debug('inserting an object: \n '+JSON.stringify(document));
    this.documents.push(document);
    debug('The collection '+this.name+" has "+this.documents.length+" documents;");
    return this;
  }

  /**
  * @param query Object representing object to match against

  */
  Collection.prototype.update = function(query,update,options) {

    // Argument type checking
    if ('object' !== typeof query)
      throw new Error("Wrong type Error : query must be Object");
    if ('object' !== typeof update)
      throw new Error("Wrong type Error : update must be Object");
    if ('undefined' !== typeof options && 'object' !== typeof options )
      throw new Error("Wrong type Error : options must be Object");


    if ('undefined' !== typeof options && options.hasOwnProperty('multi') && options.multi === true){
      _(this.documents)
      .where(query)
      .each(applyUpdateToDoc(update))
    }
    else {
      _(this.documents)
      .findWhere(query)
      .each(applyUpdateToDoc(update))
    }

    return this;



  }

  /**
  *
  */
  Collection.prototype.find = function (query) {
    if ('object' !== typeof query)
      throw new Error("Wrong type Error : query must be Object");
    var _r = null;
    _(this.documents)
    .where(query)
    .toArray(function(x){
      _r = x;
    });

      return _r;
  }

  /**
  * Same as find but returns the stream of data
  **/
  /**/
  Collection.prototype.findStream = function (query) {
    if ('object' !== typeof query)
      throw new Error("Wrong type Error : query must be Object");

    return _(this.documents)
    .where(query)
  }










  /**
  *
  */
  Collection.prototype.findOne = function (query) {
    if ('object' !== typeof query)
      throw new Error("Wrong type Error : query must be Object");

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
    if ('string' !== typeof collection_name)
      throw new Error("Wrong type Error : collection_name must be String");

    if (this.collections.hasOwnProperty(collection_name))
      throw new Error('This Jar already has a collection named '+collection_name+' thus cannot create another with the same name');

    this.collections[collection_name] = new Collection(collection_name);
    return this.collections[collection_name];
  };

  /**
  *
  **/
  Jar.prototype.deleteCollection = function(collection_name,delete_not_empty) {
    if ('string' !== typeof collection_name)
      throw new Error("Wrong type Error : collection_name must be String");

    if (!this.collections.hasOwnProperty(collection_name))
      throw new Error('This Jar has not a collection named '+collection_name);

    var collection = this.collections[collection_name];

    if (collection.documents.length >0 && delete_not_empty == false)
      throw new Error('The collection '+collection_name+' is not empty, if you want to delete it anyway, please call deleteCollection(collection,true)');

    delete this.collections[collection_name];


  }
  /**
  * returns a collection object
  */
  Jar.prototype.collection = function(collection_name) {
    if ('string' !== typeof collection_name)
      throw new Error("Wrong type Error : collection_name must be String");

    if (!this.collections.hasOwnProperty(collection_name))
      throw new Error('This Jar has not a collection named '+collection_name);

    return this.collections[collection_name];
  }

  /*
  *
  */
  Jar.prototype.persist = function() {
    var db = {
      name : this.dbname,
      collections : {}
    }
    var self = this;
    for (var k in this.collections)
      db.collections[k] = this.collections[k];
    var s = JSON.stringify(db);
    if (this.hasOwnProperty('filename')) {
      fs.writeFileSync(this.filename,s);
    }

  }


module.exports = Jar;

})();
