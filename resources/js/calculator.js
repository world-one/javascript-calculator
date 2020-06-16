class Calculator{
  
  TYPE_NUMBER = 'number';
  TYPE_OP = 'operator';
  TYPE_DOT = 'dot';
  TYPE_BRACKET = 'bracket';
  TYPE_CLEAR = 'clear';
  TYPE_CALCULATION = 'calculation';
  
  constructor( targetElId, processElId, resultElId ){    
    this.keypadEl = document.getElementById(targetElId); 
    this.processEl = document.getElementById(processElId);
    this.resultEl = document.getElementById(resultElId);
    this.inputValueArr = [];
    this.inputTypeArr = [];
    this.bracketStack = new Stack();
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
      if( this.checkBracket(btnType) ) // 괄호 내외부에서 타입 입력시 제한
        this.clicked[btnType](btnValue, btnType);
    };
  }
  
  clicked = {
    number: (btnValue, btnType) => {
      const arrLen = this.inputValueArr.length;
      let type;
      let active = true;
      for( let i = arrLen; i > -1; i-- ){
        type = this.inputTypeArr[ i ];
        if( type === this.TYPE_OP || type === this.TYPE_DOT || type === this.TYPE_BRACKET ){
          if ( this.inputValueArr[i] < 1 ) active = false;
          break;
        }
        if ( i === 0 && this.inputValueArr[i] < 1 ) active = false;
      }
      if( active ) this.pushValueArr(btnValue, btnType);
    },
    operator: (btnValue, btnType) => {
      if( this.getPrevType() && this.getPrevType() !== this.TYPE_OP ){
        this.pushValueArr(btnValue, btnType);
      }
    },
    bracket: (btnValue, btnType) => {
      if( this.getPrevType() === this.TYPE_NUMBER 
          && this.bracketStack.store.length > 0 ){
          btnValue = ')';
          this.bracketStack.pop();
      }
      if( btnValue === '(' ) {
        if( this.getPrevType() === this.TYPE_NUMBER ) return;
        this.bracketStack.push(btnValue);
      }
      this.pushValueArr(btnValue, btnType);
    },
    dot: (btnValue, btnType) => {
      if(this.checkDot() !== this.TYPE_DOT )
        this.pushValueArr(btnValue, btnType);
    },
    clear: (btnValue) => {
      if(btnValue > 0) {
        const value = this.inputValueArr.pop();
        const type = this.inputTypeArr.pop();
        if( type === this.TYPE_BRACKET ){
          if( value === '(' ) this.bracketStack.pop();
          if( value === ')' ) this.bracketStack.push('(');
        }
      }else{
        this.inputValueArr = [];
        this.inputTypeArr = [];
        this.bracketStack.reset()
      } 
      this.insertValueProcessEl();
    },
    calculation: () => {
      if( this.getPrevType() === this.OP ){
        this.inputValueArr.pop();
      }
      if(this.bracketStack.store.length > 0){
        this.bracketStack.store.forEach((el)=>{
          this.inputValueArr.push(')');
        });
        this.bracketStack.reset();
      }
      
      this.insertValueProcessEl();
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
  checkBracket( btnType ){
    const prevType = this.getPrevType();
    if( btnType === this.TYPE_CALCULATION || btnType === this.TYPE_CLEAR ) return true;
    if( prevType === this.TYPE_BRACKET ){
      if ( this.inputValueArr[ this.inputValueArr.length - 1 ] === '(' ){
        if( btnType === this.TYPE_OP ) return false;
      }else{ // ')';
        if( btnType !== this.TYPE_OP ) return false;
      };
    }
    return true;
  }

}

new Calculator('js-keypad', 'js-process', 'js-result');



