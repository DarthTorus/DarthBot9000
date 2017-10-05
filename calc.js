var bot = process.DiscordBot;
const radConst = bot.TAU/360;
const degConst = 360/bot.TAU

var latexArr = [
	{char : '\\%', code : "%25"},
	{char : ' ', code : "%20"},
	{char : '\\+', code : "%2B"},
	{char : '\\[', code : "%5B"},
	{char : '\\\\', code : "%5C"},
	{char : '\\]', code : "%5D"},
	{char : '\\^', code : "%5E"},
	{char : '\\{', code : "%7B"},
	{char : '\\}', code : "%7D"},
	{char : '\\=', code : "%3D"},
	{char : '\\*', code : "%2A"},
	{char : '\\<', code : "%3C"},
	{char : '\\>', code : "%3E"},
	{char : '\\&', code : "%26"},
	{char : '\\|', code : "%7C"},
	{char : '\\#', code : "%23"},
	{char : '\\$', code : "%24"},
	{char : '\\@', code : "%40"},
	{char : '\\/', code : "%2F"}
];

	// Function selector if "calc" command is present
function calcCheck(m, cI) {
	switch (m[0]) {
		case 'fact':
		case 'factorial':
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
	var initEq = msg.toString();
	var tempEq = initEq;
	tempEq = replaceSpecialSymbols(tempEq);
	tempEq = expandOperations(tempEq);
	var eqArr = tempEq.split(' ');
	eqArr = removeNullsAndCommas(eqArr);
	eqArr = resolveNegation(eqArr);
	var rpnStack = getRPNStack(eqArr);
	var result = runRPNStack(rpnStack);

	bot.sendMessages(cID,["Answer is `"+result+"`"]);
}

function resolveNegation(array) {
	var newArr = []; // New array variable for storing the fixed array
	var next; // The next token to look at.
	var current; // The current token we're looking at
	var last; // The last token we looked at
	while(array.length > 0) { // We will walk through this array front to back, removing elements from the front
		last = newArr.length -1; // Get the last token we pushed onto newArr
		current = array[0]; // Set current to first element of the array
		next = array[1]; // Set next to be after current as we need a lookahead
		if(current == "-" && !isNaN(next) && isNaN(newArr[last])) {
			// If current token is a negative, and the next is a number and the last
			// token we pushed onto newArr is an operator
			array.shift(); // removes the negative from the front of the array
			newArr.push(-1*array.shift()); // Multiplies the number following old negative by -1 to truly negate
		} else {
			newArr.push(array.shift()); // Pushes any operators and positives to newArr
		}
	}

	console.log("Negated array: " + newArr);
	return newArr;
}

function removeNullsAndCommas(array) {
	var newArray = [];
	for(var i = 0; i < array.length; i++) {
		if(array[i] != '' && array[i] != ',') {
			newArray.push(array[i]);
		}
	}
	return newArray;
}

function expandOperations(eqArray) {
	var operatorArr = ["^","sqrt","sin","cos","tan","asin","acos",
		"atan","log","ln","*","/","+","-","abs","floor","round","ceil",
		"min","max","(",")","[","]","{","}",","];
	for(var o = 0; o < operatorArr.length; o++) {
		var repString = " " + operatorArr[o] + " ";
		var op = "\\"+operatorArr[o];
		var reg = new RegExp(op,"g");
		eqArray = eqArray.replace(reg,repString);
	}
	return eqArray;
}

function replaceSpecialSymbols(eqArray) {
	var specialVarSymbol = ["pi","e","Phi","phi","tau","\\\π","\\\τ","\\\Φ",
		"\\\φ","\\\[","\\\]","\\\{","\\\}","\\\×","\\\÷","\\\−","\\\,"];
	var specialVarValue = [bot.PI, Math.E, bot.POS_PHI, bot.REC_POS_PHI,
		2*Math.PI, bot.PI, 2*Math.PI, bot.POS_PHI, bot.REC_POS_PHI,
		"(",")","(",")","*","/","-",") ("];
	for(var s = 0; s < specialVarSymbol.length; s++) {
		var v = specialVarSymbol[s];
		var reg = new RegExp(v,"g");
		eqArray = eqArray.replace(reg, specialVarValue[s]);
	}
	return eqArray;
}

function getRPNStack(array) {
	var operatorArr = {"sin":4,"cos":4,"tan":4,"asin":4,"acos":4,
		"atan":4,"log":4,"ln":4,"abs":4,"floor":4,"round":4,"ceil":4,
		"min":4,"max":4,"sqrt":4,"^":3,"*":2,"/":2,"+":1,"-":1};
	//var rightAssoc = ["^"];
	var leftAssoc = ["sin","cos","tan","asin","acos",
			"atan","log","ln","abs","floor","round","ceil",
			"min","max","sqrt","*","/","+","-"]
	var operatorStack = [];
	var outputQueue = [];

	var index = 0;

	while(index != array.length) {
		if(!isNaN(array[index])) {
			outputQueue.push(array[index]);
		}
		else if(operatorArr.hasOwnProperty(array[index])) {
			var tempOp = array[index];
			while (operatorArr[operatorStack[0]] >= operatorArr[tempOp]) {
				outputQueue.push(operatorStack.shift());
			}
			operatorStack.unshift(array[index]);
		}
		else if(array[index] == "(") {
			operatorStack.unshift(array[index]);
		}
		else if(array[index] == ")") {
			while(operatorStack[0] != "(") {
				outputQueue.push(operatorStack.shift());
			}
			operatorStack.shift();
		}
		index += 1;

	}
	while(operatorStack.length > 0) {
		outputQueue.push(operatorStack.shift());
	}
	return outputQueue;
}

function runRPNStack(rpn) {
	var s = [];
	for(var i in rpn) {
		var t = rpn[i], n=+t;
		if(n==t) {
			s.push(n);
		} else {
			var op1 = 0, op2 = 0;
			switch (t) {
				case "sin":
					op1 = s.pop();
					s.push(Math.sin(op1));
					break;
				case "cos":
					op1 = s.pop();
					s.push(Math.cos(op1));
					break;
				case "tan":
					op1 = s.pop();
					s.push(Math.tan(op1));
					break;
				case "asin":
					op1 = s.pop();
					s.push(Math.asin(op1));
					break;
				case "acos":
					op1 = s.pop();
					s.push(Math.acos(op1));
					break;
				case "atan":
					op1 = s.pop();
					s.push(Math.atan(op1));
					break;
				case "log":
					op1 = s.pop();
					s.push(Math.log(op1)/Math.log(10));
					break;
				case "ln":
					op1 = s.pop();
					s.push(Math.log(op1));
					break;
				case "abs":
					op1 = s.pop();
					s.push(Math.abs(op1));
					break;
				case "floor":
					op1 = s.pop();
					s.push(Math.floor(op1));
					break;
				case "round":
					op1 = s.pop();
					s.push(Math.round(op1));
					break;
				case "ceil":
					op1 = s.pop();
					s.push(Math.ceil(op1));
					break;
				case "min":
					op2 = s.pop();
					op1 = s.pop();
					s.push(Math.min(op2, op1));
					break;
				case "max":
					op2 = s.pop();
					op1 = s.pop();
					s.push(Math.max(op2, op1));
					break;
				case "sqrt":
					op1 = s.pop();
					s.push(Math.sqrt(op1));
					break;
				case "^":
					op2 = s.pop();
					op1 = s.pop();
					s.push(Math.pow(op1,op2));
					break;
				case "*":
					op2 = s.pop();
					op1 = s.pop();
					s.push(op1*op2);
					break;
				case "/":
					op2 = s.pop();
					op1 = s.pop();
					if(op2 == 0) {
						s.push(Infinity);
					} else {
						s.push(op1/op2);
					}
					break;
				case "+":
					op2 = s.pop();
					op1 = s.pop();
					s.push(op1+op2);
					break;
				case "-":
					op2 = s.pop();
					op1 = s.pop();
					s.push(op1-op2);
					break;
				default: //do nothing
			}
		}
	}
	return s;
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
	var resultString = "http://chart.apis.google.com/chart?cht=tx&chl=x= ";
	var resultHeight = "&chf=bg,s,36393E&chco=ffffff&chs=60";

	var a = m[0] || 1;
	var b = m[1] || 0;
	var c = m[2] || 0;
	var initialEq = "http://chart.apis.google.com/chart?cht=tx&chl=";
	if (a == 1) {
		initialEq += "x^{2}";
	} else if (a == -1) {
		initialEq += "-x^{2}";
	} else {
		initialEq += (a + "x^{2}");
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
	initialEq += " = 0&chf=bg,s,36393E&chco=ffffff&chs=30";
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
			resultString += "\\pm ";
			resultString += Math.abs(sol1);
			resultString += resultHeight;
		} else {
			if (Math.sqrt(deter) % 1 == 0) {
				resultString += (sol1 + "  or " + sol2);
				resultString += resultHeight;
			} else {
				b *= -1;
				resultString += "\\frac{" + b + "\\pm\\sqrt{" + deter + "}}{" + 2 * a + "}";
				resultString += resultHeight;
			}
		}
	} else {
		deter = Math.abs(deter);
		b *= -1;
		resultString += "\\frac{" + b + "\\pm i\\sqrt{" + deter + "}}{" + 2 * a + "}";
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
//



function getLaTeX(msg, chID) {
	var search = "http://chart.apis.google.com/chart";

	msg = msg.join('%20');
	console.log(bot.colors.cyan(msg));
	msg = msg.replace(/\+/g, "%2B");
	msg = msg.replace(/\&/g, "%26");
	search += "?cht=tx&chl=";
	search += msg;
	search += "&chf=bg,s,36393E&chco=FFFFFF&chs=60";
	console.log(bot.colors.magenta(search));
	bot.request(search, {encoding: null}, function(err, res, body){
		bot.uploadFile({
			to: chID,
			file: body,
			filename: "texEq.png"
		});
	});
}

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
	calcCheck: calcCheck,
	getLaTeX: getLaTeX
};
module.exports = calcFunctions;
