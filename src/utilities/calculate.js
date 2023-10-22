export const calculateResult = expression => {
  const operators = [];
  const operands = [];

  const precedence = {
    '+': 1,
    '-': 1,
    X: 2,
    '/': 2
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
      default:
        throw new Error('Invalid operator: ' + operator);
    }
  };

  for (let i = 0; i < expression.length; i++) {
    const token = expression[i];

    if (token === ' ') {
      continue;
    }

    if (!isNaN(token)) {
      let number = parseFloat(token);
      while (i + 1 < expression.length && !isNaN(expression[i + 1])) {
        i++;
        number = number * 10 + parseFloat(expression[i]);
      }
      operands.push(number);
    } else if (token in precedence) {
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

  while (operators.length > 0) {
    performOperation();
  }

  if (operands.length !== 1 || operators.length > 0) {
    throw new Error('Invalid expression');
  }

  return operands[0];
};
