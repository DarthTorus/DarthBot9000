var bot = process.DiscordBot;
var imgPath = "./colorSquare.png";
//var imgWidth, imgHeight = 400;

function colorCheck(m, cI) {
	switch (m[0]) {
		case 'convert':
			m.shift();
			convertColor(m, cI);
			break;
		case 'random':
			randomColor(cI);
			break;
		case 'add':
			m.shift();
			addColor(m, cI);
			break;
		case 'sub':
			m.shift();
			subColor(m, cI);
			break;
		case 'gradient':
			m.shift();
			gradientColors(m, cI);
			break;
		default:
			//do nothing
	}
}

function drawSolidImage(imgColor, cI) {
	var size = 70
	var img = bot.PNGImage.createImage(size, size);
	var r = Number(imgColor[0]);
	var g = Number(imgColor[1]);
	var b = Number(imgColor[2]);
	var color = {
		red: r,
		green: g,
		blue: b,
		alpha: 255
	};
	console.log(color);
	console.log("cI: " + cI);
	img.fillRect(0, 0, size, size, color);
	img.writeImage(imgPath, function(err) {
		if (err) {
			throw err;
		}
		console.log('Written to the file');
		console.log(imgPath);
		bot.uploadFile({
			to: cI,
			file: imgPath
		}, function(error) {
			if (error) {
				console.log(error);
			}
		});
	});
}

function drawAddedImage(color1, color2, result, cI) {
	var size = 150;
	var r1 = Number(color1[0]);
	var g1 = Number(color1[1]);
	var b1 = Number(color1[2]);
	var r2 = Number(color2[0]);
	var g2 = Number(color2[1]);
	var b2 = Number(color2[2]);
	var resR = Number(result[0]);
	var resG = Number(result[1]);
	var resB = Number(result[2]);
	var col1 = {
		red: r1,
		green: g1,
		blue: b1,
		alpha: 255
	};
	var col2 = {
		red: r2,
		green: g2,
		blue: b2,
		alpha: 255
	};
	var res = {
		red: resR,
		green: resG,
		blue: resB,
		alpha: 255
	};
	var img = bot.PNGImage.createImage(size, size);

	img.fillRect(0, 0, 125, 125, col1);
	img.fillRect(25, 25, 125, 125, col2);
	img.fillRect(25, 25, 100, 100, res);
	img.writeImage(imgPath, function(err) {
		if (err) {
			throw err;
		}
		console.log('Written to the file');
		console.log(imgPath);
		bot.uploadFile({
			to: cI,
			file: imgPath
		}, function(error) {
			if (error) {
				console.log(error);
			}
		});
	});
}

function drawSubImage(color) {}

function randomColor(chID) {
	// First set conversion type and initalize the rgb values
	var msg = ["RGB",0,0,0];
	// get random rgb values
	for(var i = 1; i < 4; i++) {
		msg[i] = bot.random(256);
	}
	bot.sendMessages(chID, ["`RGB: " + msg[1] + " " + msg[2] + " " + msg[3] + "`"]);
	convertColor(msg, chID)
}

