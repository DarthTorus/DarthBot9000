const client = process.Discord
const MAX_INPUT = 100;// Recursive factorial
function factorial(input) {
  if (input == 1) {
    return 1;
  } else {
    return input * factorial(input - 1);
  }
}


module.exports = {
  name: 'factorial',
  usage: 'factorial <X>',
  desc: 'Returns the factorial of <X>',
  alias:['fact'],
  run (client, message, args) {
    
    let input = parseInt( args[0] )
    
    // input validation
    if ( isNaN( input ) ) return message.channel.send("Must be a number. No other characters!");
    if ( input < 0 ) return message.channel.send('Cannot be a negative')
    
    if (input > MAX_INPUT) {
        input = MAX_INPUT;
        message.channel.send(`Max set to ${MAX_INPUT}`);
    }
    
    const result = factorial(input);
    message.channel.send(`Factorial of ${input}: \`${result}\``);
}
}

