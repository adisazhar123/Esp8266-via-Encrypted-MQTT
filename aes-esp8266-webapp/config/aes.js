const s_box = [  [0x63,0x7c,0x77,0x7b,0xf2,0x6b,0x6f,0xc5,0x30,0x01,0x67,0x2b,0xfe,0xd7,0xab,0x76],
                 [0xca,0x82,0xc9,0x7d,0xfa,0x59,0x47,0xf0,0xad,0xd4,0xa2,0xaf,0x9c,0xa4,0x72,0xc0],
                 [0xb7,0xfd,0x93,0x26,0x36,0x3f,0xf7,0xcc,0x34,0xa5,0xe5,0xf1,0x71,0xd8,0x31,0x15],
                 [0x04,0xc7,0x23,0xc3,0x18,0x96,0x05,0x9a,0x07,0x12,0x80,0xe2,0xeb,0x27,0xb2,0x75],
                 [0x09,0x83,0x2c,0x1a,0x1b,0x6e,0x5a,0xa0,0x52,0x3b,0xd6,0xb3,0x29,0xe3,0x2f,0x84],
                 [0x53,0xd1,0x00,0xed,0x20,0xfc,0xb1,0x5b,0x6a,0xcb,0xbe,0x39,0x4a,0x4c,0x58,0xcf],
                 [0xd0,0xef,0xaa,0xfb,0x43,0x4d,0x33,0x85,0x45,0xf9,0x02,0x7f,0x50,0x3c,0x9f,0xa8],
                 [0x51,0xa3,0x40,0x8f,0x92,0x9d,0x38,0xf5,0xbc,0xb6,0xda,0x21,0x10,0xff,0xf3,0xd2],
                 [0xcd,0x0c,0x13,0xec,0x5f,0x97,0x44,0x17,0xc4,0xa7,0x7e,0x3d,0x64,0x5d,0x19,0x73],
                 [0x60,0x81,0x4f,0xdc,0x22,0x2a,0x90,0x88,0x46,0xee,0xb8,0x14,0xde,0x5e,0x0b,0xdb],
                 [0xe0,0x32,0x3a,0x0a,0x49,0x06,0x24,0x5c,0xc2,0xd3,0xac,0x62,0x91,0x95,0xe4,0x79],
                 [0xe7,0xc8,0x37,0x6d,0x8d,0xd5,0x4e,0xa9,0x6c,0x56,0xf4,0xea,0x65,0x7a,0xae,0x08],
                 [0xba,0x78,0x25,0x2e,0x1c,0xa6,0xb4,0xc6,0xe8,0xdd,0x74,0x1f,0x4b,0xbd,0x8b,0x8a],
                 [0x70,0x3e,0xb5,0x66,0x48,0x03,0xf6,0x0e,0x61,0x35,0x57,0xb9,0x86,0xc1,0x1d,0x9e],
                 [0xe1,0xf8,0x98,0x11,0x69,0xd9,0x8e,0x94,0x9b,0x1e,0x87,0xe9,0xce,0x55,0x28,0xdf],
                 [0x8c,0xa1,0x89,0x0d,0xbf,0xe6,0x42,0x68,0x41,0x99,0x2d,0x0f,0xb0,0x54,0xbb,0x16] ];

function textToHex(str){
  let result = "";
  for (i=0; i<str.length; i++) {
      result += str.charCodeAt(i).toString(16) +" ";
  }
  return result;
}

function hexToBin(hex){
  return (parseInt(hex, 16).toString(2)).padStart(8, '0');
}

