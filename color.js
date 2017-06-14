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
		case 'palette':
			m.shift();
			getColorPalettes(m, cI);
			break;
		default:
			//do nothing
	}
}

function drawSolidImage(imgColor, cI) {
	var size = 70;
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
				var temp = (color1[i] * color1[i]) + (color2[i] * color2[i]);
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
	var minMid = 6;
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
			mesg[6] = bot.random(minMid,maxMid+1);
		}

		gradientColors(mesg, cID);
	}
	else if(msg[0] == "grey" || msg[0] =="gray") {
		mesg[0] = bot.random(256);
		mesg[1] = mesg[0];
		mesg[2] = mesg[0];
		mesg[3] = bot.random(256);
		mesg[4] = mesg[3];
		mesg[5] = mesg[3];
		mesg[6] = bot.random(14,255);

		if(msg[1] != undefined) {

			mesg[6] = msg[1];
			if(mesg[6] > maxMid) {
				mesg[6] = maxMid;
			}
			else if(mesg[6] < minMid) {
				mesg[6] = minMid;
			}
		} else {
			mesg[6] = bot.random(minMid,maxMid+1);
		}

		gradientColors(mesg,cID);
	}
	else {
		startCol[0] = Number(msg[0]);
		startCol[1] = Number(msg[1]);
		startCol[2] = Number(msg[2]);
		endCol[0] = Number(msg[3]);
		endCol[1] = Number(msg[4]);
		endCol[2] = Number(msg[5]);
		var midpts;
		if(msg[6] == null) {
			midpts = minMid;
			msg[6] = minMid;
		} else {
			midpts = Number(msg[6]);
		}
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

function getColorPalettes(msg, cID) {
	console.log("msg: " + msg);
	if(msg[0] != null) {
		switch(msg[0].toLowerCase()) {
			case 'square':
				msg.shift();
				getSqTetra(msg, cID);
				break;
			case 'rectangle':
			case 'rect':
				msg.shift();
				getRectTetra(msg, cID);
				break;
			case 'triad':
			case 'triadic':
				msg.shift();
				getTriadic(msg,cID);
				break;
			case 'analog':
			case 'analogous':
				msg.shift();
				getAnalogous(msg, cID);
				break;
			case 'tone':
				msg.shift();
				getTones(msg, cID);
				break;
			case 'tint':
				msg.shift();
				getTints(msg, cID);
				break;
			case 'shade':
				msg.shift();
				getShades(msg, cID);
				break;
			case 'split':
				msg.shift();
				getSplitComp(msg, cID);
				break;
			case 'complementary':
			case 'comp':
				msg.shift();
				getComplementary(msg, cID);
				break;
			case 'random':
				msg.shift();
				pickRandomPallete(msg, cID);
				break;
			default:
				//Do nothing
		}
	}
}

function pickRandomPallete(m, cI) {
	console.log("m.length: " + m.length);
	if(m.length == 1) {
		if(m[0] == 'random') {
			m.push(bot.random(256));
			m.push(bot.random(256));
			m.push(bot.random(256));
			m.shift();
			console.log("m: " + m);
			pickRandomPallete(m, cI);
		}
	}
	else if(m.length == 3 && !isNaN(m[0]) && !isNaN(m[1]) && !isNaN(m[2])) {
		var paletteList = ["square","rect","triadic","split","tone",
			"shade","tint","comp","analog","triadic"];
		var randI = bot.random(paletteList.length);
		m.unshift(paletteList[randI]);
		console.log("m: "+ m);
		getColorPalettes(m, cI);
	}
	else if(m[0] == undefined) {
		m = ["random","random"];
		pickRandomPallete(m, cI);
	}
}

function toHSV(color) {
	if (checkRGB(color)) {
		var rPrime = color[0] / 255;
		var gPrime = color[1] / 255;
		var bPrime = color[2] / 255;
		var cMax = Math.max(rPrime, gPrime, bPrime);
		var cMin = Math.min(rPrime, gPrime, bPrime);
		var delta = cMax - cMin;
		var hue = 0;
		var sat = 0;
		var value = cMax;
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
		return [hue,sat,value];
	}
}

function toRGB(color) {
	console.log("toRGB("+ color +")");
	if (checkHSV(color)) {
		var hue = color[0];
		var sat = color[1];
		var val = color[2];
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
		} else if (hue >= 240 && hue < 300) {
			rgbPrime = [x, 0, cPrime];
		} else if (hue >= 300 && hue < 360) {
			rgbPrime = [cPrime, 0, x];
		}
		rgb[0] = Math.round((rgbPrime[0] + m) * 255);
		rgb[1] = Math.round((rgbPrime[1] + m) * 255);
		rgb[2] = Math.round((rgbPrime[2] + m) * 255);
		return rgb;
	}
}

