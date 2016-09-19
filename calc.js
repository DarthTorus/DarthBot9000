var bot = process.DiscordBot;
const radConst = Math.PI / 180;
const degConst = 180 / Math.PI
	// Function selector if "calc" command is present
function calcCheck(m, cI) {
	switch (m[0]) {
		case 'fact':
			factorialCheck(m[1], cI);
			break;
		case 'grav':
			break;
		case 'portal':
			m.shift();
			portalCheck(m, cI);
			break;
		case 'tri':
			m.shift();
			triCheck(m, cI);
			break;
		case 'quad':
			m.shift();
			calcQuadratic(m, cI);
			break;
		default:
			m = m.join('');
			calcEquation(m, cI);
			break;
	}
}
//Default calc
function calcEquation(msg, cID) {
	try {
		if (isNaN(eval(msg))) {
			bot.sendMessages(cID, ["Couldn't evaluate the expression"]);
		} else {
			var result = eval(msg);
			bot.sendMessages(cID, ["Answer is: `" + result + "`"]);
		}
	} catch (e) {
		//Just don't do anything. Fail silently.
	}
}
// Checks inputs for factorial
function factorialCheck(input, cI) {
	const MAX_INPUT = 100;
	if (isNaN(input)) {
		bot.sendMessages(cI, ["Must be a number. No other characters!"]);
	} else {
		if (((input * 10) % 10) != 0) {
			bot.sendMessages(cI, ["Cannot use decimals!"]);
		} else if (input == 0) {
			bot.sendMessages(cI, ["Cannot be zero!"]);
		} else if (input < 0) {
			bot.sendMessages(cI, ["Cannot be negative"]);
		} else {
			if (input > MAX_INPUT) {
				input = MAX_INPUT;
				bot.sendMessages(cI, ["Max set to " + MAX_INPUT]);
			}
			var result = factorial(input);
			bot.sendMessages(cI, ["Factorial of " + input + ": `" + result + "`"]);
		}
	}
}
// Recursive factorial
function factorial(input) {
	if (input == 1) {
		return 1;
	} else {
		return input * factorial(input - 1);
	}
}

function portalCheck(msg, cID) {
	switch (msg[0]) {
		case 'nether':
			msg.shift();
			calcNetherPortal(msg, cID);
			break;
		case 'end':
			msg.shift();
			calcEndPortal(msg, cID);
			break;
		default:
			break;
	}
}

function calcNetherPortal(m, chID) {
	var x = m[0] || 0;
	var z = m[1] || 0;
	if (isNaN(x) == false && isNaN(z) == false) {
		var xr = Math.floor(x / 8);
		var zr = Math.floor(z / 8);
		bot.sendMessages(chID, ["`X: " + xr + ", Z: " + zr + "`"]);
	}
}

function calcEndPortal(m, chID) {
	var pt1 = [m[0], m[1]];
	var pt2 = [m[3], m[4]];
	var dist1 = calcDistance(pt1, pt2);
	var pt3 = [0, 0];
	var f1 = degToRad(calcRefAngle(m[2]));
	var f2 = degToRad(calcRefAngle(m[5]));
	var f3 = ((Math.PI / 2) - (f1 + f2));
	console.log("Point 1: " + pt1);
	console.log("Point 2: " + pt2);

	console.log("Facing 3: " + f3);
	//TODO calc end portal location


}

function calcRefAngle(theta) {
	var refAngle = 0;
	if (theta > -90 && theta <= 0) {
		refAngle = 90 - Math.abs(theta);
	} else if (theta <= -90 && theta >= -180) {
		refAngle = Math.abs(theta) - 90;
	} else if (theta < 90 && theta > 0) {
		refAngle = 90 - theta;
	} else if (theta >= 90 && theta <= 180) {
		refAngle = theta - 90;
	}
	return refAngle;
}

function calcDistance(point1, point2) {
	var side1 = Math.pow(point2[0] - point1[0], 2);
	var side2 = Math.pow(point2[1] - point1[1], 2);
	var distance = Math.sqrt(side1 + side2);
	return distance;
}

function degToRad(degrees) {
	var radians = degrees * radConst;
	return radians;
}

function radToDeg(rads) {
	var deg = rads * degConst;

	return deg
}