function convertColor(msg, cID) {
	var convF = msg[0].toUpperCase();
	var rgb;
	switch (convF) {
		case 'CMYK':
			msg.shift();
			rgb = CMYKtoRGB(msg, cID);
			RGBtoHEX(rgb, cID);
			RGBtoHSL(rgb, cID);
			RGBtoHSV(rgb, cID);
			RGBtoINT(rgb, cID);
			drawSolidImage(rgb, cID);
			break;
		case 'HEX':
			msg.shift();
			rgb = HEXtoRGB(msg, cID);
			RGBtoCMYK(rgb, cID);
			RGBtoHSL(rgb, cID);
			RGBtoHSV(rgb, cID);
			RGBtoINT(rgb, cID);
			drawSolidImage(rgb, cID);
			break;
		case 'HSL':
			msg.shift();
			rgb = HSLtoRGB(msg, cID);
			RGBtoCMYK(rgb, cID);
			RGBtoHEX(rgb, cID);
			RGBtoHSV(rgb, cID);
			RGBtoINT(rgb, cID);
			drawSolidImage(rgb, cID);
			break;
		case 'HSV':
			msg.shift();
			rgb = HSVtoRGB(msg, cID);
			RGBtoCMYK(rgb, cID);
			RGBtoHEX(rgb, cID);
			RGBtoHSL(rgb, cID);
			RGBtoINT(rgb, cID);
			drawSolidImage(rgb, cID);
			break;
		case 'INT':
			msg.shift();
			rgb = INTtoRGB(msg, cID);
			RGBtoCMYK(rgb, cID);
			RGBtoHEX(rgb, cID);
			RGBtoHSL(rgb, cID);
			RGBtoHSV(rgb, cID);
			drawSolidImage(rgb, cID);
			break;
		case 'RGB':
			msg.shift();
			RGBtoCMYK(msg, cID);
			RGBtoHEX(msg, cID);
			RGBtoHSL(msg, cID);
			RGBtoHSV(msg, cID);
			RGBtoINT(msg, cID);
			drawSolidImage(msg, cID);
			break;
	}

}

function addColor(msg, cID) {
	if(msg == 'random') {
		var m = [0,0,0,0,0,0];
		for (i = 0; i < m.length; i++) {
			m[i] = bot.random(256);
		}
		addColor(m, cID);
	}
	else{
		var color1 = [0, 0, 0];
		var color2 = [0, 0, 0];
		var resultColor = [0, 0, 0];
		if (msg.length == 6 && checkRGB(color1) && checkRGB(color2)) {
			color1[0] = Number(msg[0]);
			color1[1] = Number(msg[1]);
			color1[2] = Number(msg[2]);
			color2[0] = Number(msg[3]);
			color2[1] = Number(msg[4]);
			color2[2] = Number(msg[5]);
			var messageString = "`Color 1: " + color1[0] + " " + color1[1] + " " +color1[2] + "`\n";
			messageString += "`Color 2: " + color2[0] + " " + color2[1] + " " +color2[2] + "`\n";
			
			for (i = 0; i <= 2; i++) {
				var temp = Math.pow(color1[i],2)+Math.pow(color2[i],2);
				temp *= .5;
				temp = Math.floor(Math.sqrt(temp));
				resultColor[i] = Math.min(temp, 255);
			}
			messageString += "`Result: " + resultColor[0] + " " + resultColor[1] + " " + resultColor[2] + "`";
			bot.sendMessages(cID,[messageString]);
			console.log(color1);
			console.log(color2);
			console.log(resultColor);

			RGBtoCMYK(resultColor, cID);
			RGBtoHEX(resultColor, cID);
			RGBtoHSL(resultColor, cID);
			RGBtoHSV(resultColor, cID);
			RGBtoINT(resultColor, cID);
			drawAddedImage(color1, color2, resultColor, cID);
		}
	}
}

function subColor(msg, cID) {
	var startCol = [0, 0, 0];
	var subCol = [0, 0, 0];
	var resultColor = [0, 0, 0];
	if (msg.length == 6 && checkRGB(startCol) && checkRGB(subCol)) {
		startCol[0] = Number(msg[0]);
		startCol[1] = Number(msg[1]);
		startCol[2] = Number(msg[2]);
		subCol[0] = Number(msg[3]);
		subCol[1] = Number(msg[4]);
		subCol[2] = Number(msg[5]);

		for (i = 0; i <= 2; i++) {
			resultColor[i] = Math.round(startCol[i] * 2 - subCol[i]);
			if (resultColor[i] < 0) {
				resultColor[i] = 0;
			} else if (resultColor[i] > 255) {
				resultColor[i] = 255;
			}
		}
		console.log(startCol);
		console.log(subCol);
		console.log(resultColor);
		bot.sendMessages(cID, ["`RGB: " + resultColor[0] + " " + resultColor[1] + " " + resultColor[2] + "`"]);
		RGBtoCMYK(resultColor, cID);
		RGBtoHEX(resultColor, cID);
		RGBtoHSL(resultColor, cID);
		RGBtoHSV(resultColor, cID);
		RGBtoINT(resultColor, cID);
	}
}