function getTriadic(msg, cID) {
	console.log("In triadic msg: "+ msg);
	var msgText = "```\nTriad\n";
	var color1 = [0,0,0];
	color1[0] = Number(msg[0]);
	color1[1] = Number(msg[1]);
	color1[2] = Number(msg[2]);
	var color2 = [color1[1],color1[2],color1[0]];
	var color3 = [color1[2],color1[0],color1[1]];

	console.log("color1: "+ color1);
	console.log("color2: "+ color2);
	console.log("color3: "+ color3);
	// draw image
	var size = 256;
	var imgPath = "./triadicColor.png";
	var imgColor1 = {
		red: color1[0],
		green: color1[1],
		blue: color1[2],
		alpha: 255
	}
	var imgColor2 = {
		red: color2[0],
		green: color2[1],
		blue: color2[2],
		alpha: 255
	}
	var imgColor3 = {
		red: color3[0],
		green: color3[1],
		blue: color3[2],
		alpha: 255
	}
	var img = bot.PNGImage.createImage(size, size);

	img.fillRect(0, 0, 256, 128, imgColor1);
	img.fillRect(0, 128, 128, 128, imgColor2);
	img.fillRect(128, 128, 128, 128, imgColor3);

	img.writeImage(imgPath, function(err) {
		if (err) {
			throw err;
		}
		console.log('Written to the file');
		console.log(imgPath);
		bot.uploadFile({
			to: cID,
			file: imgPath
		}, function(error) {
			if (error) {
				console.log(error);
			}
		});
	});
	msgText += ("Color 1: " + color1[0] + " " + color1[1] + " " + color1[2] + "\n");
	msgText += ("Color 2: " + color2[0] + " " + color2[1] + " " + color2[2] + "\n");
	msgText += ("Color 3: " + color3[0] + " " + color3[1] + " " + color3[2] + "```\n");
	bot.sendMessages(cID, [msgText]);
}