// get round keys 0 - 10
function getRoundKeys(key){
  let keyInHex = textToHex(key);

  let tempKeyHex = keyInHex.split(' ');
  let roundKeys = [];
  let w = [];

  roundKeys.push(keyInHex.trim()); //round key 0

  // STEP: Get all round keys

  // w[0] w[1] w[2] w[3]


  for (var x = 0; x < 10; x++) {
    console.log("round " + (x+1));




    for (var i = 0; i < tempKeyHex.length; i++) {
      if (tempKeyHex[i].length < 2) {
        tempKeyHex[i] = "0" + tempKeyHex[i];
      }
    }

    w.push(
    [tempKeyHex[0], tempKeyHex[1], tempKeyHex[2], tempKeyHex[3]].join(' ')
    );
    w.push(
      [tempKeyHex[4], tempKeyHex[5], tempKeyHex[6], tempKeyHex[7]].join(' ')
    );
    w.push(
      [tempKeyHex[8], tempKeyHex[9], tempKeyHex[10], tempKeyHex[11]].join(' ')
    );
    w.push(
      [tempKeyHex[12], tempKeyHex[13], tempKeyHex[14], tempKeyHex[15]].join(' ')
    );



    //g(w[3])
    // circular byte left shift
    let temp = w[3].split(' ');
    console.log("w3 ", temp);
    let tempLeftShift = []; //holds values after shift
    for (var i = 0; i < temp.length - 1 ; i++) {
        tempLeftShift.push(temp[i+1]);
    }
    tempLeftShift.push(temp[0]);

    // tempLeftShift = tempLeftShift.join(' ');
    console.log("left shift ", tempLeftShift);

    //byte substitution
    let byteSub = [];
    for (var i = 0; i < tempLeftShift.length; i++) {
      let row = tempLeftShift[i].split('')[0];
      let col = tempLeftShift[i].split('')[1];
      console.log('row ', row);
      console.log('col ', col);
      console.log('templeftshift ', tempLeftShift[i])
      if (row == 'a') {
        row = 10;
      }else if (row =='b') {
        row = 11;
      }else if (row =='c') {
        row = 12;
      }else if (row =='d') {
        row = 13;
      }else if (row =='e') {
        row = 14;
      }else if (row =='f') {
        row = 15;
      }

      if (col == 'a') {
        col = 10;
      }else if (col =='b') {
        col = 11;
      }else if (col =='c') {
        col = 12;
      }else if (col =='d') {
        col = 13;
      }else if (col =='e') {
        col = 14;
      }else if (col =='f') {
        col = 15;
      }


      byteSub.push(s_box[row][col].toString(16));
    }


    //add round constant
    // TODO: roundConstant is multiplied by 2 every round
    let roundConstant = [ [0x01, 0x00, 0x00, 0x00],
                          [0x02, 0x00, 0x00, 0x00],
                          [0x04, 0x00, 0x00, 0x00],
                          [0x08, 0x00, 0x00, 0x00],
                          [0x10, 0x00, 0x00, 0x00],
                          [0x20, 0x00, 0x00, 0x00],
                          [0x40, 0x00, 0x00, 0x00],
                          [0x80, 0x00, 0x00, 0x00],
                          [0x1B, 0x00, 0x00, 0x00],
                          [0x36, 0x00, 0x00, 0x00],
                        ];
    let addedRoundConstant = [];
    // TODO: XORED not substracted
    console.log('bytesub ', byteSub);



    for (var i = 0; i < byteSub.length; i++) {

      let str='';
      let a = hexToBin(byteSub[i]).split('');
      let b = hexToBin(roundConstant[x][i].toString(16)).split('');

      for (var m = 0; m < a.length; m++) {
        str += a[m] ^ b[m];
      }


      addedRoundConstant.push(
        parseInt(str, 2).toString(16)
      );
    }

    //w[4]
    let tempArr = [];
    let tempVar;
    // w[4]=w[0] XOR g(w[3])
    let tempBin = [];
    for (var i = 0; i < addedRoundConstant.length; i++) {
      tempBin.push({bin1: hexToBin(w[0].split(' ')[i]),
        bin2: hexToBin(addedRoundConstant[i])
      });
    }
    let xored = '';          let temp2 = [];

    for (var i = 0; i < tempBin.length; i++) {
      xored = '';
      for (var j = 0; j < tempBin[i].bin1.split('').length; j++) {
        xored += (tempBin[i].bin1.split('')[j] ^ tempBin[i].bin2.split('')[j]);
      }
      temp2.push(parseInt(xored, 2).toString(16))
      console.log(tempBin[i].bin1 + " XOR " + tempBin[i].bin2);
      console.log("xored ", xored);
    }

    w.push(
      temp2.join(' ')
    );

    let indexLeft = 4;
    let indexRight = 1;

    let tempBinLeft,  tempBinRight;
    // w[5] -- w[7]
    for (var i = 0; i < 3; i++) {
      temp2 = [];
      tempBin = [];
      tempBinLeft = '';tempBinRight = '';
      // temp2 = [];
      xored = '';
      for (var j = 0; j < w[indexLeft].split(' ').length; j++) {
        // xored += (hexToBin(w[indexLeft].split(' ')[j]) ^ hexToBin(w[indexRight].split(' ')[j]))
        // xored += (w[indexLeft].split(' ')[j] ^ w[indexRight].split(' ')[j]);
        tempBin.push(
          {bin1: hexToBin(w[indexLeft].split(' ')[j]), bin2: hexToBin(w[indexRight].split(' ')[j])}
        );
        // console.log(hexToBin(w[indexLeft].split(' ')[j]) ^ hexToBin(w[indexRight].split(' ')[j]))
      }
      console.log(tempBin);
      let xoredArr = []; xored = ''; let xoredString = '';
      for (var k = 0; k < tempBin.length; k++) {
        xored = ""
        for (var j = 0; j < tempBin[k].bin1.length; j++) {
          // console.log(tempBin[k].bin1 + " XORED " + tempBin[k].bin2)
          xored += (tempBin[k].bin1.split('')[j] ^ tempBin[k].bin2.split('')[j]) ;
        }
        xored = parseInt(xored, 2).toString(16) + " ";
        xoredString += xored;
      }
      console.log(xoredString);
      w.push(
        xoredString.trim()
      )
      indexLeft++;
      indexRight++;

    }
    let roundKey = '';
    for (var i = 4; i < w.length; i++) {
      roundKey += w[i] + " ";
    }


    console.log("w ", w);
    console.log("roundkey ", roundKey);
    tempKeyHex  = roundKey.split(' ');
    w = [];

    roundKeys.push(roundKey.trim());

  }
  return roundKeys;
}
//add round key for round 0
function addRoundKeyInit(plainText, roundKey){
  let plainTextInHex = textToHex(plainText);
  console.log(plainTextInHex);

  let stateMatrix = toMatrix(plainTextInHex);
  let roundKeyMatrix = toMatrix(roundKey);

  return xorMatrix(stateMatrix, roundKeyMatrix);
}
// add round key for round >= 1
function addRoundKey(stateMatrix, roundKeyMatrix){
  return xorMatrix(stateMatrix, roundKeyMatrix);
}

