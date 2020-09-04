var bot = process.DiscordBot;
const MAX_INTEGER = 2147483647;
const MIN_INTEGER = -2147483648;
const TAU = 2*Math.PI;
const PI = Math.PI;
const POS_PHI = (1+Math.sqrt(5.0))/2;
const NEG_PHI = (1-Math.sqrt(5.0))/2;
const REC_POS_PHI = POS_PHI - 1;
const REC_NEG_PHI = NEG_PHI - 1;
const radConst = TAU/360;
const degConst = 360/TAU;
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
function calcCheck(m, message) {
	switch (m[0]) {
		case 'factorial':
			factorialCheck(m[1], message);
			break;
		case 'primefact': //TODO
			primeFactorials(m[1], message);
			break;
		case 'grav': //TODO
			break;
		case 'toPolar':
			m.shift()
			toPolar(m,message);
			break;
		case 'toCartesian2D':
		case 'toCart2D':
			m.shift()
			toCartesian2D(m,message);
			break;
		case 'toCartesian3D':
		case 'toCart3D':
			m.shift();
			toCartesian3D(m,message);
			break;
		case 'toSphere':
			m.shift();
			toSphere(m,message);
			break;
		case 'toCyl':
		case 'toCylinder':
			m.shift();
			toCylinder(m, message);
			break;
		case 'portal':
			m.shift();
			portalCheck(m, message);
			break;
		case 'tri':
			m.shift();
			triCheck(m, message);
			break;
		case 'quad':
			m.shift();
			calcQuadratic(m, message);
			break;
		case 'average':
		case 'avg':
		case 'mean':
			m.shift()
			calcAverage(m, message);
			break;
		default:
			m = m.join('');
			calcEquation(m, message);
			break;
	}
}

function calcAverage(msg, message) {
	var avg = 0;
	if(msg.length >0) {
		for(var i = 0; i <msg.length; i++) {
			avg += Number(msg[i]);
		}
		avg /= msg.length;
		message.channel.send("Average equals: `"+avg+"`");
	} else {
		message.channel.send ("Can't average nothing.");
	}
}

function toCartesian3D(msg,message) {
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
	message.channel.send(msgText);
}

function toSphere(msg, message) {
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
	message.channel.send(msgText);
}

function toCylinder(msg,message) {
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
	message.channel.send(msgText);
}

function toCartesian2D(msg,message) {
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

	message.channel.send(msgText);
}

function toPolar(msg, message) {
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

	message.channel.send(msgText);
}

