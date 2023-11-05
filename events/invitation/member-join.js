const { Events } = require('discord.js');
const { invites } = require('./invitation-handler.js');
const client = require('../../main.js');

module.exports = {
    name: Events.GuildMemberAdd,
    once: false,
    async execute(member) {
        // To compare, we need to load the current invite list.
        const newInvites = await member.guild.invites.fetch();
        // Look through the invites, find the one for which the uses went up.
        const invite = newInvites.find(i => i.uses > invites.get(i.code));

        // Check if the invite exists before trying to access its inviter
        if (invite) {
            const inviter = await client.users.fetch(invite.inviter.id);

            // Get the log channel (change to your liking)
            const logChannel = member.guild.channels.cache.find(channel => channel.name === "général");

            // A real basic message with the information we need.
            logChannel.send(`${member.user.tag} a rejoint en utilisant l'invitation ${invite.code} de ${inviter.tag}. L'invitation a été utilisée ${invite.uses} fois depuis sa création.`);
        } else {
            const logChannel = member.guild.channels.cache.find(channel => channel.name === "général");
            logChannel.send(`${member.user.tag} a rejoint mais on ne sait pas grâce à quelle invitation.`);
        }
    },
};