function toMatrix(val){
  let matrix = [];
  let value = val.split(' ');
  matrix.push([value[0], value[4], value[8], value[12]]); //row 1
  matrix.push([value[1], value[5], value[9], value[13]]); //row 2
  matrix.push([value[2], value[6], value[10], value[14]]);  //row 3
  matrix.push([value[3], value[7], value[11], value[15]]); //row 4
  return matrix;
}

function xorMatrix(matrix1, matrix2){
  let newMatrix = [];
  console.log("matrix 1", matrix1);
  console.log("matrix 2", matrix2);
  let indexLeft = 0;
  let indexRight = 0;

  // for (var i = 0; i < matrix1.length; i++) {
  //   for (var j = 0; j < matrix1[i].length; j++) {
  let row = [];
  let val = [];
  for (var i = 0; i <19; i++) {
    let xored = '';

    if (indexRight > 3) {
      indexRight = 0;
      indexLeft++;
      newMatrix.push([val[0], val[1], val[2], val[3]]);
      val = [];
    }else {

      let a = hexToBin(matrix1[indexLeft][indexRight]);
      let b = hexToBin(matrix2[indexLeft][indexRight]);
      console.log("indexLeft ", indexLeft);
      console.log("indexRight ", indexRight);
      console.log(matrix1[indexLeft][indexRight] +" xor " + matrix2[indexLeft][indexRight]);
      console.log(a +" xor " + b);
      for (var k = 0; k < a.length; k++) {
        xored += (a.split('')[k] ^ b.split('')[k])
      }

      indexRight++;
      val.push(parseInt(xored, 2).toString(16).padStart(2, "0"))
    }

    console.log("xored ", xored);
  }

  newMatrix.push([val[0], val[1], val[2], val[3]]);

  console.log(newMatrix);

  return newMatrix;

}

function substitutionBytes(stateMatrix){
  let matrix = stateMatrix;
  let newMatrix = []; let value; let row, col;

  for (var i = 0; i < matrix.length; i++) {
    let rowArr = [];
    for (var j = 0; j < matrix[i].length; j++) {
      value = matrix[i][j];
      row = value[0]; col = value[1];

      if (row.includes('a')) {
        row = 10;
      }else if (row.includes('b')) {
        row = 11;
      }else if (row.includes('c')) {
        row = 12;
      }else if (row.includes('d')) {
        row = 13;
      }else if (row.includes('e')) {
        row = 14;
      }else if (row.includes('f')) {
        row = 15;
      }

      if (col.includes('a')) {
        col = 10;
      }else if (col.includes('b')) {
        col = 11;
      }else if (col.includes('c')) {
        col = 12;
      }else if (col.includes('d')) {
        col = 13;
      }else if (col.includes('e')) {
        col = 14;
      }else if (col.includes('f')) {
        col = 15;
      }
      value = s_box[row][col].toString(16);
      rowArr.push(value);
    }
    newMatrix.push(rowArr);
  }
  console.log(newMatrix)

  return newMatrix;

}

function shiftRow(matrix){
  return [
    [matrix[0][0], matrix[0][1], matrix[0][2], matrix[0][3]],
    [matrix[1][1], matrix[1][2], matrix[1][3], matrix[1][0]],
    [matrix[2][2], matrix[2][3], matrix[2][0], matrix[2][1]],
    [matrix[3][3], matrix[3][0], matrix[3][1], matrix[3][2]],
  ]
}

