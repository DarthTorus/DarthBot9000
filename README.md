# Formu-bot
## Discord bot that does a lot of weird/interesting math

### Adding a module

1. In `commands.js` go to `const reqFiles` and add the name of the new module as a string into the array.
1. In `commands.js` go to `const names` and add a global variable name as a string into the array.
1. In your new module, the first line should be `var bot = process.DiscordBot;`.
1. If there are subcommands associated with this module:
   1. Create a function and name it `<global variable of module>Check(){}`
      1. For example, my `admin.js` file has `adminCheck()`.
      1. Make sure to put in any parameters needed, usually msg and channelID.
   1. Use a `switch case` block in the newly created check function to test for subcommands
1. At the bottom of the file insert this: 
```javascript
var <var> = {
	<check function name>: <check function name>
  [, <any other functions to export>:  <any other functions to export>]
}
module.exports = <var>;```
