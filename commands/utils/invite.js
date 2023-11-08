const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
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
        
        const numberOfHere = numberOfHereResult.length;
        const numberOfLeaved = numberOfLeavedResult.length;

        const embed = new EmbedBuilder()
            .setTitle('Statistiques d\'invitation')
            .setDescription(`👥 Invités ${numberOfHere} personnes\n` +
                `👋 Quittés, ${numberOfLeaved} personnes\n` +
                `Total : ${numberOfHere + numberOfLeaved}`)
            .setColor('#00b0fd') // Utilisez un code de couleur personnalisé (en hexadécimal)
            .setFooter({text: 'Statistiques d\'invitation fournies par notre bot!'})

        await interaction.reply({ embeds: [embed] });
    },
};
