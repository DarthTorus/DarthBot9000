const RESPONSES = [
  "Yes", "No","Perhaps","Maybe",
  "All lines are busy. Please try again",
  "Odds are in your favor.", "The outlook does not look great",
  "Try again in an hour.", "Sorry I'm sleeping", "Out to Lunch",
  "Absolutely!", "Negative.", "Positive!", "Not even worth an answer.",
  "Of course.", "All signs point to yes."]
const NO_QSTNS = ["Did you have a question?", "I'm not psychic", "I can't read minds!",
  "Ask me *something*!", "Need something?","You really should ask me something.",
  "This silence is awkward to me","Help, I'm scared of mind reading!",
  "Uhh... Forget the question?","I may have forgotten the question",
  "Don't be a pie; ask something."]
module.exports = {
  name: "8-ball",
  usage: "8-ball <question>",
  desc: "Have a question? Ask the bot!",
  alias: ["8ball","magic-conch"],
  run(client, message, args) {
    let text = args.join(' ')
    
  
    var response = "";
    var msg = "";
    if(text != undefined && text != null && text != "" && text.length > 3) {
      response = client.random(RESPONSES.length);
      msg = RESPONSES[response];
    }
    else {
      response = client.random(NO_QSTNS.length);
      msg = NO_QSTNS[response];
    }
    message.channel.send(msg);
  }

}