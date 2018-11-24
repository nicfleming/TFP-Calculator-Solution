//
//JavaScript file for the simple calculator
//

// This function sets the three main values used to track
// our calculator's computations.
function init() {

  // init new value, old value, and previous operation to defaults
  document.newValue = 0;
  document.oldValue = 0;
  document.prevOp = '+';
  document.repeatHitOp = false;

  updateResult(document.newValue);
}

// This function updates the calculator result screen with
// the value of document.newValue.
function updateResult(value) {
  var resultEl = document.getElementById('result');
  var text = document.createTextNode(value);
  resultEl.replaceChild(text, resultEl.firstChild);
}

// This function updates the value of document.newValue then
// calls the function to update the results on the screen.
function digitPressed(number) {
  document.repeatHitOp = false;
  if (document.prevOp == '=') {
    document.oldValue = 0;
    document.prevOp = '+';
    document.newValue = number;
  } else {
    var newVal = document.newValue * 10 + number;
    if (newVal > 1000000 || newVal < -1000000) {
      return;
    }
    document.newValue = newVal;
  }
  updateResult(document.newValue);
}

// this function triggers the computation of the value when
// an operator is selected
function opPressed(operator) {
  if (document.repeatHitOp) {
    document.prevOp = operator;
    return;
  }
  document.repeatHitOp = true;
  var result = 0;
  var prev = document.oldValue;
  var next = document.newValue;
  switch(document.prevOp) {
    case '+':
      result = prev + next;
      break;
    case '-':
      result = prev - next;
      break;
    case '*':
      result = prev * next;
      break;
    case '/':
      if (next == 0) {
        alert("Invalid: divide by zero error.");
        init();
        break;
      }
      result = Math.floor(prev / next);
      break;
    default:
      document.prevOp = operator;
      return;
  }
  if (result > 1000000) {
    result = 1000000;
  }
  if (result < -1000000) {
    result = -1000000;
  }
  document.oldValue = result;
  document.newValue = 0;
  document.prevOp = operator;

  updateResult(document.oldValue);

}
