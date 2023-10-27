/*const { SlashCommandBuilder } = require('discord.js');
const database = require('database'); // Utiliser une vraie base de données en production

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription("Regarde le nombre de personnes qu'un utilisateur a invité.")
        .addUserOption(option =>
            option.setName('utilisateur')
                .setDescription("L'utilisateur dont vous voulez connaître le nombre d'invitations.")
                .setRequired(true)
        ),

    async execute(interaction) {
        const user = interaction.options.getUser('utilisateur');

        // Récupérer les données d'invitation de l'utilisateur depuis la base de données
        const inviteData = database.getInviteData(user.id);

        if (!inviteData) {
            return interaction.reply("Cet utilisateur n'a pas créé d'invitation sur ce serveur.");
        }

        // Compter le nombre d'invitations toujours valides
        let invitesStillValid = 0;

        for (const invite of inviteData) {
            if (invite.isValid) {
                invitesStillValid++;
            }
        }

        await interaction.reply(`${user.tag} a invité ${invitesStillValid} personnes sur le serveur.`);
    },
};*/
