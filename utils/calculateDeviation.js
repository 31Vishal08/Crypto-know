// utils/calculateDeviation.js
const calculateStandardDeviation = (numbers) => {
    const n = numbers.length;
    const mean = numbers.reduce((a, b) => a + b) / n;
    const variance =
      numbers.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0) / n;
    return Math.sqrt(variance);
  };
  
  module.exports = calculateStandardDeviation;
  