//Required features
//accept user inputs of number, operator and another number
//should accept decimal numbers
//recognize inputs and perform calculations
//return a result

//optional features
//should accept longer arithmetic operations
//display all inputs as it is being entered
//store previous total as start of next operation, unless clear button clicked
//clear button should clear all entries
//shoul prevent invalid operators 

//receiving an input form the user
const keys = document.querySelector('.calculator-buttons')
    keys.addEventListener('click', event => {
    const target = event.target
    const value = target.value
    if(!target.matches('button')){  //stops in case user clicks something that is not a button
        return;
    } else {
        calculator.parseInput(value)  //passes the value of the button
    }
})

//calculator constructor
const calculator = {
    displayText: '0',
    prevTotal: null,

    //method that checks what is the user input
    parseInput(value){
        //have any of the special buttons been clicked
        switch(value){
            case '=': 
                this.calculateAnswer(this.displayText) 
                break;
            case 'AC': 
                this.clearAll() 
                break;
            case '.': 
                if(this.displayText == 0){
                    this.addText('0.')
                } else if(this.displayText.includes('.')) {
                    return;
                } else {
                    this.addText(value)
                }
                break;
            default: 
                this.addText(value)
                break;
        }
    },

    addText(value){
        if (this.displayText === '0'){
            this.displayText = '';
        } else if (this.prevTotal !== null){
            this.displayText = this.prevTotal
            this.prevTotal = null
        }

        if (isNaN(+(value)) && isNaN(+(this.displayText))){ 
            if(isNaN(this.displayText.slice(-1))){
                return;
            } else {
                let result = Function('return ' + this.displayText)()
                this.outputText(result + value)
                this.prevTotal = result + value
                return;
            }
        }
        this.displayText += value
        this.outputText(this.displayText)
    },

    outputText(text){
        document.querySelector('.calculator-screen').value = text; 
    },

    calculateAnswer(equation){
        let result = Function('return ' + equation)()
        this.outputText(result)
        this.prevTotal = result
    },

    clearAll() {
        this.displayText = '0'
        this.prevTotal = null
        this.outputText(this.displayText)
    }
}
