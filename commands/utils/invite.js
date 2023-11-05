const { SlashCommandBuilder } = require('discord.js');
const database = require('../../database/invitation-sql');

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

        const numberOfHereResult = await database.getMemberHere(user.tag);
        const numberOfLeavedResult = await database.getMemberLeaved(user.tag);

        // Vérifiez si les résultats sont définis avant d'accéder à leur longueur
        const numberOfHere = numberOfHereResult.length;
        const numberOfLeaved = numberOfLeavedResult.length;

        await interaction.reply(`Nombre de personne invitée encore présente : ${numberOfHere} \n` +
                                `Nombre de personne invitée aillant quitté : ${numberOfLeaved} \n` +
                                `Total : ${numberOfHere + numberOfLeaved}`);
    },
};
