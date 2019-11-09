// Cleaning nested object
const testingObj = {
  a: "foo",
  b: "bar",
  c: null,
  d: undefined,
  e: {
    a: "fuz",
    b: undefined,
    c: {
      a: "biz",
      b: null,
      c: [
        {
          a: "foo",
          b: undefined,
          c: "bar",
          d: null
        }
      ]
    },
    d: {
      a: "biz 2",
      b: null,
      c: [
        {
          a: "foo",
          b: undefined,
          c: "bar",
          d: null
        }
      ]
    }
  }
};

const iterateArr = arr => {
  const res = [];
  arr.map((v, i) => {
    res[i] = cleanse(v);
  });
  return res;
};
const cleanse = o => {
  const res = {};
  for(let prop in o){
    if(o.hasOwnProperty(prop)){
      const obj = o[prop];
      if(obj !== null){
        if(typeof(obj) === 'object'){
          if(obj.length){ // isArray
            res[prop] = iterateArr(obj);
          } else { // isObject
            res[prop] = cleanse(obj);
          }
        } else {
          if(obj !== undefined){
            res[prop] = obj;
          }
        }
      }
    }
  }
  return res;
};

console.log(cleanse(testingObj));