class Calculator{
  constructor( targetElId, inputElId ){
    this.keypadEl = document.getElementById(targetElId); 
    this.inputEl = document.getElementById(inputElId);
    this.inputValueArr = [];
    this.prevInputType;
    this.init();
  }

  init(){
    this.keypadEl.addEventListener('click',(e)=>{
      this.onClick( e.target );
    });
  }

  onClick(btn){
    if( btn.dataset.keypadType != undefined ){
      const btnType = btn.dataset.keypadType;
      const btnValue = btn.dataset.value;
      this[btnType](btnValue);
      this.prevInputType = btnType;
    };
  }

  number(btnValue){
    this.inputValueArr.push(btnValue);
    this.insertInputElValue()
  }

  operator(btnValue){
    if( this.prevInputType && this.prevInputType !== 'operator' ){
      this.inputValueArr.push(btnValue);
      this.insertInputElValue();
    }
  }

  clear(btnValue){
    if(btnValue > 0) this.inputValueArr.pop();
    else             this.inputValueArr = [];
    
    this.insertInputElValue();
  }

  result(){
    this.inputEl.value = eval( this.inputEl.value );
  }

  insertInputElValue(){
    this.inputEl.value  = this.inputValueArr.join('');
  }

}

new Calculator('js-keypad', 'js-input');



