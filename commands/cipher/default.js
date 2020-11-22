//Author: iPie4Fun
//Edits: Darth_Torus

var bot = process.DiscordBot; //makes bot things work
var cipherMat = process.env.CIPHER_MATRIX;
		 //Darth, if you somehow make this matrix private, make sure to compeltely re-randomise the matrix.
//TODO: Enter msg.length <= 1 error messages.

function cipherCheck(m, message) {
	m[0] = m[0].toLowerCase();
  switch(m[0]) {
		case "encrypt": //If encrypting
			m.shift();
   	 	m = m.join("~");//turn spaces into ~ (Trust me, this makes this so much easier and better)
    	encrypt(m, message);
			break;
		case "decrypt": //If decrypting
			m.shift();
    	m = m.join('');//I mean, all spaces should be ~ at this point, so...
    	decrypt(m, message);
			break;
		default:
			//sarcastic error message for not typing in correct syntax.
			message.channel.send("So you you want me to `encrypt` or `decrypt` that?");
	}
}

function encrypt(ip, message) {
  var opopie = "";//OutPutOutPIE
  for(i = 0; i < ip.length; i++) {
    for(x = 0; x < 9; x++) {
      for(y = 0; y < 10; y++) {
        if(ip[i] == mat[y][x]) {
          opopie += (mat[bot.random(10)][x] + mat[y][bot.random(9)]);//Does encrypt
        }
      }
    }
  }
	var temp = ["\~","\_","\*","\`"];
	var chars = ["~","_","\\\*","`"];
  for(j = 0; j < temp.length; j++) {
		var c = chars[j];
  	var reg = new RegExp(c,"g");
    opopie = opopie.replace(reg,temp[j]);//Does anti-crossout measures

  }
  //ENTER CODE TO MAKE IT SLIDE INTO THOSE ENCRYPTED DMs
	mssage.author.send("```"+opopie+"```");
}

function decrypt(ip, message) {
  var opopie = ""; //OutPutOutPIE
  var deCheck = true; //a varible to mark if the decryption worked... set default to true
  if(ip.length % 2 == 1) {
    //Error, the input isn't done right. (The encrypted message isn't correctly encrypted)
    deCheck = false;
  }
  else //Hey, look, the inputed encrypted message might actually be an encrypted message.
  {
    var tempString = "";
    for(i = 0; i < ip.length; i+= 2)//boops up two
    {
      var derpCheckAlpha = false;
      var derpCheckBeta = false;
      var boopy = 0;
      var boopx = 0;
      for(x = 0; x < 9; x++) {
        for(y = 0; y < 10; y++) {
          if(mat[y][x] == ip.substring(i,i+1)) {
            boopx = x;
            derpCheckAlpha = true;
          }
        }
      }
      for(x = 0; x < 9; x++) {
        for(y = 0; y < 10; y++) {
          if(mat[y][x] == ip.substring(i+1,i+2)){
            boopy = y;
            derpCheckBeta = true;
          }
        }
      }
      if(derpCheckAlpha && derpCheckBeta) {
        opopie += mat[boopy][boopx];
      }
      else {
        deCheck = false;
      }
    }
  }
  if(deCheck) {
		opopie = opopie.replace(/~/g," ");
    //ENTER CODE TO MAKE IT SLIDE INTO THOSE DECRYPTED DMs
		message.author.send("```"+opopie+"```");
  }
}
//Thing that makes things work
var cipher = {
	cipherCheck: cipherCheck
}
module.exports = cipher;
