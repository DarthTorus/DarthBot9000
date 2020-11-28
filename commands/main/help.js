module.exports = {
	name: 'help',
	usage: 'help [command] [subcommand]',
	desc: 'shows all commands or explains specific commands',
	alias: ['h'],
	run( client, message, args ) {

			if ( !args[0] ) {
					
					const result = client.commands.reduce( ( total, parent, key ) => {return total + `├─${key}\n`}, '' )

					message.channel.send( `\`\`\`\nTrigger: d-\n${result}\`\`\`` )

			} else {

					let parent;
					let request = args[0];
					if ( client.commands.has( args[0] ) && client.commands.get( args[0] ).has('default') ) {
							parent = args.shift()
							request = args.shift() || 'default'
					} else {
							parent = 'main'
					}

					const command = client.commands.get( parent ).find( command => command.name === request || command.alias.includes(request) )
					if ( !command ) return message.channel.send('No command found.')

					let name = command.name;
					if ( parent != 'main' ) {
							name = `${parent} ${command.name}`
							if ( command.name === 'default' ) name = parent
					}
					let aliasCheck = ""
					if(command.alias.length > 0) {
						aliasCheck = "\nAlias: "+ command.alias.join(", ")
					}
					const result = `\`\`\`\nCommand: ${process.env.TRIGGER}${name}\nUsage: ${command.usage}\nDescription: ${command.desc}${aliasCheck}\`\`\``

					message.channel.send( result )

			}

	}

}