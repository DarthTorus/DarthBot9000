module.exports ={
	name:"default",
	usage:"d-",
	desc: "This does nothing",
	alias: [""],
	run( client, message, args) {
		message.reply("I cannot do anything by myself!")
	}
}