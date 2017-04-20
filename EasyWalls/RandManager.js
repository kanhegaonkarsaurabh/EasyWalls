module.exports = {

  randomNumberInRange(lowerLimit, upperLimit) {
    // Algorithm for finding a particular random number in range
    return Math.floor(Math.random() * (1 + upperLimit - lowerLimit)) + lowerLimit;

  },

  uniqueRandomNumbers(numRandomNumbers, lowerLimit, upperLimit) {
    let uniqueNumbers = [];
    while (uniqueNumbers.length != numRandomNumbers) {
      let randomNumber = this.randomNumberInRange(lowerLimit, upperLimit);
      if(uniqueNumbers.indexOf(randomNumber) === -1) // making sure the number ain't already there in the array
        uniqueNumbers.push(randomNumber);
    }
    return uniqueNumbers;
  }
};
