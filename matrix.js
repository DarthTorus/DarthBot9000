var bot = process.DiscordBot;
var savedMatrices = {};

function matrixCheck(msg, message) {
  switch(msg[0]) {
    case 'set':
      msg.shift();
      setMatrix(msg, message);
      break;
    case 'get':
      msg.shift();
      getMatrix(msg, message);
      break;
    case 'add':
      msg.shift();
      break;
    case 'mult':
      msg.shift();
      matrixMultiply(msg, message);
      break;
    case 'determinant':
    case 'det':
      msg.shift();
      break;
    case 'clear':
    case 'remove':
      msg.shift();
      removeMatrix(msg, message);
      break;
    default:
     message.channel.send("I don't understand this command. I'm sorry.");
     break;
  }
}

function matrixAdd() {

}

function matrixMultiply(m,message) {
  let operandOne = m[0];
  let operandTwo = m[1];
  let matrixName1 = operandOne + "|" + message.author.id;
  let matrixName2 = operandTwo + "|" + message.author.id;
  let data = 0;
  let wrapper = "```";
  let contentString = "\n";
  let resultMatrix = {
    rows: 1,
    columns: 1,
    contents: []
  }
  // Test if first operand is a scalar value
  if(!isNaN(operandTwo) && !savedMatrices.hasOwnProperty(matrixName2)) {
    let matrixA = savedMatrices[matrixName1];
    let multiplier = Number(operandTwo);
    resultMatrix.rows = matrixA.rows;
    resultMatrix.columns = matrixA.columns;
    let tempRow = [];
    for(var r = 0; r < matrixA.rows; r++) {
      for(var c = 0; c < matrixA.columns; c++) {
        tempRow.push(matrixA.contents[r][c]*multiplier);
      }
      resultMatrix.contents.push(tempRow);
      tempRow = [];
    }
    data = resultMatrix.contents;
  
  // Loop through every row
    for(var r = 0; r < data.length; r++) {
      //Loop through each element in a row, effectively going through each column
      for(var c = 0; c < data[r].length; c++) {
        contentString += `${data[r][c]}  `;
      }
      contentString += "\n"
    }

  } else { // Test if both operands are objects
    // else if () {
    //
    // }
    // else {
    //
    // }
  }
  message.channel.send(`${wrapper}\nSize: ${resultMatrix.rows}x${resultMatrix.columns}\nResults: ${contentString}\n${wrapper}`);
 
}

function setMatrix(m, message) {
  //Define matrixData object
  let matrixName = m[0] + "|" + message.author.id;
  let matrixData = {
    //Set matrixName to be the 1st argument of m
    rows: 1,
    columns: 1,
    contents: [],
  }

  //Set size to be an array of the 2nd arg of m
  let size = m[1].split(',');
  //Set row and columns
  if(validateSize(size)) {
    matrixData.rows = Number(size[0]);
    matrixData.columns = Number(size[0]);
    //This only set the column if a second element appears in the size array.
    //Otherwise we have a square matrix.
    if(size.length === 2) {
      matrixData.columns = Number(size[1]);
    }
  } else {
    message.channel.send("Size is incorrect.");
    return false;
  }

  // Ok this is where we get a bit tricky
  // What do we need to do? We should split the data unconditionally. This will be its own function..
  let data = m[2];
  if(!(data == '' || data === undefined)) {
    matrixData.contents = splitMatrix(data,message);
    //Then let's validate the data to ensure it's exactly the data we expect.
    if(validateMatrix(matrixData, message)) {
      /** If the data is valid meaning it has the correct number of rows and columns, lets go ahead
      and set any null or non-number values to 0 **/
      matrixData.contents = zeroOutNulls(matrixData.contents);
      // Save the matrix into the savedMatrices object for later retrieval
      savedMatrices[matrixName] = matrixData;
      //This will retrieve our newly created matrix and send it to the channel for the user to confirm it's correct
      getMatrix(m[0],message);
    }
  }
}
// Makes sure the row and columns are positive integers
function validateSize(s) {
  console.log(s);
  var r,c;

  switch (s.length) {
    case 1:
      r = c = s[0];
      if(validateDim(r)) {
        return true;
      } else {
        return false;
      }
      break;
    case 2:
      r = s[0];
      c = s[1];
      if(validateDim(r) && validateDim(c)) {
        return true;
      }
      else {
        return false;
      }
      break;
    default:
      message.channel.send("Check your matrix dimensions");
  }
}

