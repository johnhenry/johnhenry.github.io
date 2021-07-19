const basic = {
  start: 0,
  value: undefined,
  base(start=basic.start) {
    let current = basic.value;
    basic.value = (start=basic.start)=>current(start+2);
    return start;
  }
}


const createCounter = (next = basic) => {
  const update = () => next.value();
  const reset = () => {
    next.value = next.base;
  };
  reset();
  return { update, reset };
};

const counterGenerator = function * (){
  let i = 0;
  while(true){
    yield i++;
  }
};

export default createCounter;
export { basic, counterGenerator };


