const gameList = require("../json/statusList.json")
const client = process.Discord

module.exports = () => {

  return () => {
    client.startDate = new Date().toLocaleString('en-US',{hour12: false})
    quitStatus = false
    console.log( client.colors.brightCyan("Started: ") + client.colors.brightBlue(client.startDate))
    console.log( client.colors.brightGreen("Connected!"))
    console.log( client.colors.brightCyan("Logged in as: ") + client.colors.brightWhite(client.user.tag) + " - " + client.colors.brightMagenta(`@${client.user.id}`))
    if(client.inStandby) {
      client.randomStatus("in dreams.")
    }
    else {
      client.randomStatus("0")
    }
  }

}
