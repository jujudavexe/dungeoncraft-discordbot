const wait = require("timers/promises").setTimeout;
const { Events } = require('discord.js');
const {invites} = require("./invitation-handler.js")
const {guildId} = require('../../config.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        // "ready" isn't really ready. We need to wait a spell.
        await wait(1000);

        const guild = client.guilds.cache.get(guildId);

        // Fetch all Guild Invites
        const firstInvites = await guild.invites.fetch();
        firstInvites.forEach(invite => invites.set(invite.code, invite.uses))

    },
};