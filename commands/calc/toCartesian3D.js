const client = process.Discord

module.exports = {
  name: "toCartesian3D",
  usage: "toCartesian3D",
  desc: "Converts from <Polar | Cyl | Sphere> coords into Cartesian (x,y,z)",
  alias: ['toCart3D'],
  run(client,message,args) {
    message.channel.send("Test");
  }
}