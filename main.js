const { Client, Collection } = require('discord.js');
const { token } = require('./config.js');
const client = new Client({ intents: 3276799 });
const loadCommand = require('./loader/command-loader.js')
const loadEvent = require('./loader/handler-loader.js')

client.commands = new Collection();
loadCommand(client)
loadEvent(client)

client.login(token).then(() => {
    console.log("Ready");
});

module.exports = {
    client,
};



