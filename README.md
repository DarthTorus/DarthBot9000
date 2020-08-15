# Formu-bot
**Discord bot that does a lot of weird/interesting math**

### Adding a module

1. In `commands.js` go to `const reqFiles` and add the name of the new module as a `key: value` pair into the Object where `key` is the global variable you want to use and `value` is the file name for the new module. For example `npc: "npc.js"
1. In your new module, the first line should be `var bot = process.DiscordBot;`.
1. If there are subcommands associated with this module:
   1. Create a function and name it `<global variable of module>Check(){}`
      1. For example, my `admin.js` file has `adminCheck()`.
      1. Make sure to put in any parameters needed, usually msg and the object `message`.
   1. Use a `switch case` block in the newly created check function to test for subcommands
1. At the bottom of the file insert this: 
```js
var <var> = {
	<check function name>: <check function name>
  [, <any other functions to export>:  <any other functions to export>]
}
module.exports = <var>;
```
