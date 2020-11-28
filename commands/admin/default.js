module.exports = {
	name: "default",
	usage: "admin <command>",
	desc: "Admin commands for the bot",
	alias:[],
	run(client,message,args) {
		if(message.author.id != process.env.OWNER_ID) {
			message.reply("You have no power here!")
		}
		else {
			message.reply("I need a little more info on what to do")
		}
	}
}