class Calculator{
  
  TYPE_OP = 'operator';
  TYPE_DOT = 'dot';
  
  constructor( targetElId, processElId, resultElId ){    
    this.keypadEl = document.getElementById(targetElId); 
    this.processEl = document.getElementById(processElId);
    this.resultEl = document.getElementById(resultElId);
    this.inputValueArr = [];
    this.inputTypeArr = [];
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
      this.clicked[btnType](btnValue, btnType);
    };
  }
  
  clicked = {
    number: (btnValue, btnType) => {
      this.pushValueArr(btnValue, btnType);
    },
    operator: (btnValue, btnType) => {
      if( this.getPrevType() !== this.TYPE_OP ){
        this.pushValueArr(btnValue, btnType);
      }
    },
    bracket: (btnValue, btnType) => {
      if( this.prevInputType && 
        ( this.prevInputType !== this.TYPE_OP && this.prevInputType !== 'bracket' ) ){
          btnValue = ')';
      }
      this.pushValueArr(btnValue, btnType);
    },
    dot: (btnValue, btnType) => {
      if(this.checkDot() !== this.TYPE_DOT ){
        this.pushValueArr(btnValue, btnType);
      };
    },
    clear: (btnValue) => {
      if(btnValue > 0) {
        this.inputValueArr.pop();
        this.inputTypeArr.pop();
      }else{
        this.inputValueArr = [];
        this.inputTypeArr = [];
      } 
      this.insertValueProcessEl();
    },
    calculation: () => {
      if( this.getPrevType() === this.OP ){
        this.inputValueArr.pop();
        this.insertValueProcessEl();
      }
      this.resultEl.value = eval( this.processEl.value );
    },
  }
  pushValueArr(btnValue, btnType){
    this.inputValueArr.push(btnValue);
    this.inputTypeArr.push(btnType);
    this.insertValueProcessEl();
  }
  insertValueProcessEl(){
    this.processEl.value  = this.inputValueArr.join('');
  }
  getPrevType(){
    const arrLen = this.inputTypeArr.length;
    if(arrLen === 0) return false;
    return this.inputTypeArr[arrLen-1];
  }
  checkDot(){
    let type = '';
    for( let i = this.inputTypeArr.length - 1; i > -1; i-- ){
      type = this.inputTypeArr[i];
      if( type === this.TYPE_OP || type === this.TYPE_DOT ) break;
    }
    return type;
  }

}

new Calculator('js-keypad', 'js-process', 'js-result');