function getAnalogous(msg, cID) {
	console.log("In analogous msg: "+ msg);
	var msgText = "```\nAnalogous\n";
	var color1 = [0,0,0];
	var color2, color3, color4, color5;
	var hsvInterval = 15;
	color1[0] = Number(msg[0]);
	color1[1] = Number(msg[1]);
	color1[2] = Number(msg[2]);
	var hsvCol1 = [0,0,0];
	var hsvCol2 = [0,0,0];
	var hsvCol3 = [0,0,0];
	var hsvCol4 = [0,0,0];
	var hsvCol5 = [0,0,0];

	hsvCol1 = toHSV(color1);
	hsvCol2	= toHSV(color1);
	hsvCol3 = toHSV(color1);
	hsvCol4 = toHSV(color1);
	hsvCol5 = toHSV(color1);
	hsvCol2[0] = (hsvCol1[0] + hsvInterval);
	hsvCol3[0] = (hsvCol2[0] + hsvInterval);
	hsvCol4[0] = (hsvCol1[0] - hsvInterval);
	hsvCol5[0] = (hsvCol4[0] - hsvInterval);

	if(hsvCol2[0] < 0){
		hsvCol2[0] += 360;
	} else if(hsvCol2[0] >=360) {
		hsvCol2[0] -=360;
	}
	if(hsvCol3[0] < 0){
		hsvCol3[0] += 360;
	} else if(hsvCol3[0] >=360) {
		hsvCol3[0] -= 360;
	}
	if(hsvCol4[0] < 0){
		hsvCol4[0] += 360;
	} else if(hsvCol4[0] >=360) {
		hsvCol4[0] -= 360;
	}
	if(hsvCol5[0] < 0){
		hsvCol5[0] += 360;
	} else if(hsvCol5[0] >=360) {
		hsvCol5[0] -= 360;
	}

	color2 = toRGB(hsvCol2);
	color3 = toRGB(hsvCol3);
	color4 = toRGB(hsvCol4);
	color5 = toRGB(hsvCol5);

	msgText += ("Color 1: " + color3[0] + " " + color3[1] + " " + color3[2] + "\n");
	msgText += ("Color 2: " + color2[0] + " " + color2[1] + " " + color2[2] + "\n");
	msgText += ("Color 3: " + color1[0] + " " + color1[1] + " " + color1[2] + "\n");
	msgText += ("Color 4: " + color4[0] + " " + color4[1] + " " + color4[2] + "\n");
	msgText += ("Color 5: " + color5[0] + " " + color5[1] + " " + color5[2] + "\n```");

	// draw image
	var size = 250;
	var imgPath = "./analogColor.png";
	var imgColor1 = {
		red: color1[0],
		green: color1[1],
		blue: color1[2],
		alpha: 255
	}
	var imgColor2 = {
		red: color2[0],
		green: color2[1],
		blue: color2[2],
		alpha: 255
	}
	var imgColor3 = {
		red: color3[0],
		green: color3[1],
		blue: color3[2],
		alpha: 255
	}
	var imgColor4 = {
		red: color4[0],
		green: color4[1],
		blue: color4[2],
		alpha: 255
	}
	var imgColor5 = {
		red: color5[0],
		green: color5[1],
		blue: color5[2],
		alpha: 255
	}
	var img = bot.PNGImage.createImage(size, size);
	img.fillRect(0, 0, size/5, size, imgColor3);
	img.fillRect(50, 0, size/5, size, imgColor2)
	img.fillRect(100, 0, size/5, size, imgColor1);
	img.fillRect(150, 0, size/5, size, imgColor4);
	img.fillRect(200, 0, size/5, size, imgColor5);

	img.writeImage(imgPath, function(err) {
		if (err) {
			throw err;
		}
		console.log('Written to the file');
		console.log(imgPath);
		bot.uploadFile({
			to: cID,
			file: imgPath
		}, function(error) {
			if (error) {
				console.log(error);
			}
		});
	});
	bot.sendMessages(cID, [msgText]);
}

