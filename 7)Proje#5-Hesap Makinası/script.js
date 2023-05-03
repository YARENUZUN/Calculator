const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

let displayValue = '0';
let firstValue = null;
let operator = null;
let gonderilen_second_değer = false;


updateDisplay();

function updateDisplay(){
    display.value = displayValue;
}

// sadece buttona tıkladığımızda tepki versin istediğimiz için:
keys.addEventListener('click',function(e){
    const element = e.target;

    if(!element.matches('button'))  return;
  

    if(element.classList.contains('operator')){
        //console.log('operator',element.value);
        handleOperator(element.value);
        updateDisplay();
        return;
    }

    if(element.classList.contains('decimal')){
        console.log('decimal',element.value);
       inputDecimal();
       updateDisplay();
        return;
    }

    if(element.classList.contains('clear')){
        //console.log('clear',element.value);
        clear();
        updateDisplay();
        return;
    }
    
    inputNumber(element.value);
    updateDisplay();
});

function handleOperator(nextOperator){
    const value = parseFloat(displayValue);

    if(operator && gonderilen_second_değer){
        operator = nextOperator;
        return;
    }

    if(firstValue === null)
    {
        firstValue = value;
    }

    else if(operator)
    {
        const result = calculator(firstValue, value, operator);

        displayValue = String(result);
        firstValue = result;
    }

    gonderilen_second_değer = true;
    operator = nextOperator;
}

function calculator(first, second, operator){
    if(operator === '+'){
        return first + second;
    }

    else if(operator === '-'){
        return first - second;
    } 
     
    else if(operator === '*'){
        return first * second;
    }

    else if(operator === '/'){

        if(second != 0){
            return first / second;
        }
        
    }

    return second;

    
}

function inputNumber(num){ //hesap makinasına girmiş olduğumuz değerler yan yana yazılsın silinmesin diye yaptık.
    if(gonderilen_second_değer){
        displayValue = num;
        gonderilen_second_değer = false;
    }

    else
    {
        displayValue = displayValue === '0'? num: displayValue + num;
    }
}

function inputDecimal(){
    if(!displayValue.includes('.')){
        displayValue += '.';
    }
    
}

function clear(){
    displayValue='';
    firstValue = null;
}