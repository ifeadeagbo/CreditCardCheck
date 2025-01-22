/ All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below:

//(STEP 1) ---> Card´s number validation
let validateCardNumber = cardNumberArray => {
  
  //1st- Creating a copy of the array passed (without the last digit) and reversing it
  let newArray = cardNumberArray.slice(0, -1).reverse();

 //2nd- Iterating through the array, multiplying the numbers in (now) even indexes and substracting 9 if neccesary
  for (i = 0; i < newArray.length; i++) {
    if (i % 2 === 0 || i === 0) {
      newArray[i] *= 2;
      if (newArray[i] > 9) {
        newArray[i] -= 9;
      } else {
        newArray[i];
      }
    } else {
      newArray[i];
    }
  }

  //3rd- Sum all the items in newArr
  let totalSum = newArray.reduce((a, b) => a + b); 

  //4th- Finding out the check digit (last digit of the original card number)
  let checkDigit = cardNumberArray[cardNumberArray.length-1];

  //5th- Final card validation
  if ((checkDigit + totalSum) % 10 === 0) {
    return true;
  } else {
    return false;
  }
};


//(STEP 2) ---> Creating a function which returns all the invalid card numbers
let findInvalidCards = cardsArray => {

  //1st- Creating the array containing all the invalid card numbers
  let invalidCardsArray = [];

  //2nd- Iterating through the array passed to find the invalid card numbers and .push() them into the invalidCardsArray
  for (y = 0; y < cardsArray.length; y++) {
    let validation = validateCardNumber(cardsArray[y]);

    if (validation === false) {
      invalidCardsArray.push(cardsArray[y]);
    }
  }

  //3rd- Returning the final array
  return invalidCardsArray;
};


//(STEP 3) --->  Finding out the issuers of invalid card numbers
function idInvalidCardCompanies(invalidNumbers) {
    const companies = [];
    
    // Loop through each invalid card
    for(let i = 0; i < invalidNumbers.length; i++) {
        // Get first digit of current card
        const firstDigit = invalidNumbers[i][0];
        
        // Identify company based on first digit
        if(firstDigit === 3) {
            if(!companies.includes('Amex (American Express)')) {
                companies.push('Amex (American Express)');
            }
        } else if(firstDigit === 4) {
            if(!companies.includes('Visa')) {
                companies.push('Visa');
            }
        } else if(firstDigit === 5) {
            if(!companies.includes('Mastercard')) {
                companies.push('Mastercard');
            }
        } else if(firstDigit === 6) {
            if(!companies.includes('Discover')) {
                companies.push('Discover');
            }
        } else {
            console.log(`Company not found for card starting with ${firstDigit}`);
        }
    }
    
    return companies;
}


//(STEP4) ---> Converting strings into arrays
let convertStringToArray = string => {
  let numericArray = string.split('').map(x => parseInt(x));
  return numericArray;
};


//(STEP5) ---> Converting INVALID card number to VALID ones
let conversionToValid = invalidCard => {

  //1st- Creating a copy of the array passed (without the last digit) and reversing it
  let invalidCardCopy = invalidCard.slice(0, -1).reverse();

  //2nd- Applying the Luhn algorithm to invalidCardCopy
  for (i = 0; i < invalidCardCopy.length; i++) {
    if (i % 2 === 0 || i === 0) {
      invalidCardCopy[i] *= 2;
      if (invalidCardCopy[i] > 9) {
        invalidCardCopy[i] -= 9;
      } else {
        invalidCardCopy[i];
      }
    } else {
      invalidCardCopy[i];
    }
  }

  //3rd- Sum all the final numbers of invalidCardCopy
  let sum = invalidCardCopy.reduce((a, b) => a + b); 

  //4th- Finding the check digit
  let checkDigit = invalidCard[invalidCard.length-1];

  //5th- Total sum
  let total = checkDigit + sum;

  //6th- Swapping the check digit for a new one to validate the invalidCard passed
  if (total % 10 > checkDigit) {
    invalidCard[invalidCard.length-1] = checkDigit + (10 - total % 10);
  } else {
    invalidCard[invalidCard.length-1] = checkDigit - total % 10;
  }
  return invalidCard;
};