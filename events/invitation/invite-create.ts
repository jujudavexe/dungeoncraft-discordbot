const {Events} = require('discord.js');
const {invites} = require('./invitation-handler.ts')

module.exports = {
    name: Events.InviteCreate,
    once: false,
    async execute(invite) {
        invites.set(invite.code, invite.uses);
    },
};