function getSqTetra(msg, cID) {
	console.log("In Square tetradic msg: "+ msg);
	var msgText = "```\nSquare Tetradic\n";
	var color1 = [0,0,0];
	var color2, color3, color4;
	var hsvInterval = 90;
	color1[0] = Number(msg[0]);
	color1[1] = Number(msg[1]);
	color1[2] = Number(msg[2]);
	var hsvCol1 = [0,0,0];
	var hsvCol2 = [0,0,0];
	var hsvCol3 = [0,0,0];
	var hsvCol4 = [0,0,0];

	hsvCol1 = toHSV(color1);
	hsvCol2	= toHSV(color1);
	hsvCol3 = toHSV(color1);
	hsvCol4 = toHSV(color1);
	hsvCol2[0] = (hsvCol1[0] + hsvInterval);
	hsvCol3[0] = (hsvCol2[0] + hsvInterval);
	hsvCol4[0] = (hsvCol3[0] + hsvInterval);

	if(hsvCol2[0] < 0){
		hsvCol2[0] += 360;
	} else if(hsvCol2[0] >=360) {
		hsvCol2[0] -=360;
	}
	if(hsvCol3[0] < 0){
		hsvCol3[0] += 360;
	} else if(hsvCol3[0] >=360) {
		hsvCol3[0] -= 360;
	}
	if(hsvCol4[0] < 0){
		hsvCol4[0] += 360;
	} else if(hsvCol4[0] >=360) {
		hsvCol4[0] -= 360;
	}

	color2 = toRGB(hsvCol2);
	color3 = toRGB(hsvCol3);
	color4 = toRGB(hsvCol4);

	msgText += ("Color 1 (top left): " + color2[0] + " " + color2[1] + " " + color2[2] + "\n");
	msgText += ("Color 2 (top right): " + color1[0] + " " + color1[1] + " " + color1[2] + "\n");
	msgText += ("Color 3 (bottom left): " + color3[0] + " " + color3[1] + " " + color3[2] + "\n");
	msgText += ("Color 4 (bottom right): " + color4[0] + " " + color4[1] + " " + color4[2] + "\n```");

	// draw image
	var size = 250;
	var imgPath = "./squareTetradic.png";
	var imgColor1 = {
		red: color1[0],
		green: color1[1],
		blue: color1[2],
		alpha: 255
	}
	var imgColor2 = {
		red: color2[0],
		green: color2[1],
		blue: color2[2],
		alpha: 255
	}
	var imgColor3 = {
		red: color3[0],
		green: color3[1],
		blue: color3[2],
		alpha: 255
	}
	var imgColor4 = {
		red: color4[0],
		green: color4[1],
		blue: color4[2],
		alpha: 255
	}
	var img = bot.PNGImage.createImage(size, size);
	img.fillRect(125, 0, size/2, size/2, imgColor1);
	img.fillRect(0, 0, size/2, size/2, imgColor2)
	img.fillRect(0, 125, size/2, size/2, imgColor3);
	img.fillRect(125, 125, size/2, size/2, imgColor4);

	img.writeImage(imgPath, function(err) {
		if (err) {
			throw err;
		}
		console.log('Written to the file');
		console.log(imgPath);
		bot.uploadFile({
			to: cID,
			file: imgPath
		}, function(error) {
			if (error) {
				console.log(error);
			}
		});
	});
	bot.sendMessages(cID, [msgText]);
}

function getRectTetra(msg, cID) {
	console.log("In rectangle tetradic msg: "+ msg);
	var msgText = "```\nRectangle Tetradic\n";
	var color1 = [0,0,0];
	var color2, color3, color4;
	var hsvInterval1 = 30;
	var hsvInterval2 = 150
	color1[0] = Number(msg[0]);
	color1[1] = Number(msg[1]);
	color1[2] = Number(msg[2]);
	var hsvCol1 = [0,0,0];
	var hsvCol2 = [0,0,0];
	var hsvCol3 = [0,0,0];
	var hsvCol4 = [0,0,0];

	hsvCol1 = toHSV(color1);
	hsvCol2	= toHSV(color1);
	hsvCol3 = toHSV(color1);
	hsvCol4 = toHSV(color1);
	hsvCol2[0] = (hsvCol1[0] + hsvInterval1);
	hsvCol3[0] = (hsvCol2[0] + hsvInterval2);
	hsvCol4[0] = (hsvCol3[0] + hsvInterval1);

	if(hsvCol2[0] < 0){
		hsvCol2[0] += 360;
	} else if(hsvCol2[0] >=360) {
		hsvCol2[0] -=360;
	}
	if(hsvCol3[0] < 0){
		hsvCol3[0] += 360;
	} else if(hsvCol3[0] >=360) {
		hsvCol3[0] -= 360;
	}
	if(hsvCol4[0] < 0){
		hsvCol4[0] += 360;
	} else if(hsvCol4[0] >=360) {
		hsvCol4[0] -= 360;
	}

	color2 = toRGB(hsvCol2);
	color3 = toRGB(hsvCol3);
	color4 = toRGB(hsvCol4);

	msgText += ("Color 1 (top left): " + color2[0] + " " + color2[1] + " " + color2[2] + "\n");
	msgText += ("Color 2 (top right): " + color1[0] + " " + color1[1] + " " + color1[2] + "\n");
	msgText += ("Color 3 (bottom left): " + color3[0] + " " + color3[1] + " " + color3[2] + "\n");
	msgText += ("Color 4 (bottom right): " + color4[0] + " " + color4[1] + " " + color4[2] + "\n```");

	// draw image
	var size = 250;
	var imgPath = "./rectTetradic.png";
	var imgColor1 = {
		red: color1[0],
		green: color1[1],
		blue: color1[2],
		alpha: 255
	}
	var imgColor2 = {
		red: color2[0],
		green: color2[1],
		blue: color2[2],
		alpha: 255
	}
	var imgColor3 = {
		red: color3[0],
		green: color3[1],
		blue: color3[2],
		alpha: 255
	}
	var imgColor4 = {
		red: color4[0],
		green: color4[1],
		blue: color4[2],
		alpha: 255
	}
	var img = bot.PNGImage.createImage(size, size);
	img.fillRect(125, 0, size/2, size/2, imgColor1);
	img.fillRect(0, 0, size/2, size/2, imgColor2)
	img.fillRect(0, 125, size/2, size/2, imgColor3);
	img.fillRect(125, 125, size/2, size/2, imgColor4);

	img.writeImage(imgPath, function(err) {
		if (err) {
			throw err;
		}
		console.log('Written to the file');
		console.log(imgPath);
		bot.uploadFile({
			to: cID,
			file: imgPath
		}, function(error) {
			if (error) {
				console.log(error);
			}
		});
	});
	bot.sendMessages(cID, [msgText]);
}

