
class Stack{
  constructor(){
    this.store = [];
  }
  reset(){
    this.store = [];
  }
  push(el){
    this.store.push(el);
  }
  pop() {
    return this.store.pop();
  }
};


export default Stack;

