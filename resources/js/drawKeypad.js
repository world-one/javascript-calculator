class DrawKeypad{
  constructor(){
    this.draw();
  }
  draw(){
    const utilities = [
      {type : 'dot', value: '.', text: '.'},
      {type : 'calculation', value: '=', text: '='},
      {type : 'bracket', value: '(', text: '()'},
      {type : 'clear', value: '1', text: 'CE'},
      {type : 'clear', value: '0', text: 'AC'},
    ];
    const operators = [ '+', '-', '*', '/', '%' ];
    
    for( let i = 1; i <= 10; i++){
      let value =  i % 10;
      this.createEl('button', value, 'number', value, 'js-keypad-btns');
    }
    utilities.forEach( el => {
      this.createEl('button', el.text, el.type, el.value, 'js-keypad-btns');
    });
    operators.forEach( el => {
      this.createEl('button', el, 'operator', el, 'js-keypad-operators', 'keypad__operation');
    });
  }

  createEl( tag, text, type, value, parentEl, className = 'keypad__number' ){
    const btn = document.createElement(tag);
    btn.type = "button";
    btn.append(document.createTextNode(text));
    btn.setAttribute( 'data-keypad-type', type );
    btn.setAttribute( 'data-value', value );
    btn.classList.add( 'keypad__btn', className );
    document.getElementById(parentEl).append(btn);
  }
}

export default DrawKeypad;

