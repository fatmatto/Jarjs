var Jar = require('../index.js');


var j = new Jar({
  name :'apio'
  });


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
  it("should update a document and set property red to  100", function () {
    j.collection('Objects').update({
      'objectId' : '1'
    },{'properties' :{red : '255'}},{'multi':false});
    var result = j.collection('Objects').findOne({
      'objectId' : '1'
    });
    expect(result.properties.red).toBe('255');
    expect(result.properties.green).toBe('100');
    expect(result.properties.blue).toBe('100');
  })
  it("should update 2 documents and set address to 49A7BCAW", function () {
    j.collection('Objects').update({},
      {'address' : '49A7BCAW'},{'multi':true});
    var result = j.collection('Objects').find({
      'address' : '49A7BCAW'
    });
    expect(result.length).toBe(2);
  })
  it("should insert a doc find it update it and find it again using findStream", function () {
    var o = {
      name : 'testObject1',
      address : '40B3C1A3',
      protocol : 'zigbee',
      properties : {
        onoff : '1',
        somevalue : '0'
      }
    }
    j.collection('Objects')
    .insert(o)
    .findStream({'name' : 'testObject1'})
    .each(function(x){
      expect(x.properties.onoff).toBe('1');
    });
    j.collection('Objects')
    .update({'name' : 'testObject1'},{properties : {onoff : '0'}})
    .findStream({'name' : 'testObject1'})
    .each(function(x){
      expect(x.properties.onoff).toBe('0');
    })

  })


});
