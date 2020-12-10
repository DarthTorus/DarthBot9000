const namedColors = require("color-name-list")
const totalDaysArray= [31,29,31,30,31,30,31,31,30,31,30,31]
//const Closest = require('closestvector')

function sendImage(imgResult, imgPath, imgName, message, msgContent) {
  imgResult.writeImage(imgPath, function(err) {
    if (err) {
      throw err
    }
    message.channel.send({
      content: msgContent,
      files: [{
        attachment: imgPath,
        name: imgName
      }]
    });
  });
}
/**
 *
 * @param {String} col
 * @returns {Boolean} true if hex value matches
 */
function checkHex(col) {
  var regExp = /^#([0-9A-F]{3}|[0-9A-F]{6})/i;
  console.log("In regex: " + regExp.test(col));
  if (regExp.test(col)) {
    return true;
  } else {
    return false;
  }
}

function HEXtoRGB(hexColor, message) {
  if (checkHex(hexColor)) {
    var hex = "0123456789ABCDEF";
    var rP;
    var gP;
    var bP;
    var rgb;
    color = hexColor.slice(1).toUpperCase();
    console.log("Length: " + color.length);
    if (color.length == 3) {
      console.log(color);
      rP = (hex.indexOf(color[0]) * 16 + hex.indexOf(color[0]));
      gP = (hex.indexOf(color[1]) * 16 + hex.indexOf(color[1]));
      bP = (hex.indexOf(color[2]) * 16 + hex.indexOf(color[2]));
   } else if (color.length == 6) {
      console.log(color);
      rP = (hex.indexOf(color[0]) * 16 + hex.indexOf(color[1]));
      gP = (hex.indexOf(color[2]) * 16 + hex.indexOf(color[3]));
      bP = (hex.indexOf(color[4]) * 16 + hex.indexOf(color[5]));

    }
    rgb = {
      r: rP,
      g: gP,
      b: bP
    }
    return rgb;
  }
}

function toHex(val) {
  var hex = "0123456789ABCDEF";
  var quot = Math.floor(val / 16);
  var rem = val % 16;
  var result = hex[quot] + hex[rem];
  return result;
}
/**
 *
 *@param {String[]} color
 */
function RGBtoHEX(color) {
  if (checkRGB(color)) {
    var r = toHex(color[0]);
    var g = toHex(color[1]);
    var b = toHex(color[2]);
    return `#${r}${g}${b}`
  }
}

function checkRGB(col) {
  var errorVal = 0;
  if (!isNaN(col[0]) && !isNaN(col[1]) && !isNaN(col[2])) {
    for (i = 0; i < col.length; ++i) {
      if (col[i] < 0 || col[i] > 255) {
        errorVal += 1;
      }
    }
  } else {
    errorVal += 1;
  }
  if (errorVal > 0) {
    return false;
  } else {
    return true;
  }
}

function createImage(client, size, path, name, color, message, msgContent) {
  let img = client.PNGImage.createImage(size, size);
  img.fillRect(0, 0, size, size, color)
  sendImage(img, path, name, message, msgContent)
}

function getColorName(hexColor) {
  let = ""
  let col = namedColors.find(color => color.hex === hexColor)

  return text
}





module.exports = {
  name: "date",
  usage: "date #<date in MM-DD-YYYY | YYYY-DD-MM>",
  desc: "Outputs the color given a date in hex in the format MM-DD-YYYY or YYYY-DD-MM",
  alias: ["day"],
  run(client,message,args) {
    let hexColor = args[0].split("-")
    let month, year

    var col1 = hexColor[0]
    var col2 = hexColor[2]

    if(col1.length == 2 & col2.length == 4) {
      month = parseInt(col1)
      year = parseInt(col2)
    } else if(col2.length == 2 & col1.length == 4) {
      month = parseInt(col2)
      year = parseInt(col1)
    } else {
      message.reply("Please put date in YYYY-DD-MM or MM-DD-YYYY")
      return
    }

    let day = parseInt(hexColor[1])
    month = client.clamp(month,1,12)

    day = client.clamp(day,1,totalDaysArray[month-1])
    year = client.clamp(year,0,9999)
    console.log(month, day, year);
    let minColVal = 0
    let maxColVal = 255
    let r = Math.round(client.mapValue(month, 1, 12, minColVal, maxColVal))
    let g = Math.round(client.mapValue(day, 1, totalDaysArray[month-1], minColVal, maxColVal))
    let b = Math.round(client.mapValue(year % 100, 0, 99, minColVal, maxColVal))


    console.log(r, g, b);

    var imgCol1 = {
      red: r,
      green: g,
      blue: b,
      alpha: 255
    }
    console.log(imgCol1);

    var imgCol2 = {
      red: b,
      green: g,
      blue: r,
      alpha: 255
    }
    console.log(imgCol2);

    let size = 600
    let imgName1 = "dateImg1.jpg"
    let imgName2 = "dateImg2.jpg"
    let msgText1 = ""
    let msgText2 = ""
    let hexColor1 = ""
    let hexColor2 = ""

    try {
      hexColor1 = RGBtoHEX([r,g,b])
      msgText1 = `**Hex:** ${hexColor1}`
      msgText1 += getColorName(hexColor1)

    } catch (err) {
      msgText1 += "\n**Name:** N/A"
    }

    try {
      hexColor2 = RGBtoHEX([b,g,r])
      msgText2 = `**Hex:** ${hexColor2}`
      msgText2 += getColorName(hexColor2)
    } catch (err) {
      msgText2 += "\n**Name:** N/A"
    }

    createImage(client, size, `././images/${imgName1}`, imgName1, imgCol1, message, msgText1)
    createImage(client, size, `././images/${imgName2}`, imgName2, imgCol2, message, msgText2)
  }
}
/**
 *
 * @param {Object} client
 * @param {Number} size
 * @param {String} path
 * @param {String} name
 * @param {String} color
 * @param {Object} message
 * @param {String} msgContent
 */