function gradientColors(msg, cID) {
	console.log(msg);
	var startCol = [0, 0, 0];
	var endCol = [0, 0, 0];
	var maxMid = 254;
	var minMid = 14;
	var mesg = new Array(6);
	var path = "./gradientSquare.png";
	if (msg[0] == "random") {

		for(var i = 0; i <6;i++) {
			mesg[i] = Math.floor(Math.random()*256);
		}
		if(msg[1] != undefined) {

			mesg[6] = msg[1];
			if(mesg[6] > maxMid) {
				mesg[6] = maxMid;
			}
			else if(mesg[6] < minMid) {
				mesg[6] = minMid;
			}
		} else {
			mesg[6] = Math.floor(Math.random()*maxMid- minMid) + minMid;
		}

		gradientColors(mesg, cID);
	} else {
		startCol[0] = Number(msg[0]);
		startCol[1] = Number(msg[1]);
		startCol[2] = Number(msg[2]);
		endCol[0] = Number(msg[3]);
		endCol[1] = Number(msg[4]);
		endCol[2] = Number(msg[5]);
		var midpts = Number(msg[msg.length - 1]);
		if (midpts > maxMid) {
			midpts = maxMid;
		}
		else if (midpts < minMid) {
			midpts = minMid;
		}
		var resultText = "";
		var rInterval, gInterval, bInterval = 0;
		// Store image vars here
		var size = 256;
		var barWidth = size / (midpts + 2);
		console.log("barWidth: " + barWidth + "px");

		rInterval = (endCol[0] - startCol[0]) / (midpts + 1);
		gInterval = (endCol[1] - startCol[1]) / (midpts + 1);
		bInterval = (endCol[2] - startCol[2]) / (midpts + 1);

		// If in RGB mode, length will be 7, else HEX mode will be 3
		var msgText = "```Start color: " + startCol[0] + " " + startCol[1] + " " + startCol[2] + "\n";
		msgText += "End color: " + endCol[0] + " " + endCol[1] + " " + endCol[2] + "\n";
		msgText += "RGB interval: " + rInterval + " " + gInterval + " " + bInterval + "\n";
		msgText += "Midpoints: " + midpts +"```";

		bot.sendMessages(cID, [msgText]);

	}
	if (msg.length == 7 && checkRGB(startCol) && checkRGB(endCol)) {
		var barColor;

		// Start creating image here
		var img = bot.PNGImage.createImage(size, size);
		barColor = {
			red: startCol[0],
			green: startCol[1],
			blue: startCol[2],
			alpha: 255
		};
		img.fillRect(0, 0, barWidth, size, barColor);
		// Add start color to resultText
		//resultText += ("```1) " + startCol[0] + " " + startCol[1] + " " + startCol[2] + "\n");

		// Add each interval to resultText
		for (var i = 1; i <= midpts; i++) {
			var tempR = Math.round(i * rInterval) + startCol[0];
			var tempG = Math.round(i * gInterval) + startCol[1];
			var tempB = Math.round(i * bInterval) + startCol[2];
			barColor = {
				red: tempR,
				green: tempG,
				blue: tempB,
				alpha: 255
			};
			//console.log(barColor);
			//resultText += ((i + 1) + ") " + tempR + " " + tempG + " " + tempB + "\n");
			var x = barWidth * i;
			//console.log(x);
			img.fillRect(x, 0, barWidth, size, barColor);
		}
		// Add ending color to resultText
		//resultText += ((midpts + 2) + ") " + endCol[0] + " " + endCol[1] + " " + endCol[2] + "```");
		barColor = {
			red: endCol[0],
			green: endCol[1],
			blue: endCol[2],
			alpha: 255
		};
		//console.log((midpts + 1) * barWidth);
		img.fillRect((midpts + 1) * barWidth, 0, barWidth, size, barColor);
		// Send all of resultText to the user
		//bot.sendMessages(cID, [resultText]);
		img.writeImage(path, function(err) {
			if (err) {
				throw err;
			}
			console.log('Written to the file');
			console.log(path);
			bot.uploadFile({
				to: cID,
				file: path
			}, function(error) {
				if (error) {
					console.log(error);
				}
			});
		});
	} else if (msg.length == 3) {
		startCol = HEXtoINT(msg[0]);
		endCol = HEXtoINT(msg[1]);
		midpts = Number(msg[2]);
		console.log("===========");
		console.log(startCol[0]);
		console.log(startCol[1]);
		console.log(startCol[2]);
		console.log(endCol[0]);
		console.log(endCol[1]);
		console.log(endCol[2]);
		// Calculate intervals between values
		rInterval = (endCol[0] - startCol[0]) / (midpts + 1);
		console.log("rInterval: " + rInterval);
		gInterval = (endCol[1] - startCol[1]) / (midpts + 1);
		console.log("gInterval: " + gInterval);
		bInterval = (endCol[2] - startCol[2]) / (midpts + 1);
		console.log("bInterval: " + bInterval);

		// Add start color to resultText after a check
		var startR = checkHEXLength(startCol[0]);
		var startG = checkHEXLength(startCol[1]);
		var startB = checkHEXLength(startCol[2]);

		resultText += ("```1) #" + startR + startG + startB + "\n");
		// Add each interval to resultText
		for (var i = 1; i <= midpts; i++) {
			var tempR = Math.round(i * rInterval) + startCol[0];
			var tempG = Math.round(i * gInterval) + startCol[1];
			var tempB = Math.round(i * bInterval) + startCol[2];

			tempR = checkHEXLength(tempR);
			tempG = checkHEXLength(tempG);
			tempB = checkHEXLength(tempB);

			resultText += ((i + 1) + ") #" + tempR + tempG + tempB + "\n");
		}
		// Add ending color to resultText after some checks
		var endR = checkHEXLength(endCol[0]);
		var endG = checkHEXLength(endCol[1]);
		var endB = checkHEXLength(endCol[2]);

		resultText += ((midpts + 2) + ") #" + endR + endG + endB + "```");

		// Send all of resultText to the user
		bot.sendMessages(cID, [resultText.toUpperCase()]);
	}
}

