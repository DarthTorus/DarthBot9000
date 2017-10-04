//Hello me, let's try not to derp this file creation up this time, k?
//ipie4fun's biggest controbution so far (10/4/17)
var bot = process.DiscordBot; //makes bot things work
var mat = [[":","9","k","+","i","c","F","n","u"]
	   ["I","m","B","G","8","{","&","j","y"]
	   ["C","X","}",")","Z","s","l","$","J"]
	   ["r","z","\"","D","U","]","2","%","K"]
	   ["[","/","-",",","6","@","R","M","Q"]
	   ["W","e","h","&","f","o","A","5","w"]
	   [">","?",";","<","O","!","1","0","a"]
	   ["(",".","#","~","N","E","q","^","7"]
	   ["P","d","S","V","3","b","H","T","L"]
	   ["t","g","v","4","p","\\","Y","x","="]]; //Darth, if you somehow make this matrix private, make sure to compeltely re-randomise the matrix.
//TODO: Enter msg.length <= 1 error messages.

function doThing(msg, cID, uID)
{
  //checking to see if it's encrypt or decrypt
  if(msg.length == 0)
  {
    //return message about not putting anything after the thing
		bot.sendMessages(cID, ["If you don't know how to use it, try the help command."]);
  }
  else if(msg.length == 1)
  {
    //check to se if they typed in encrypt or decrypt and then give appropriate sacastic remark about how there is nothing to encrypt/decrypt.
		bot.sendMessages(cID, ["Don't waste my time."]);
  }
  else
  {
    msg[0] = msg[0].toLowerCase(); //makes the encrypt or decrypt check lowercase.
		switch(msg[0])
		{
			case "encrypt": //If encrypting
				msg.shift();
     	 	msg.join("~");//turn spaces into ~ (Trust me, this makes this so much easier and better)
      	encrypt(msg, uID);
				break;
			case "decrypt": //If decrypting
				msg.shift();
      	msg.join(" ");//I mean, all spaces should be ~ at this poiint, so...
      	encrypt(msg, uID);
				break;
			default: 
				//sarcastic error message for not typing in correct syntax.
				bot.sendMessages(cID, ["So you you want me to `encrypt` or `decrypt` that?"]);
				break;
		}
  }
}

function encrypt(ip, uI)
{
  var opopie = "";//OutPutOutPIE
  for(i = 0; i < ip.length; i = i + 1)
  {
    for(x = 0; x < 9; x = x + 1)
    {
      for(y = 0; y < 10; y = y + 1)
      {
        if(ip.substring(i,i+1).equals(mat[y][x]))
        {
          opopie = opopie + mat[Math.floor(Math.random(10))][x] + mat[y][Math.floor(Math.random()*9)];//Does encrypt
        }
      }
    }
  }
  for(j = 0; j < opopie.length; j = j + 1)
  {
    if(opopie.substring(j,j+1).equals("~"))
    {
      opopie = opopie.substring(0,j) + "\\" + opopie.substring(j,opopie.length);//Does anti-crossout measures
    }
  }
  //ENTER CODE TO MAKE IT SLIDE INTO THOSE ENCRYPTED DMs
	bot.sendMessage({
		to: uI,
		message: opopie
	});
}

function decrypt(ip, uI)
{
  var opopie = ""; //OutPutOutPIE
  var deCheck = true; //a varible to mark if the decryption worked... set default to true
  if(ip.length%2==1)
  {
    //Error, the input isn't done right. (The encrypted message isn't correctly encrypted)
    deCheck = false;
  }
  else //Hey, look, the inputed encrypted message might actually be an encrypted message.
  {
    var tempString = "";
    for(i = 0; i < ip.length; i = i + 2)//boops up two
    {
      var derpCheckAlpha = false;
      var derpCheckBeta = false;
      var boopy = 0;
      var boopx = 0;
      for(x = 0; x < 9; x = x + 1)
      {
        for(y = 0; y < 10; y = y + 1)
        {
          if(mat[y][x].equals(ip.substring(i,i+1)))
          {
            boopy = y;
            derpCheckAlpha = true;
          }
        }
      }
      for(x = 0; x < 9; x = x + 1)
      {
        for(y = 0; y < 10; y = y + 1)
        {
          if(mat[y][x].equals(ip.substring(i+1,i+2)))
          {
            boopx = x;
            derpCheckBeta = true;
          }
        }
      }
      if(derpCheckAlpha && derpCheckBeta)
      {
        opopie = opopie + mat[boopy][boopx];
      }
      else
      {
        deCheck = false;
      }
    }
  }
  if(deCheck)
  {
    //ENTER CODE TO MAKE IT SLIDE INTO THOSE DECRYPTED DMs
		bot.sendMessage({
			to: uI,
			message: opopie
		});
  }
}
//Thing that makes things work
var cipher = {
	doThing: doThing
}
module.exports = cipher;
