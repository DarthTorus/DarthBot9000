const namedColors = require("color-name-list")
//const Closest = require('closestvector')
function sendImage(imgResult, imgPath, imgName, message) {
  imgResult.writeImage(imgPath, function(err) {
    if (err) {
      throw err
    }
    message.channel.send({
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
}/**
 *
 *@param {String} color
 *@param {Object} message
 */
function RGBtoHEX(color, message) {
  if (checkRGB(color)) {
    var r = toHex(color[0]);
    var g = toHex(color[1]);
    var b = toHex(color[2]);
    message.channel.send("`HEX: #" + r + g + b + "`");
  }
}

module.exports = {
  name: "search",
  usage: "search <hex>",
  desc: "Will search for a color and output the name if it is an exact match.",
  alias: ["find"],
  run(client, message, args) {
    let hexColor = ""
    if(checkHex(args[0])) {
      hexColor = args[0]
    }
    if(hexColor.length == 3) {
      hexColor = hexColor[0]+hexColor[1]+hexColor[1]+hexColor[2]+hexColor[2]+hexColor[3]+hexColor[3]
    }
    console.log(hexColor);
    let size = 600
    let imgPath = "././images/searchImg.jpg"
    let img = client.PNGImage.createImage(size, size);
    let msgText =  `**Name:** \`${hexColor}\``

    let someColor = ""
    //let closestColorName = ""
    try {
      someColor = namedColors.find(color => color.hex === hexColor)
      console.log(someColor.name);
      msgText = `**Hex:** ${hexColor}`
      msgText += `\n**Name:** ${someColor.name}`


    } catch (err) {
      msgText += "\n**Name:** N/A"
    }

    //msgText += `\n**Closest Color:** ≈${closestColorName}`
    let colorVals = HEXtoRGB(hexColor)
    var color = {
      red: colorVals.r,
      green: colorVals.g,
      blue: colorVals.b,
      alpha: 255
    };
    console.log(color);
    img.fillRect(0, 0, size, size, color);
    message.channel.send(msgText);
    sendImage(img, imgPath, 'searchImg.jpg', message)
  }
}