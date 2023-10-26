const { Client, Events, Collection } = require('discord.js');
const { token } = require('./config.ts');
const client = new Client({ intents: 3276799 });
const loadCommand = require('./loader/command-loader.ts')
require("./database/invite-sql.ts")

client.commands = new Collection();
loadCommand(client)

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});

client.login(token).then(() => {
    console.log("Ready");
});


