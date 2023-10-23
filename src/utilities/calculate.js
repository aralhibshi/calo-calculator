export const calculateResult = expression => {
  const operators = [];
  const operands = [];

  const precedence = {
    '+': 1,
    '-': 1,
    X: 2,
    '/': 2,
    '%': 3
  };

  const performOperation = () => {
    const operator = operators.pop();
    const operand2 = operands.pop();
    const operand1 = operands.pop();

    switch (operator) {
      case '+':
        operands.push(operand1 + operand2);
        break;
      case '-':
        operands.push(operand1 - operand2);
        break;
      case 'X':
        operands.push(operand1 * operand2);
        break;
      case '/':
        operands.push(operand1 / operand2);
        break;
      case '%':
        operands.push((operand1 / 100) * operand2);
        break;
      default:
        throw new Error('Invalid operator: ' + operator);
    }
  };

  let numberBuffer = '';
  let isParsingDecimal = false;

  for (let i = 0; i < expression.length; i++) {
    const token = expression[i];

    if (token === ' ') {
      continue;
    }

    if (!isNaN(token) || token === '.') {
      // Build the number character by character
      if (token === '.' && isParsingDecimal) {
        throw new Error('Invalid number format');
      }
      if (token === '.') {
        isParsingDecimal = true;
      }
      numberBuffer += token;
    } else {
      if (numberBuffer) {
        const number = isParsingDecimal ? parseFloat(numberBuffer) : parseInt(numberBuffer, 10);
        operands.push(number);
        numberBuffer = '';
        isParsingDecimal = false;
      }

      if (token in precedence) {
        const currentPrecedence = precedence[token];
        while (operators.length > 0 && currentPrecedence <= precedence[operators[operators.length - 1]]) {
          performOperation();
        }
        operators.push(token);
      } else if (token === '(') {
        operators.push(token);
      } else if (token === ')') {
        while (operators[operators.length - 1] !== '(') {
          performOperation();
        }
        operators.pop();
      } else {
        throw new Error('Invalid token: ' + token);
      }
    }
  }

  if (numberBuffer) {
    const number = isParsingDecimal ? parseFloat(numberBuffer) : parseInt(numberBuffer, 10);
    operands.push(number);
  }

  while (operators.length > 0) {
    performOperation();
  }

  if (operands.length !== 1 || operators.length > 0) {
    throw new Error('Invalid expression');
  }

  return operands[0];
};
