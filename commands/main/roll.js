/**
 *
 * @param {Number} times
 * @param {Number} sides
 * @param {Object} client
 * @returns {Number}
 */
function roll(times, sides, client) {
  let result = 0
  for(var i = 0; i < times; i++) {
    result += client.random(sides)
  }
  return result
}

module.exports = {
  name: "roll",
  usage:"roll <n> [x]",
  desc: "Rolls a <n>-sided dice [x] times or 1 if number of times not given.",
  alias: ["dice"],
  run ( client, message, args) {
    let finalTotal = 0
    let diceString = args.join('')

    // Split on +
    let individualSets = diceString.split('+')
    console.log(individualSets);
    // Go through the array and split on d
    for(var i = 0; i < individualSets.length; i++) {
      let element = individualSets[i].split('d')
      let numRolls = parseInt(element[0])
      let numSides = parseInt(element[1])

      if(isNaN(numRolls) && isNaN(numSides)) {
        finalTotal += 0
      } else if(!isNaN(numRolls) && isNaN(numSides)) {
        if(element.length == 1) {
          finalTotal += numRolls
        } else {
          finalTotal += roll(numRolls, 6, client)
        }
      } else if(isNaN(numRolls) && !isNaN(numSides)) {
        finalTotal += roll(1, numSides, client)
      } else {
        finalTotal += roll(numRolls, numSides, client)
      }
    }

    message.channel.send(`\`${finalTotal}\``);
  }
}