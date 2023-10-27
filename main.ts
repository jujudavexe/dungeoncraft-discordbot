const { Client, Collection } = require('discord.js');
const { token } = require('./config.ts');
const client = new Client({ intents: 3276799 });
const loadCommand = require('./loader/command-loader.ts')
const loadEvent = require('./loader/handler-loader.ts')
//const invitation = require("./database/invitation-sql.ts")



client.commands = new Collection();
loadCommand(client)
loadEvent(client)

//invitation.addInvitation("test", "test", "test")
client.login(token).then(() => {
    console.log("Ready");
});

module.exports = {
    client,
};



