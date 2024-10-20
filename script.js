const display = document.getElementById("display");
let currentInput = "";
let operator = "";
let firstOperand = "";
let secondOperand = "";
let resultDisplayed = false;

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", (event) => {
    const value = event.target.innerText;

    // Handle clear (C)
    if (value === "C") {
      currentInput = "";
      firstOperand = "";
      secondOperand = "";
      operator = "";
      display.innerText = "0";
      resultDisplayed = false;
      return;
    }

    // Handle backspace
    if (value === "←") {
      currentInput = currentInput.slice(0, -1);
      display.innerText = currentInput || "0";
      return;
    }

    // Handle number inputs
    if (!isNaN(value) || value === "0") {
      if (resultDisplayed) {
        currentInput = value; // Start new input after result
        resultDisplayed = false;
      } else {
        currentInput += value;
      }
      display.innerText = currentInput;
      return;
    }

    // Handle decimal point
    if (value === ".") {
      if (!currentInput.includes(".")) {
        currentInput += value;
        display.innerText = currentInput;
      }
      return;
    }

    // Handle percentage
    if (value === "%") {
      currentInput = (parseFloat(currentInput) / 100).toString();
      display.innerText = currentInput;
      return;
    }

    // Handle operator inputs
    if (["+", "-", "*", "/"].includes(value)) {
      firstOperand = currentInput;
      operator = value;
      currentInput = "";
      return;
    }

    // Handle equals
    if (value === "=") {
      secondOperand = currentInput;

      if (firstOperand && secondOperand) {
        let result;
        switch (operator) {
          case "+":
            result = parseFloat(firstOperand) + parseFloat(secondOperand);
            break;
          case "-":
            result = parseFloat(firstOperand) - parseFloat(secondOperand);
            break;
          case "*":
            result = parseFloat(firstOperand) * parseFloat(secondOperand);
            break;
          case "/":
            if (secondOperand === "0") {
              display.innerText = "Error";
              return;
            }
            result = parseFloat(firstOperand) / parseFloat(secondOperand);
            break;
        }

        display.innerText = result;
        currentInput = result.toString();
        resultDisplayed = true;
      }
    }
  });
});

// Keyboard support
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (key >= 0 && key <= 9) {
    document.getElementById(key).click();
  } else if (key === "Backspace") {
    document.getElementById("backspace").click();
  } else if (key === "Enter") {
    document.getElementById("equals").click();
  } else if (key === "Escape") {
    document.getElementById("clear").click();
  } else if (key === ".") {
    document.getElementById("decimal").click();
  } else if (key === "+") {
    document.getElementById("add").click();
  } else if (key === "-") {
    document.getElementById("subtract").click();
  } else if (key === "*") {
    document.getElementById("multiply").click();
  } else if (key === "/") {
    document.getElementById("divide").click();
  }
});
