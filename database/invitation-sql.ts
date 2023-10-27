const connection = require("./sql-connection.ts")

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS invitation (
        inviter_ID VARCHAR(18) NOT NULL,
        invited_ID VARCHAR(18) NOT NULL,
        invitation_link VARCHAR(8) NOT NULL,
        \`leave\` TINYINT(1) NOT NULL DEFAULT 0
        );`

    connection.executeQuery(createTableQuery, [], (error) => {
    if (error) {
        throw new Error('Erreur lors de la création de la table : ' + error.message);
    }

    console.log('Table invitation créée/initialisé avec succès !');
});

function addInvitation(inviter, invited, link, callback) {
    const query = "INSERT INTO invitation (inviter_ID, invited_ID, invitation_link) VALUES (?, ?, ?)";
    connection.executeQuery(query, [inviter, invited, link], callback);
}

/*function setLeave(callback) {
    const query = "INSERT INTO invitation (`leave`) VALUES (?)";
    connection.executeQuery(query, [1], callback);
}*/

module.exports = {
    addInvitation
};