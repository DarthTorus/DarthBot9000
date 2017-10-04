//Hello me, let's try not to derp this file creation up this time, k?
//ipie4fun's biggest controbution so far (10/4/17)
var bot = process.DiscordBot; //makes bot things work

//TODO: Enter msg.;ength <= 1 error messages.

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
      msg.split();
      encrypt(msg, uID);
    }
    else if(msg[0].equals("decrypt"))
    {
      msg.split();
      encrypt(msg, uID);
    }
    else
    {
      //sarcastic error message for not typing in correct syntax.
    }
  }
}

function encrypt()
{
  //Will do thing here
}

function decrypt()
{
  //Will do thing here
}
