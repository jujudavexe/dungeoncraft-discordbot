const { Events } = require('discord.js');
const invitationData = require("../../database/invitation-sql.js")

module.exports = {
    name: Events.GuildMemberRemove,
    once: false,
    async execute(member) {
        invitationData.setUserQuit(member.user.tag)
    },
};

