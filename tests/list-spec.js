var Jar = require('../index.js');


var j = new Jar({
  name :'apio'
  });

describe("List operations", function () {
  it ("Should set a value with a key and return it",function(){
      j.set('test1','value1');
      expect(j.get('test1')).toBe('value1');
  });
  it('Should create an empty list',function(){
    j.list('l1');
    expect(JSON.stringify(j.get('l1'))).toBe(JSON.stringify(new Array()));
  })
  it('should add an item at the beginning of the list',function(){
    expect(
      JSON.stringify(
        j.list('l2')
        .rpush('l2','RIGHT')
        .lpush('l2','LEFT')
        .get('l2')
      )
    ).toBe(JSON.stringify(['LEFT','RIGHT']));
  })
  it('should unset all data',function(){
    j.flushall();
    expect(j.get('l1')).toBe(undefined);
    expect(j.get('l2')).toBe(undefined);
  })
})