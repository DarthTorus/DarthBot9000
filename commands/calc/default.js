module.exports = {
	name:"default",
	usage:"calc",
	desc:"Runs a calculation of an expression or the request [subcommand]",
	alias:[''],
	run( client, message, args) {
		message.channel.send("Nothing to calc yet!")
	}
}