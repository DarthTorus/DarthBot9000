var bot = process.DiscordBot;
const radConst = bot.TAU/360;
const degConst = 360/bot.TAU
	// Function selector if "calc" command is present
function calcCheck(m, cI) {
	switch (m[0]) {
		case 'fact':
			factorialCheck(m[1], cI);
			break;
		case 'primefact': //TODO
			primeFactorials(m[1], cI);
			break;
		case 'grav': //TODO
			break;
		case 'toPolar':
			m.shift()
			toPolar(m,cI);
			break;
		case 'toCartesian2D':
		case 'toCart2D':
			m.shift()
			toCartesian2D(m,cI);
			break;
		case 'toCartesian3D':
		case 'toCart3D':
			m.shift();
			toCartesian3D(m,cI);
			break;
		case 'toSphere':
			m.shift();
			toSphere(m,cI);
			break;
		case 'toCyl':
		case 'toCylinder':
			m.shift();
			toCylinder(m, cI);
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

function toCartesian3D(msg,cID) {
	if(msg[0] == 'sph') {
		var rho = msg[1];
		var theta = msg[2];
		var phi = msg[3];
		var x, y, z, radius = 0;
		var msgText = "";
		var radius = rho*Math.sin(degToRad(phi));

		x = radius * Math.cos(degToRad(theta));
		console.log("x:" + x);
		y = radius * Math.sin(degToRad(theta));
		console.log("y:" + y);
		z = rho * Math.cos(degToRad(phi));
		console.log("z:" + z);

		msgText = "`Radius: " + rho + "`\n" ;
		msgText += "`Theta: " + theta + "°`\n";
		msgText += "`Phi: " + phi + "°`\n";
		msgText += "\n`X: " + x + "`\n";
		msgText += "`Y: " + y + "`\n";
		msgText += "`Z: " + z + "`\n";
	}
	else if(msg[0] == 'cyl') {
		var r = msg[1];
		var x,y = 0;
		var theta = msg[2];
		var z = msg[3];
		if(theta >= 360) {
			theta = 360;
		} else if(theta <= 0) {
			theta = 0;
		}
		theta = degToRad(theta);

		var msgText = "";
		x = r * Math.cos(theta);
		y = r * Math.sin(theta);
		msgText = "`Radius: " + r + "`\n" ;
		msgText += "`Angle: " + radToDeg(theta) + "°`\n";
		msgText += "`Z: " + z + "`\n";
		msgText += "\n`X: " + x + "`\n";
		msgText += "`Y: " + y + "`\n";
		msgText += "`Z: " + z + "`\n";


	}
	bot.sendMessages(cID, [msgText]);
}

function toSphere(msg,cID) {
	if(msg[0] == 'cart'){
		var x = msg[1];
		var y  = msg[2];
		var z = msg[3];

		var rho, theta, phi = 0;
		var msgText = "";

		rho = Math.sqrt(x*x+y*y+z*z);
		console.log("rho: " + rho);
		phi = Math.acos(z/rho);
		console.log("phi: " + phi);
		theta = Math.asin(y/(rho*Math.sin(phi)));
		console.log("theta: " + theta);

		msgText = "`X: " + x + "`\n" ;
		msgText += "`Y: " + y + "`\n";
		msgText += "`Z: " + z + "`\n";
		msgText += "\n`Rho: " + rho + "`\n";
		msgText += "`Theta: " + radToDeg(theta) + "°`\n";
		msgText += "`Phi: " + radToDeg(phi) + "°`";
	}
	else if(msg[0] == 'cyl'){
		var r = msg[1];
		var theta = msg[2];
		var z = msg[3];

		var rho, phi = 0;
		var msgText = "";

		rho = Math.sqrt(r*r+z*z);
		console.log("rho: " + rho);
		phi = radToDeg(Math.acos(z/rho));
		console.log("phi: " + phi);

		msgText = "`Radius: " + r + "`\n" ;
		msgText += "`Theta: " + theta + "°`\n";
		msgText += "`Z: " + z + "`\n";
		msgText += "\n`Rho: " + rho + "`\n";
		msgText += "`Theta: " + theta + "°`\n";
		msgText += "`Phi: " + phi + "°`";

	}
	bot.sendMessages(cID, [msgText]);
}

function toCylinder(msg,cID) {
	if(msg[0] == 'cart') {
		var x = msg[1];
		var y = msg[2];
		var z = msg[3];
		var r, theta = 0;

		var msgText = "";

		r = Math.sqrt(x*x+y*y);
		console.log("r: " + r);
		theta = radToDeg(Math.atan2(y,x));
		console.log("theta: " + theta);


		msgText = "`X: " + x  + "`\n" ;
		msgText += "`Y: " + y + "`\n";
		msgText += "`Z: " + z + "`\n";
		msgText += "\n`Radius: " + r + "`\n";
		msgText += "`Theta: " + theta + "°`\n";
		msgText += "`Z: " + z + "`";
	}
	else if(msg[0] == 'sph') {
		var rho = msg[1];
		var theta = msg[2];
		var phi = msg[3];

		var r,z = 0;
		var msgText = "";

		var r = rho * Math.sin(degToRad(phi));
		console.log("r: " + r);
		var z = rho * Math.cos(degToRad(phi));
		console.log("z: " + z);

		msgText = "`Rho: " + rho + "`\n" ;
		msgText += "`Theta: " + theta + "°`\n";
		msgText += "`Phi: " + phi + "°`\n";
		msgText += "\n`Radius: " + r + "`\n";
		msgText += "`Theta: " + theta + "°`\n";
		msgText += "`Z: " + z + "`";
	}
	bot.sendMessages(cID, [msgText]);
}

function toCartesian2D(msg,cID) {
	var r = msg[0];
	var x,y = 0;
	var theta = msg[1];
	if(theta >= 360) {
		theta = 360;
	} else if(theta <= 0) {
		theta = 0;
	}
	theta = degToRad(theta);

	var msgText = "";
	x = r * Math.cos(theta);
	y = r * Math.sin(theta);
	msgText = "`Radius: " + r + "`\n" ;
	msgText += "`Angle: " + radToDeg(theta) + "°`\n";
	msgText += "\n`X: " + x + "`\n";
	msgText += "`Y: " + y + "`";

	bot.sendMessages(cID, [msgText]);
}

function toPolar(msg, cID) {
	var x = msg[0];
	var y = msg[1];
	var r, theta = 0;
	var msgText = "";

	r = Math.sqrt(x*x+y*y);
	theta = radToDeg(Math.atan2(y,x));

	msgText = "`X: " + x + "`\n";
	msgText += "`Y: " + y + "`\n";
	msgText += "\n`Radius: " + r + "`\n" ;
	msgText += "`Angle: " + toDMS(theta) + "`";

	bot.sendMessages(cID, [msgText]);
}

//Default calc
function calcEquation(msg, cID) {
	var initEq = msg //split the expression on parentheses
	var levelI = 0;
	var elementI = 0;
	var eqArr = new Array(7)
	for (var x = 0; x < 25; x++) {
		eqArr[x] = new Array(initEq.length);
		eqArr[x].fill(' ');
	}

	for (var i = 0; i < initEq.length; i++) {
		if (initEq[i] == '(') {
			levelI += 1;
			elementI+=1;
		} else if (initEq[i] == ')') {
			levelI-=1;
			elementI+=1;
		} else {
			eqArr[levelI][elementI] += initEq[i];
		}

		console.log("levelI: " + levelI);
		console.log("elementI: " + elementI);
	}
	for (var j = 0; j < eqArr.length; j++) {
		console.log("eqArr[" +j+"]: " + eqArr[j]+"\n");
	}
// (\d*\.?\d+)\s?([\+\*\/\-\%\^])\s?(\d*\.?\d+)
}

function calculate(op1, operator, op2) {

	var f = {
		add: '+',
		sub: '-',
		div: '/',
		mlt: '*',
		mod: '%',
		exp: '^'
	};

	// Create array for Order of Operation and precedence
	f.ooo = [
		[
			[f.mlt],
			[f.div],
			[f.mod],
			[f.exp]
		],
		[
			[f.add],
			[f.sub]
		]
	];

	input = input.replace(/[^0-9%^*\/()\-+.]/g, ''); // clean up unnecessary characters

	var output;
	for (var i = 0, n = f.ooo.length; i < n; i++) {

		// Regular Expression to look for operators between floating numbers or integers
		var re = new RegExp('(\\d+\\.?\\d*)([\\' + f.ooo[i].join('\\') + '])(\\d+\\.?\\d*)');
		re.lastIndex = 0; // be cautious and reset re start pos

		// Loop while there is still calculation for level of precedence
		while (re.test(input)) {
			//document.write('<div>' + input + '</div>');
			output = calc_internal(RegExp.$1, RegExp.$2, RegExp.$3);
			if (isNaN(output) || !isFinite(output)) return output; // exit early if not a number
			input = input.replace(re, output);
		}
	}

	return output;

	function calc_internal(a, op, b) {
		a = a * 1;
		b = b * 1;
		switch (op) {
			case f.add:
				return a + b;
				break;
			case f.sub:
				return a - b;
				break;
			case f.div:
				return a / b;
				break;
			case f.mlt:
				return a * b;
				break;
			case f.mod:
				return a % b;
				break;
			case f.exp:
				return Math.pow(a, b);
				break;
			default:
				null;
		}
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
			msg.shift();
			console.log(msg);
			calcAAS(msg, chID);
			break;
		case 'asa':
			msg.shift();
			console.log(msg);
			calcASA(msg, chID);
			break;
		case 'sss':
			msg.shift();
			console.log(msg);
			calcSSS(msg, chID);
			break;
		case 'sas':
			msg.shift();
			console.log(msg);
			calcSAS(msg, chID);
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


			msgText = "`Side C1, Side C2: " + c + "units, " + g + " units`\n";
			msgText += "`Angle 1, Angle B2: " + toDMS(e) + ", " + toDMS(h) + "`\n";
			msgText += "`Angle C1, Angle C2: " + toDMS(f) + ", " + toDMS(i) + "`\n";
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

			msgText = "`Side C: " + c + " units`\n";
			msgText += "`Angle B: " + toDMS(e) + "`\n";
			msgText += "`Angle C: " + toDMS(f) + "`\n";
			msgText += "`Area: " + r + " units²`\n";
			bot.sendMessages(cID, [msgText]);
		}
	}
}

function calcAAS(m, cID) {
	var a = Number(m[0]);
	var b = Number(m[1]);
	var d = degToRad(Number(m[2]));
	var z = Math.pow(b, 2) - Math.pow(a, 2);
	var y = -2 * b * Math.cos(d);
	var x = 1;
	var w = (Math.pow(y, 2) - (4 * x * z));
	var c, e, f, g, h, i, q, r, s, t, v, u = 0;

}

function calcASA(m, cID) {}

function calcSSS(m, cID) {
	var a = Number(m[0]);
	var b = Number(m[1]);
	var c = Number(m[2]);
	var sumAB = a + b;
	var sumBC = b + c;
	var sumAC = a + c;
	var d, e, f, g, h, r, s, w, x, y = 0;
	var msgText = "";

	if (sumAB <= c || sumAC <= b || sumBC <= a) {
		bot.sendMessages(cID, ["Cannot make a triangle."]);
	} else {
		g = ((b * b + c * c) - (a * a));
		h = 2 * b * c;
		x = g / h;
		d = Math.acos(x);
		y = (b * Math.sin(d) / a);
		d = radToDeg(d);
		e = radToDeg(Math.asin(y));
		f = 180 - (d + e);
		s = (a + b + c) / 2;
		w = s * (s - a) * (s - b) * (s - c);
		r = Math.sqrt(w);

		msgText = "`Angle A: " + toDMS(d) + "`\n";
		msgText += "`Angle B: " + toDMS(e) + "`\n";
		msgText += "`Angle C: " + toDMS(f) + "`\n";
		msgText += "`Area: " + r + " units²`\n";
		bot.sendMessages(cID, [msgText]);
	}

}

function calcSAS(m, cID) {
	var a = Number(m[0]);
	var f = degToRad(m[1]);
	var b = Number(m[2]);

	var c, d, e, m, n, r, v, x, y, z = 0;
	var msgText = "";

	x = a * a + b * b;
	y = 2 * a * b * Math.cos(f);
	v = x - y;

	c = Math.sqrt(v);
	z = (b * Math.sin(f)) / c;
	e = Math.asin(z);
	d = 180 - radToDeg(e + f);
	e = radToDeg(e);
	m = a * Math.sin(f);
	n = b / 2;
	r = m * n;

	msgText = "`Angle A: " + toDMS(d) + "`\n";
	msgText += "`Angle B: " + toDMS(e) + "`\n";
	msgText += "`Side C: " + c + " units`\n";
	msgText += "`Area: " + r + " units²`\n";

	bot.sendMessages(cID, [msgText]);
}

function toDMS(angle) {
	angle %= 360;
	if (angle >= 0 || angle < 360) {
		var deg = Math.floor(angle);
		var min = (angle - deg) * 60;
		var sec = (min - Math.floor(min)) * 60;
		sec = Math.floor(sec * 1000) / 1000;
		min = Math.floor(min);
		console.log(deg + "°" + min + "\'" + sec + "\"");
		return (deg + "°" + min + "\'" + sec + "\"");
	}
}

var calcFunctions = {
	calcCheck: calcCheck
};
module.exports = calcFunctions;