function HEXtoINT(color) {
	var result = [0, 0, 0];
	if (color.length == 3) {
		result[0] = color.substr(0, 1).toUpperCase();
		result[1] = color.substr(1, 1).toUpperCase();
		result[2] = color.substr(2, 1).toUpperCase();

		result[0] += result[0];
		result[1] += result[1];
		result[2] += result[2];

		result[0] = parseInt(result[0], 16);
		result[1] = parseInt(result[1], 16);
		result[2] = parseInt(result[2], 16);
		console.log(result[0]);
		console.log(result[1]);
		console.log(result[2]);
	} else if (color.length == 6) {
		result[0] = parseInt(color.substr(0, 2).toUpperCase(), 16);
		result[1] = parseInt(color.substr(2, 2).toUpperCase(), 16);
		result[2] = parseInt(color.substr(4, 2).toUpperCase(), 16);
	}
	return result;
}

function checkHEXLength(hVal) {
	if (hVal.toString(16).length == 1) {
		if (hVal > 15) {
			hVal = hVal.toString(16);
			hVal += hVal;
		} else if (hVal <= 15) {
			hVal = hVal.toString(16);
			hVal = "0" + hVal;
		}
	} else {
		hVal = hVal.toString(16);
	}
	return hVal;
}

//RGB to any other color format
function RGBtoCMYK(color, chID) {
	console.log(color);
	if (checkRGB(color)) {
		var rPrime = color[0] / 255;
		var gPrime = color[1] / 255;
		var bPrime = color[2] / 255;
		var K = (1 - Math.max(rPrime, gPrime, bPrime));
		var kPrime = 1 - K;
		var C = Math.round(((1 - rPrime - K) / kPrime) * 1000) / 10;
		var M = Math.round(((1 - gPrime - K) / kPrime) * 1000) / 10;
		var Y = Math.round(((1 - bPrime - K) / kPrime) * 1000) / 10;
		K = Math.round(K * 1000) / 10;
		bot.sendMessages(chID, ["`CMYK: " + C + "%, " + M + "%, " + Y + "%, " + K + "%`"]);
	}
}