// this is a gradient ending at white. use 6 midpoints
function getTints(msg, cID) {
	var mesg = [msg[0],msg[1],msg[2],255,255,255];
	gradientColors(mesg,cID);
}

// this is a gradient ending at gray. use 6 midpoints and maybe pick the percentage of gray?
function getTones(msg, cID) {
 var percent = 0;
 if(msg[3] != null) {
	 percent = msg[3];
	 if(percent > 0.90) {
		 percent = 0.9;
	 } else if(percent < 0.10) {
		 percent = 0.1;
	 }
 } else {
	 percent = 0.5;
 }
 var color = 255*percent;
 var mesg = [msg[0],msg[1],msg[2],color,color,color];
 gradientColors(mesg,cID);
}

// this is a gradient ending at black. use 6 midpoints
function getShades(msg, cID) {
	var mesg = [msg[0],msg[1],msg[2],0,0,0];
	gradientColors(mesg,cID);
}

function getSplitComp(msg, cID) {
	console.log("In Split complementary msg: "+ msg);
	var msgText = "```\nSplit complementary\n";
	var color1 = [0,0,0];
	var color2, color3;
	var hsvInterval1 = 30;
	color1[0] = Number(msg[0]);
	color1[1] = Number(msg[1]);
	color1[2] = Number(msg[2]);
	var hsvCol1 = [0,0,0];
	var hsvCol2 = [0,0,0];
	var hsvCol3 = [0,0,0];

	hsvCol1 = toHSV(color1);
	hsvCol2	= toHSV(color1);
	hsvCol3 = toHSV(color1);
	hsvCol2[0] = (hsvCol1[0] - hsvInterval1 + 180);
	hsvCol3[0] = (hsvCol1[0] + hsvInterval1 + 180);

	if(hsvCol2[0] < 0){
		hsvCol2[0] += 360;
	} else if(hsvCol2[0] >=360) {
		hsvCol2[0] -=360;
	}
	if(hsvCol3[0] < 0){
		hsvCol3[0] += 360;
	} else if(hsvCol3[0] >=360) {
		hsvCol3[0] -= 360;
	}

	color2 = toRGB(hsvCol2);
	color3 = toRGB(hsvCol3);

	msgText += ("Color 1: " + color2[0] + " " + color2[1] + " " + color2[2] + "\n");
	msgText += ("Color 2: " + color1[0] + " " + color1[1] + " " + color1[2] + "\n");
	msgText += ("Color 3: " + color3[0] + " " + color3[1] + " " + color3[2] + "\n```");

	// draw image
	var size = 240;
	var imgPath = "./splitComp.png";
	var imgColor1 = {
		red: color1[0],
		green: color1[1],
		blue: color1[2],
		alpha: 255
	}
	var imgColor2 = {
		red: color2[0],
		green: color2[1],
		blue: color2[2],
		alpha: 255
	}
	var imgColor3 = {
		red: color3[0],
		green: color3[1],
		blue: color3[2],
		alpha: 255
	}
	var img = bot.PNGImage.createImage(size, size);
	img.fillRect(0, 0, size/3, size, imgColor2);
	img.fillRect(80, 0, size/3, size, imgColor1)
	img.fillRect(160, 0, size/3, size, imgColor3);

	img.writeImage(imgPath, function(err) {
		if (err) {
			throw err;
		}
		console.log('Written to the file');
		console.log(imgPath);
		bot.uploadFile({
			to: cID,
			file: imgPath
		}, function(error) {
			if (error) {
				console.log(error);
			}
		});
	});
	bot.sendMessages(cID, [msgText]);
}

