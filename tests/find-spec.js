var Jar = require('../index.js');


var j = new Jar('apio');


j.createCollection('Objects');
j.collection('Objects').insert({
  'objectId' : '1',
  'protocol' : 'z',
  'address' : '40C3C0D1AE',
  'properties' : {
    'onoff' : '1',
    'red' : '100',
    'green' : '100',
    'blue' : '100'
  }
});
j.collection('Objects').insert({
  'objectId' : '4',
  'protocol' : 'z',
  'address' : '41C3D0D2BG',
  'properties' : {
    'onoff' : '1',
    'intensity' : '100'
  }
});


describe("Insert and find", function () {
  it ("should find a single document",function(){
    var l = j.collection('Objects').find({'objectId':'4'}).length;
    expect(l).toBe(1);
  })
  it("should find a document with id 4", function () {
    var result = j.collection('Objects').findOne({
      'objectId' : '4'
    });
    expect(result.objectId).toBe('4');
  })
  it("should update a document and set id 7", function () {
    j.collection('Objects').update({
      'objectId' : '4'
    },{'objectId' : '7'},{'multi':false});
    var result = j.collection('Objects').findOne({
      'objectId' : '7'
    });
    expect(result.objectId).toBe('7');
  })
  it("should update 2 documents and set address to 49A7BCAW", function () {
    j.collection('Objects').update({},
      {'address' : '49A7BCAW'},{'multi':true});
    var result = j.collection('Objects').find({
      'address' : '49A7BCAW'
    });
    expect(result.length).toBe(2);
  })

});