function RGBtoHEX(color, chID) {
	if (checkRGB(color)) {
		var r = toHex(color[0]);
		var g = toHex(color[1]);
		var b = toHex(color[2]);
		bot.sendMessages(chID, ["`HEX: #" + r + g + b + "`"]);
	}
}

function RGBtoHSL(color, chID) {
	if (checkRGB(color)) {
		var rPrime = color[0] / 255;
		var gPrime = color[1] / 255;
		var bPrime = color[2] / 255;
		var cMax = Math.max(rPrime, gPrime, bPrime);
		var cMin = Math.min(rPrime, gPrime, bPrime);
		var delta = cMax - cMin;
		var hue = 0;
		var sat = 0;
		var light = (cMax + cMin) / 2;
		if (delta == 0) {
			hue = 0;
		} else if (cMax == rPrime) {
			hue = 60 * (((gPrime - bPrime) / delta) % 6);
		} else if (cMax == gPrime) {
			hue = 60 * (((bPrime - rPrime) / delta) + 2);
		} else if (cMax == bPrime) {
			hue = 60 * (((rPrime - gPrime) / delta) + 4);
		}

		if (delta == 0) {
			sat = 0;
		} else if (delta != 0) {
			sat = (delta / (1 - Math.abs(2 * light - 1)));
		}
		hue = Math.round(hue);
		if (hue < 0) {
			hue += 360;
		}
		sat = Math.round(sat * 1000) / 10;
		light = Math.round(light * 1000) / 10;
		bot.sendMessages(chID, ["`HSL: " + hue + "°, " + sat + "%, " + light + "% `"]);
	}
}

function RGBtoHSV(color, chID) {
	if (checkRGB(color)) {
		var rPrime = color[0] / 255;
		var gPrime = color[1] / 255;
		var bPrime = color[2] / 255;
		var cMax = Math.max(rPrime, gPrime, bPrime);
		var cMin = Math.min(rPrime, gPrime, bPrime);
		var delta = cMax - cMin;
		var hue = 0;
		var sat = 0;
		var light = cMax;
		if (delta == 0) {
			hue = 0;
		} else if (cMax == rPrime) {
			hue = 60 * (((gPrime - bPrime) / delta) % 6);
		} else if (cMax == gPrime) {
			hue = 60 * (((bPrime - rPrime) / delta) + 2);
		} else if (cMax == bPrime) {
			hue = 60 * (((rPrime - gPrime) / delta) + 4);
		}

		if (cMax == 0) {
			sat = 0;
		} else if (cMax != 0) {
			sat = (delta / cMax);
		}
		hue = Math.round(hue);
		if (hue < 0) {
			hue += 360;
		}
		sat = Math.round(sat * 1000) / 10;
		value = Math.round(light * 1000) / 10;
		bot.sendMessages(chID, ["`HSV: " + hue + "°, " + sat + "%, " + value + "% `"]);
	}
}

