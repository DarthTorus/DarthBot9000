module.exports ={
	name:"default",
	usage:"d-[command]",
	desc: "This is for commands that aren't under a module, like toss, draw, or 8-ball",
	alias: [],
	run( client, message, args) {
		message.reply("I cannot do anything by myself!")
	}
}