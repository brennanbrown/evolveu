
const calculator = {
  
  addFunc: (num1, num2) => {
    var answer = num1 + num2;
    return answer;
  },
  
  addWrite: (num1, num2) => {
    var answer = num1 + num2;
    document.getElementById("answer").innerHTML = answer;
  },
  
  subtractFunc: (num1, num2) => {
    var answer = num1 - num2;
    return answer;
  },
  
  subtractWrite: (num1, num2) => {
    var answer = num1 - num2;
    document.getElementById("answer").innerHTML = answer;
  },
  
  multiplyFunc: (num1, num2) => {
    var answer = num1 * num2;
    return answer;
  },
  
  multiplyWrite: (num1, num2) => {
    var answer = num1 * num2;
    document.getElementById("answer").innerHTML = answer;
  },
  
  divideFunc: (num1, num2) => {
    var answer = num1 / num2;
    answer = Math.round((answer + Number.EPSILON) * 100) / 100
    return answer;
  },
  
  divideWrite: (num1, num2) => {
    var answer = num1 / num2;
    answer = Math.round((answer + Number.EPSILON) * 100) / 100
    document.getElementById("answer").innerHTML = answer;
  }
  
}

export default calculator;