function RGBtoINT(color, chID) {
	if (checkRGB(color)) {
		var intColor = 0;
		intColor += (256 * 256 * color[0]);
		intColor += 256 * color[1];
		intColor += 1 * color[2];
		bot.sendMessages(chID, ["`INT: " + intColor + "`"]);
	}
}
// Other color formats to RGB
function CMYKtoRGB(color, chID) {
	if (checkCMYK(color)) {
		var c = color[0] / 100;
		var m = color[1] / 100;
		var y = color[2] / 100;
		var k = color[3] / 100;
		var r = Math.round(255 * (1 - c) * (1 - k));
		var g = Math.round(255 * (1 - m) * (1 - k));
		var b = Math.round(255 * (1 - y) * (1 - k));
		bot.sendMessages(chID, ["`RGB: " + r + " " + g + " " + b + "`"]);
		var rgb = [r, g, b];
		return rgb;
	}
}

function HEXtoRGB(color, chID) {
	if (checkHex(color)) {
		var hex = "0123456789ABCDEF";
		var r;
		var g;
		var b;
		var rgb;
		color = color[0].substring(1, color[0].length).toUpperCase();
		console.log("Length: " + color.length);
		if (color.length == 3) {
			color.split("");
			console.log(color);
			r = (hex.indexOf(color[0]) * 16 + hex.indexOf(color[0]));
			g = (hex.indexOf(color[1]) * 16 + hex.indexOf(color[1]));
			b = (hex.indexOf(color[2]) * 16 + hex.indexOf(color[2]));
			rgb = [r, g, b];
			bot.sendMessages(chID, ["`RGB: " + r + " " + g + " " + b + "`"]);
			return rgb;
		} else if (color.length == 6) {
			color.split("");
			console.log(color);
			r = (hex.indexOf(color[0]) * 16 + hex.indexOf(color[1]));
			g = (hex.indexOf(color[2]) * 16 + hex.indexOf(color[3]));
			b = (hex.indexOf(color[4]) * 16 + hex.indexOf(color[5]));
			rgb = [r, g, b];
			bot.sendMessages(chID, ["`RGB: " + r + " " + g + " " + b + "`"]);
			return rgb;
		}
	}
}

function HSLtoRGB(color, chID) {
	if (checkHSL(color)) {
		var h = color[0];
		var s = color[1] / 100;
		var l = color[2] / 100;
		var rgb = [0, 0, 0];
		var rgbPrime = [0, 0, 0];
		var cPrime = (1 - Math.abs(2 * l - 1)) * s;
		var x = (cPrime * (1 - Math.abs((h / 60) % 2 - 1)));
		var m = l - (cPrime / 2);
		if (h >= 0 && h < 60) {
			rgbPrime = [cPrime, x, 0];
		} else if (h >= 60 && h < 120) {
			rgbPrime = [x, cPrime, 0];
		} else if (h >= 120 && h < 180) {
			rgbPrime = [0, cPrime, x];
		} else if (h >= 180 && h < 240) {
			rgbPrime = [0, x, cPrime];
		} else if (h >= 240 && h < 300) {
			rgbPrime = [x, 0, cPrime];
		} else if (h >= 300 && h < 360) {
			rgbPrime = [cPrime, 0, x];
		}
		rgb = [Math.round((rgbPrime[0] + m) * 255),
			Math.round((rgbPrime[1] + m) * 255),
			Math.round((rgbPrime[2] + m) * 255)
		];
		bot.sendMessages(chID, ["`RGB: " + rgb[0] + " " + rgb[1] + " " + rgb[2] + "`"]);
		return rgb;
	}
}