// This is easy as each value should total 255. So subtract from 255.
function getComplementary(msg, cID) {
	console.log("In Complementary msg: "+ msg);
	var msgText = "```\nComplementary\n";
	var color1 = [0,0,0];
	var color2;
	color1[0] = Number(msg[0]);
	color1[1] = Number(msg[1]);
	color1[2] = Number(msg[2]);
	var hsvCol1 = [0,0,0];
	var hsvCol2 = [0,0,0];

	hsvCol1 = toHSV(color1);
	hsvCol2	= toHSV(color1);
	hsvCol2[0] = (hsvCol1[0] + 180);

	if(hsvCol2[0] < 0){
		hsvCol2[0] += 360;
	} else if(hsvCol2[0] >=360) {
		hsvCol2[0] -=360;
	}

	color2 = toRGB(hsvCol2);

	msgText += ("Color 1: " + color1[0] + " " + color1[1] + " " + color1[2] + "\n");
	msgText += ("Color 2: " + color2[0] + " " + color2[1] + " " + color2[2] + "\n```");

	// draw image
	var size = 256;
	var imgPath = "./comp.png";
	var imgColor1 = {
		red: color1[0],
		green: color1[1],
		blue: color1[2],
		alpha: 255
	}
	var imgColor2 = {
		red: color2[0],
		green: color2[1],
		blue: color2[2],
		alpha: 255
	}
	var img = bot.PNGImage.createImage(size, size);
	img.fillRect(0, 0, size, size/2, imgColor1);
	img.fillRect(0, 128, size, size/2, imgColor2);

	img.writeImage(imgPath, function(err) {
		if (err) {
			throw err;
		}
		console.log('Written to the file');
		console.log(imgPath);
		bot.uploadFile({
			to: cID,
			file: imgPath
		}, function(error) {
			if (error) {
				console.log(error);
			}
		});
	});
	bot.sendMessages(cID, [msgText]);
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
		bot.sendMessages(chID, ["`HSL: " + hue + "°, " + sat + ", " + light + "`"]);
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
		var value = cMax;
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
		bot.sendMessages(chID, ["`HSV: " + hue + "°, " + sat + ", " + value + "`"]);
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
		var hue = color[0];
		var s = color[1];
		var l = color[2];
		var rgb = [0, 0, 0];
		var rgbPrime = [0, 0, 0];
		var cPrime = (1 - Math.abs(2 * l - 1)) * s;
		var x = (cPrime * (1 - Math.abs((hue / 60) % 2 - 1)));
		var m = l - (cPrime / 2);
		if (hue >= 0 && hue < 60) {
			rgbPrime = [cPrime, x, 0];
		} else if (hue >= 60 && hue < 120) {
			rgbPrime = [x, cPrime, 0];
		} else if (hue >= 120 && hue < 180) {
			rgbPrime = [0, cPrime, x];
		} else if (hue >= 180 && hue < 240) {
			rgbPrime = [0, x, cPrime];
		} else if (hue >= 240 && hue < 300) {
			rgbPrime = [x, 0, cPrime];
		} else if (hue >= 300 && hue < 360) {
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
		var sat = color[1];
		var val = color[2];
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
		} else if (hue >= 240 && hue < 300) {
			rgbPrime = [x, 0, cPrime];
		} else if (hue >= 300 && hue < 360) {
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
		if (s < 0 || s > 1) {
			errorVal += 1;
		}
		if (l < 0 || l > 1) {
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
		if (s < 0 || s > 1) {
			errorVal += 1;
		}
		if (v < 0 || v > 1) {
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
