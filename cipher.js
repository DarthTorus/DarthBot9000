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

function doThing(msg, uID)
{
  //checking to see if it's encrypt or decrypt
  if(msg.length == 0)
  {
    //return message about not putting anything after the thing
  }
  else if(msg.length == 1)
  {
    //check to se if they typed in encrypt or decrypt and then give appropriate sacastic remark about how there is nothing to encrypt/decrypt.
  }
  else
  {
    msg[0] = msg[0].toLowerCase(); //makes the encrypt or decrypt check lowercase.
    if(msg[0].equals("encrypt"))
    {
      msg.shift();
      msg.join("~");
      encrypt(msg, uID);
    }
    else if(msg[0].equals("decrypt"))
    {
      msg.shift();
      msg.join(" ");
      encrypt(msg, uID);
    }
    else
    {
      //sarcastic error message for not typing in correct syntax.
    }
  }
}

function encrypt(ip, uI)
{
  var opopie = "";
  for(i = 0; i < ip.length; i = i + 1)
  {
    for(x = 0; x < 9; x = x + 1)
    {
      for(y = 0; y < 10; y = y + 1)
      {
        if(ip.substring(i,i+1).equals(mat[x][y]))
        {
          opopie = opopie + mat[Math.floor(Math.random()*9)][y] + mat[x][Math.floor(Math.random(10))];
        }
      }
    }
  }
  for(j = 0; j < opopie.length; j = j + 1)
  {
    if(opopie.substring(j,j+1).equals("~"))
    {
      opopie = opopie.substring(0,j) + "\\" + opopie.substring(j,opopie.length); 
    }
  }
  //ENTER CODE TO MAKE IT SLIDE INTO THOSE ENCRYPTED DMs
}

function decrypt()
{
  //Will do thing here
}
//Thing that makes things work
var cipher = {
	doThing: doThing
}
module.exports = cipher;
