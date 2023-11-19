const wait = require("timers/promises").setTimeout;
const { Events } = require('discord.js');
const {invites} = require("./invitation-handler.js")
require('dotenv').config();

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {

        await wait(1000);

        const guild = client.guilds.cache.get(process.env.GUILDID);

        const firstInvites = await guild.invites.fetch();
        firstInvites.forEach(invite => invites.set(invite.code, invite.uses))

    },
};