function HSVtoRGB(color, chID) {
	if (checkHSV(color)) {
		var hue = color[0];
		var sat = color[1] / 100;
		var val = color[2] / 100;
		var rgb = [0, 0, 0];
		var rgbPrime = [0, 0, 0];
		var cPrime = val * sat;
		var xPrime = (hue / 60) % 2;
		var xPrime2 = (1 - Math.abs(xPrime - 1));
		var x = (cPrime * xPrime2);
		var m = val - cPrime;
		if (hue >= 0 && hue < 60) {
			rgbPrime = [cPrime, x, 0];
		} else if (hue >= 60 && hue < 120) {
			rgbPrime = [x, cPrime, 0];
		} else if (hue >= 120 && hue < 180) {
			rgbPrime = [0, cPrime, x];
		} else if (hue >= 180 && hue < 240) {
			rgbPrime = [0, x, cPrime];
		} else if (h >= 240 && h < 300) {
			rgbPrime = [x, 0, cPrime];
		} else if (h >= 300 && h < 360) {
			rgbPrime = [cPrime, 0, x];
		}
		rgb = [Math.round((rgbPrime[0] + m) * 255),
			Math.round((rgbPrime[1] + m) * 255),
			Math.round((rgbPrime[2] + m) * 255)
		];
		bot.sendMessages(chID, ["`RGB: " + rgb[0] + " " + rgb[1] + " " + rgb[2] + "`"]);
		return rgb;
	}
}

function INTtoRGB(color, chID) {
	if (color >= 0 && color <= 16777215) {
		var rgb = [0, 0, 0];
		var temp = color * 1;

		rgb[2] = temp % 256;
		temp = Math.floor(temp / 256);
		rgb[1] = temp % 256;
		temp = Math.floor(temp / 256);
		rgb[0] = temp % 256;

		bot.sendMessages(chID, ["`RGB: " + rgb[0] + " " + rgb[1] + " " + rgb[2] + "`"]);
		return rgb;
	}
}
// Testing values to make sure they fit within the color mode
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

function checkCMYK(col) {
	var errorVal = 0;
	if (!isNaN(col[0]) && !isNaN(col[1]) && !isNaN(col[2]) && !isNaN(col[3])) {
		for (i = 0; i < col.length; ++i) {
			if (col[i] < 0 || col[i] > 100) {
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

function checkHex(col) {
	var regExp = /^#([0-9A-F]{3}|[0-9A-F]{6})/i;
	console.log("In regex: " + regExp.test(col));
	if (regExp.test(col)) {
		return true;
	} else {
		return false;
	}
}

function checkHSL(col) {
	var h = col[0];
	var s = col[1];
	var l = col[2];
	var errorVal = 0;
	if (!isNaN(h) && !isNaN(s) && !isNaN(l)) {
		if (h > 360 || h < 0) {
			errorVal += 1;
		}
		if (s < 0 || s > 100) {
			errorVal += 1;
		}
		if (l < 0 || l > 100) {
			errorVal += 1;
		}
	} else {
		errorVal += 1;
	}
	if (errorVal > 0) {
		return false;
	} else {
		return true;
	}
	if (errorVal > 0) {
		return false;
	} else {
		return true;
	}
}

function checkHSV(col) {
	var h = col[0];
	var s = col[1];
	var v = col[2];
	var errorVal = 0;
	if (!isNaN(h) && !isNaN(s) && !isNaN(v)) {
		if (h > 360 || h < 0) {
			errorVal += 1;
		}
		if (s < 0 || s > 100) {
			errorVal += 1;
		}
		if (v < 0 || v > 100) {
			errorVal += 1;
		}
	} else {
		errorVal += 1;
	}
	if (errorVal > 0) {
		return false;
	} else {
		return true;
	}
	if (errorVal > 0) {
		return false;
	} else {
		return true;
	}
}

function checkINT(col) {
	if (col >= 0 && col <= 16777215) {
		return true;
	} else {
		return false;
	}
}

function toHex(val) {
	var hex = "0123456789ABCDEF";
	var quot = Math.floor(val / 16);
	var rem = val % 16;
	var result = hex[quot] + hex[rem];
	return result;
}

var colorFunctions = {
	colorCheck: colorCheck
};
module.exports = colorFunctions;
