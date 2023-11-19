const { Client, Collection } = require('discord.js');
require('dotenv').config();
const client = new Client({ intents: 3276799 });
const loadCommand = require('./loader/command-loader.js')
const loadEvent = require('./loader/event-loader.js')

client.commands = new Collection();
loadCommand(client)
loadEvent(client)

client.login(process.env.TOKEN).then(() => {
    console.log("Ready");
});



