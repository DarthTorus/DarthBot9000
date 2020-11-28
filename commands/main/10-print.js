module.exports = {
  name: "10-print",
  usage: "10-print",
  desc: "Outputs 10-print",
  alias:["10p","10print"],
  run(client, message, args) {
    var defW = 40;
    var defH = 30;
    var width = parseInt(args[0]) || defW
    var height = parseInt(args[1]) || defH
    if(width > defW) {
      width = defW;
    }
    if(height > defH) {
      height = defH;
    }
    var result = ""//"```";
    var rand = 0;
    for(var r = 1; r <= height; r++) {
      for(var c = 1; c <= width; c++) {
        rand = client.random(2);
        if(rand == 1) {
          result += "\u2571";
        }
        else {
          result += "\u2572";
        }
        if(c == width) {
          result += "\n";
        }
      }
    }
    //result += "```";
    message.channel.send(result);
  }
}