function calcQuadratic(m, cID) {
	var resultString = "http://chart.apis.google.com/chart?cht=tx&chl=x%20%3D%20";
	var resultHeight = "&chf=bg%2Cs%2C36393E&chco=ffffff&chs=60";

	var a = m[0] || 1;
	var b = m[1] || 0;
	var c = m[2] || 0;
	var initialEq = "http://chart.apis.google.com/chart?cht=tx&chl=";
	if (a == 1) {
		initialEq += "x%5E%7B2%7D";
	} else if (a == -1) {
		initialEq += "-x%5E%7B2%7D";
	} else {
		initialEq += (a + "x%5E%7B2%7D");
	}
	if (b == 1) {
		initialEq += ("%2Bx");
	} else if (b > 1) {
		initialEq += ("%2B" + b + "x")
	} else if (b == -1) {
		initialEq += ("-x");
	} else if (b < -1) {
		initialEq += (b + "x");
	}
	if (c > 0) {
		initialEq += ("%2B" + c);
	} else if (c < 0) {
		initialEq += c;
	}
	initialEq += "%20%3D%200&chf=bg%2Cs%2C36393E&chco=ffffff&chs=30";
	bot.request(initialEq, {
		encoding: null
	}, function(err, res, body) {
		bot.uploadFile({
			to: cID,
			file: body,
			filename: "initialEq.png",
			message: "Your inital equation is: "
		});
	});
	var sol1, sol2;
	var deter = b * b - (4 * a * c);
	if (deter == 0) {
		sol1 = ((b * -1) + Math.sqrt(deter)) / (2 * a);
		resultString += sol1;
		resultString += resultHeight;
	} else if (deter > 0) {
		sol1 = ((b * -1) + Math.sqrt(deter)) / (2 * a);
		sol2 = ((b * -1) - Math.sqrt(deter)) / (2 * a);
		console.log(sol1 + ", " + sol2);
		if (Math.abs(sol1) == Math.abs(sol2)) {
			resultString += "%5Cpm%20";
			resultString += Math.abs(sol1);
			resultString += resultHeight;
		} else {
			if (Math.sqrt(deter) % 1 == 0) {
				resultString += (sol1 + "%20%20or%20" + sol2);
				resultString += resultHeight;
			} else {
				b *= -1;
				resultString += "%5Cfrac%7B" + b + "%5Cpm%5Csqrt%7B" + deter + "%7D%7D%7B" + 2 * a + "%7D";
				resultString += resultHeight;
			}
		}
	} else {
		deter = Math.abs(deter);
		b *= -1;
		resultString += "%5Cfrac%7B" + b + "%5Cpm%20i%5Csqrt%7B" + deter + "%7D%7D%7B" + 2 * a + "%7D";
		resultString += resultHeight;
	}

	bot.request(resultString, {
		encoding: null
	}, function(err, res, body) {
		bot.uploadFile({
			to: cID,
			file: body,
			filename: "Solutions.png",
			message: "Your solution(s): "
		});
	});
}
/*
%2B = +
%5C = \
%5E = ^
%7B = {
%7D = }
*/
function triCheck(msg, chID) {
	switch (msg[0]) {
		case 'ssa':
			msg.shift();
			console.log(msg);
			calcSSA(msg, chID);
			break;
		case 'aas':
			break;
		case 'asa':
			break;
		case 'sss':
			break;
		case 'sas':
			break;
	}

}

function calcSSA(m, cID) {
	var a = Number(m[0]);
	var b = Number(m[1]);
	var d = degToRad(Number(m[2]));
	var z = Math.pow(b, 2) - Math.pow(a, 2);
	var y = -2 * b * Math.cos(d);
	var x = 1;
	var w = (Math.pow(y, 2) - (4 * x * z));
	var c, e, f, g, h, i, q, r, s, t, v, u = 0;
	var msgText = "";
	if (w <= 0) {
		bot.sendMessages(cID, ["NO real solutions exist for this triangle."]);
	} else {
		v = ((-1 * y) + Math.sqrt(w)) / (2 * x);
		u = ((-1 * y) - Math.sqrt(w)) / (2 * x);
		if (v <= 0 && u <= 0) {
			bot.sendMessages(cID, ["No possible triangles."]);
		} else if (v > 0 && u > 0) {
			c = v;
			g = u;

			e = radToDeg(Math.asin((b * Math.sin(d)) / a));
			d = radToDeg(d);
			h = 180 - e;
			f = 180 - (d + e);
			i = 180 - (d + h);

			s = (a + b + c) / 2;
			t = (a + b + g) / 2;

			u = s * (s - a) * (s - b) * (s - c);
			v = s * (s - a) * (s - b) * (s - g);

			r = Math.sqrt(u);
			q = Math.sqrt(v);

			c = Math.floor(c * 1000) / 1000;
			g = Math.floor(g * 1000) / 1000;
			r = Math.floor(r * 1000) / 1000;
			q = Math.floor(q * 1000) / 1000;


			msgText = "`c1, c2: " + c + ", " + g + "`\n";
			msgText += "`B1, B2: " + toDMS(e) + ", " + toDMS(h) + "`\n";
			msgText += "`C1, C2: " + toDMS(f) + ", " + toDMS(i) + "`\n";
			msgText += "`Area 1, Area 2: " + r + " units², " + q + " units²`\n";
			bot.sendMessages(cID, [msgText]);
		} else if (v > 0 && u <= 0) {
			c = v;
			e = radToDeg(Math.asin((b * Math.sin(d)) / a));
			d = radToDeg(d);
			f = 180 - (d + e);
			r = 0.5 * b * c * Math.sin(degToRad(d));

			c = Math.floor(c * 1000) / 1000;
			r = Math.floor(r * 1000) / 1000;

			msgText = "`c: " + c + "`\n";
			msgText += "`B: " + toDMS(e) + "`\n";
			msgText += "`C: " + toDMS(f) + "`\n";
			msgText += "`Area: " + r + " units²`\n";
			bot.sendMessages(cID, [msgText]);
		}
	}
}

function toDMS(angle) {
	angle %= 360;
	if (angle >= 0 || angle < 360) {
		var deg = Math.floor(angle);
		var min = (angle - deg) * 60;
		var sec = (min - Math.floor(min)) * 60;
		sec = Math.floor(sec * 1000) / 1000;
		min = Math.floor(min);
		console.log(deg + "°" + min + "'" + sec + "\"");
		return (deg + "°" + min + "'" + sec + "\"");
	}
}

var calcFunctions = {
	calcCheck: calcCheck
};
module.exports = calcFunctions;