//Default calc
function calcEquation(msg, message) {
	var initEq = msg.toString();
	var tempEq = initEq;
	tempEq = replaceSpecialSymbols(tempEq);
	tempEq = expandOperations(tempEq);
	var eqArr = tempEq.split(' ');
	eqArr = removeNullsAndCommas(eqArr);
	eqArr = resolveNegation(eqArr);
	var rpnStack = getRPNStack(eqArr);
	var result = runRPNStack(rpnStack);

	result = new Intl.NumberFormat('en-US').format(result);
	console.log(result);
	message.channel.send("Answer is `"+ result +"`");
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
	var operatorArr = ["binom","fact","^","sqrt","sin","cos","tan","asin","acos",
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
	var operatorArr = {"binom":4,"fact":4,"sin":4,"cos":4,"tan":4,"asin":4,"acos":4,
		"atan":4,"log":4,"ln":4,"abs":4,"floor":4,"round":4,"ceil":4,
		"min":4,"max":4,"sqrt":4,"^":3,"*":2,"/":2,"+":1,"-":1};
	//var rightAssoc = ["^"];
	var leftAssoc = ["binom","fact","sin","cos","tan","asin","acos",
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
	var bin = 0;
	console.log("rpn: "+rpn);
	for(var i in rpn) {
		var t = rpn[i], n=+t;
		if(n==t) {
			s.push(n);
		} else {
			var op1 = 0, op2 = 0;
			console.log("t: "+t);
			switch (t) {
				case "fact":
					op1 = s.pop();
					s.push(factorial(op1));
					break;
				case "binom":
					op2 = s.pop();
					op1 = s.pop();
					s.push(getBinom(op1, op2));
					break;
				case "sin":
					op1 = s.pop();
					op1 = degToRad(op1);
					s.push(Math.sin(op1));
					break;
				case "cos":
					op1 = s.pop();
					op1 = degToRad(op1);
					s.push(Math.cos(op1));
					break;
				case "tan":
					op1 = s.pop();
					op1 = degToRad(op1);
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
					s.push(Math.log10(op1));
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
						s.push( op1 >= 0 ? Number.POSITIVE_INFINITY: Number.NEGATIVE_INFINITY);
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
		console.log("s: "+s);
	}
	return s;
}

function getBinom(n,k) {
	let a = 1;
	let b = 1;
	for(var i = (n-k+1); i <= n; i++) {
		a *= i;
	}
	for(var i = 1; i <= k; i++) {
		b *= i;
	}
	return a/b;
}

// Checks inputs for factorial
function factorialCheck(input, cI) {
	const MAX_INPUT = 100;
	if (isNaN(input)) {
		message.channel.send("Must be a number. No other characters!");
	} else {
		if (((input * 10) % 10) != 0) {
			message.channel.send("Cannot use decimals!");
		} else if (input == 0) {
			message.channel.send("1");
		} else if (input < 0) {
			message.channel.send("Cannot be negative");
		} else {
			if (input > MAX_INPUT) {
				input = MAX_INPUT;
				message.channel.send("Max set to " + MAX_INPUT);
			}
			var result = factorial(input);
			message.channel.send("Factorial of " + input + ": `" + result + "`");
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

function portalCheck(msg, message) {
	switch (msg[0]) {
		case 'nether':
			msg.shift();
			calcNetherPortal(msg, message);
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
		message.channel.send("`X: " + xr + ", Z: " + zr + "`");
	}
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

function calcQuadratic(m, message) {
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
	message.channel.send({files: [{attachment:initialEq, name:"initialEq.png"}], content: "Your initial equation is: "});
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

	message.channel.send({files: [{attachment:resultString,name:"Solutions.png"}], content: "Your solution(s): "});
}

function getLaTeX(msg, message) {
	var search = "http://chart.apis.google.com/chart";

	msg = msg.join('%20');
	console.log(bot.colors.cyan(msg));
	msg = msg.replace(/\+/g, "%2B");
	msg = msg.replace(/\&/g, "%26");
	search += "?cht=tx&chl=";
	search += msg;
	search += "&chf=bg,s,36393E&chco=FFFFFF&chs=60";
	console.log(bot.colors.magenta(search));
	message.channel.send({files: [{attachment:search, name:"textEq.png"}], content: "Your equation is: "});
}

function triCheck(msg, message) {
	switch (msg[0]) {
		case 'ssa':
			msg.shift();
			console.log(msg);
			calcSSA(msg, message);
			break;
		case 'aas':
			msg.shift();
			console.log(msg);
			calcAAS(msg, message);
			break;
		case 'asa':
			msg.shift();
			console.log(msg);
			calcASA(msg, message);
			break;
		case 'sss':
			msg.shift();
			console.log(msg);
			calcSSS(msg, message);
			break;
		case 'sas':
			msg.shift();
			console.log(msg);
			calcSAS(msg, message);
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
		msgText = "NO real solutions exist for this triangle.";
	} else {
		v = ((-1 * y) + Math.sqrt(w)) / (2 * x);
		u = ((-1 * y) - Math.sqrt(w)) / (2 * x);
		if (v <= 0 && u <= 0) {
			msgText = "No possible triangles.";
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
		}
	}
  message.chanel.send(msgText);
}

function calcAAS(m, message) {
	var a = Number(m[0]);
	var b = Number(m[1]);
	var d = degToRad(Number(m[2]));
	var z = Math.pow(b, 2) - Math.pow(a, 2);
	var y = -2 * b * Math.cos(d);
	var x = 1;
	var w = (Math.pow(y, 2) - (4 * x * z));
	var c, e, f, g, h, i, q, r, s, t, v, u = 0;

}

function calcSSS(m, message) {
	var a = Number(m[0]);
	var b = Number(m[1]);
	var c = Number(m[2]);
	var sumAB = a + b;
	var sumBC = b + c;
	var sumAC = a + c;
	var d, e, f, g, h, r, s, w, x, y = 0;
	var msgText = "";

	if (sumAB <= c || sumAC <= b || sumBC <= a) {
		msgText = "Cannot make a triangle.";
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

	}
	message.channel.send(msgText);
}

function calcSAS(m, message) {
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

	message.channel.send(msgText);
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
