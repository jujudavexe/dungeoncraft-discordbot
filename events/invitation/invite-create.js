const {Events} = require('discord.js');
const {invites} = require('./invitation-handler.js')

module.exports = {
    name: Events.InviteCreate,
    once: false,
    async execute(invite) {
        invites.set(invite.code, invite.uses);
    },
};