function mixColumns(s, Nb) {
  for (let c=0; c<Nb; c++) {
      const a = new Array(Nb);  // 'a' is a copy of the current column from 's'
      const b = new Array(Nb);  // 'b' is a•{02} in GF(2^8)
      for (let r=0; r<4; r++) {
          a[r] =  parseInt(s[r][c], 16);
          b[r] =  parseInt(s[r][c], 16)&0x80 ?
                  parseInt(s[r][c], 16)<<1 ^ 0x011b : parseInt(s[r][c],16)<<1;
      }
      // a[n] ^ b[n] is a•{03} in GF(2^8)
      s[0][c] = (b[0] ^ a[1] ^ b[1] ^ a[2] ^ a[3]).toString(16); // {02}•a0 + {03}•a1 + a2 + a3
      s[1][c] = (a[0] ^ b[1] ^ a[2] ^ b[2] ^ a[3]).toString(16); // a0 • {02}•a1 + {03}•a2 + a3
      s[2][c] = (a[0] ^ a[1] ^ b[2] ^ a[3] ^ b[3]).toString(16); // a0 + a1 + {02}•a2 + {03}•a3
      s[3][c] = (a[0] ^ b[0] ^ a[1] ^ a[2] ^ b[3]).toString(16); // {03}•a0 + a1 + a2 + {02}•a3
  }
  return s;
}

//outputs to string in matrix format
function matrixFormat(matrix){
  return matrix[0][0] + " " + matrix[0][1] + " " + matrix[0][2] + " " + matrix[0][3] + "<br>" +
  matrix[1][0] + " " + matrix[1][1] + " " +    matrix[1][2] + " " + matrix[1][3] + "<br>" +
  matrix[2][0] + " " + matrix[2][1] + " " +    matrix[2][2] + " " + matrix[2][3] + "<br>" +
  matrix[3][0] + " " + matrix[3][1] + " " +    matrix[3][2] + " " + matrix[3][3];

}
//cipher text uses column as rows
// function matrixToCipher(matrix){
//   return matrix[0][0] + " " + matrix[1][0] + " " + matrix[2][0] + " " + matrix[3][0] + " " +
//   matrix[0][1] + " " + matrix[1][1] + " " + matrix[2][1] + " " + matrix[3][1] + " " +
//   matrix[0][2] + " " + matrix[1][2] + " " + matrix[2][2] + " " + matrix[3][2] + " " +
//   matrix[0][3] + " " + matrix[1][3] + " " + matrix[2][3] + " " + matrix[3][3];
// }

function matrixToCipher(matrix){
  // console.log(parseInt(matrix[0][0], 16));
  return parseInt(matrix[0][0], 16).toString()+" "+ parseInt(matrix[1][0], 16).toString()+" " + parseInt(matrix[2][0], 16).toString()+" " +  parseInt(matrix[3][0], 16).toString()+" " +
  parseInt(matrix[0][1], 16).toString()+" " + parseInt(matrix[1][1], 16).toString()+" " + parseInt(matrix[2][1], 16).toString()+" " + parseInt(matrix[3][1], 16).toString()+" " +
  parseInt(matrix[0][2], 16).toString()+" " + parseInt(matrix[1][2], 16).toString()+" " + parseInt(matrix[2][2], 16).toString()+" " + parseInt(matrix[3][2], 16).toString()+" " +
  parseInt(matrix[0][3], 16).toString()+" " + parseInt(matrix[1][3], 16).toString()+" " + parseInt(matrix[2][3], 16).toString()+" " + parseInt(matrix[3][3], 16).toString();
}

let matrix; let aesOutputArr = [];
let aesOutput;

// NOTE: roundKeys is array of strings. remember to use fn toMatrix() to make it
// 4x4 array
module.exports.aes = {
  doAes: function(message, key) {
    //round 0
    let roundKeys = getRoundKeys(key);
    matrix = addRoundKeyInit(message, roundKeys[0]);
    console.log(matrix)
    // round 1 - 9
    for (var i = 0; i < 9; i++) {

      matrix = substitutionBytes(matrix);

      matrix = shiftRow(matrix);

      matrix = mixColumns(matrix, 4);

      aesOutput = addRoundKey(matrix, toMatrix(roundKeys[i+1]));

      matrix = aesOutput;
    }

    // round 10
    // round 10 doesnt use mixcolumns

    matrix = substitutionBytes(matrix);

    matrix = shiftRow(matrix);

    aesOutput = addRoundKey(matrix, toMatrix(roundKeys[10]));

    answer = matrixToCipher(aesOutput);
    console.log(answer);
    return answer;
  }

};
