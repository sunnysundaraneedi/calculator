class Calculator {
  constructor(previousText, currentText) {
    this.previousText = previousText;
    this.currentText = currentText;
    this.clear();
  }
  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const strNumber = number.toString();
    const intDigits = parseFloat(strNumber.split(".")[0]);
    const decDigits = strNumber.split(".")[1];
    let display;
    if (isNaN(intDigits)) {
      display = "";
    } else {
      display = intDigits.toLocaleString("en");
    }
    if (decDigits != null) {
      return `${display}.${decDigits}`;
    } else {
      return display;
    }
  }

  updateDisplay() {
    this.currentText.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation !== undefined) {
      this.previousText.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation} `;
    } else {
      this.previousText.innerText = "";
    }
  }
}

const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operand");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const previousText = document.querySelector(".pre-operand");
const currentText = document.querySelector(".cur-operand");

const calculator = new Calculator(previousText, currentText);

numbers.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operations.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equals.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

clear.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
