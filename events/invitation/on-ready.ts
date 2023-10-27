const wait = require("timers/promises").setTimeout;
const { Events, Collection } = require('discord.js');
const {invites} = require("./invitation-handler.ts")
const {guildId} = require('../../config.ts');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        // "ready" isn't really ready. We need to wait a spell.
        await wait(1000);

        const guild = client.guilds.cache.get(guildId);

        // Fetch all Guild Invites
        const firstInvites = await guild.invites.fetch();
        // Set the key as Guild ID, and create a map which has the invite code, and the number of uses
        invites.set(firstInvites.map((invite) => [invite.code, invite.uses]));
    },
};