function validateDim(dim) {
  var dimErrBool = false;
  dim = Number(dim);
  console.log(dim);
  if(isNaN(dim) || dim == undefined || dim == '') {
    dimErrBool = true;
  } else if(dim <= 0) {
    dimErrBool = true;
  }

  return !dimErrBool;
}

function splitMatrix(data, message) {
  //We try to split on vertical bar |
  let splitData = data.split('|');
  //Log the data array, for debugging
  for(var c = 0; c < splitData.length; c++) {
    splitData[c] = splitData[c].split(',');
  }
  return splitData;
}

function validateMatrix(matrix, message) {
  var matrixErr = false;

  if(matrix.contents.length > matrix.rows) {
    message.channel.send("Too many rows created");
    message.channel.send(`You have ${matrix.contents.length} rows when you should have ${matrix.rows}.`);
    matrixErr = true;
  }
  // Too few rows in our data
  else if(matrix.contents.length < matrix.rows) {
    message.channel.send("Too few rows created");
    message.channel.send(`You have ${matrix.contents.length} rows when you should have ${matrix.rows}.`);
    matrixErr = true;
  }
  // We have enough rows in our data
  else {
    // Let's check each row
    for(var r = 0; r < matrix.rows;r++) {
      // Too many columns
      if(matrix.contents[r].length > matrix.columns) {
        message.channel.send(`Too many columns in this row: ${matrix.contents[r]}\nYou have ${matrix.contents[r].length} columns when you should have ${matrix.columns}.`);
        matrixErr = true;
      }
      // Too few columns
      else if (matrix.contents[r].length < matrix.columns) {
        message.channel.send(`Too few columns in this row: ${matrix.contents[r]}\nYou have ${matrix.contents[r].length} columns when you should have ${matrix.columns}.`);
        matrixErr = true;
      }
      // Exact rows
      else {
        matrixErr = false;
      }
    }
  }
  return !matrixErr;
}

function zeroOutNulls(data) {
  //Loop through the rows
  for(var r = 0; r < data.length; r++) {
    //Loop through each element in a row, effectively going through each column
    for(var c = 0; c < data[r].length; c++) {
      // If the element is not filled in, or isn't a number just set it to 0
      if(data[r][c] == '' || data[r][c] == undefined || data[r][c] == null || isNaN(data[r][c])) {
        data[r][c] = '0';
      }
    }
  }
  // Just logging for debugging eventually
  console.log("Zeroed Out Matrix");
  console.table(data);
  return data;
}

function getMatrix(m, message) {
  console.log(m);
  let matrixName = m + "|" + message.author.id;
  let mat = savedMatrices[matrixName];
  let data = mat.contents;
  var wrapper = "```";
  let contentString = "\n";
  // Loop through every row
  for(var r = 0; r < data.length; r++) {
    //Loop through each element in a row, effectively going through each column
    for(var c = 0; c < data[r].length; c++) {
      // If the element is not filled in, or isn't a number just set it to 0
      contentString += `${data[r][c]}  `;
    }
    contentString += "\n"
  }
  message.channel.send(`${wrapper}\nMatrix Name: ${m}\nSize: ${mat.rows}x${mat.columns}\nContents: ${contentString}\n${wrapper}`);

}

function matrixInverse() {

}

function matrixDeterminant() {

}

var matrixFunctions = {
  matrixCheck: matrixCheck
};
module.exports = matrixFunctions;
