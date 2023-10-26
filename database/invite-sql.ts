const connection = require("./sql-connection.ts")

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS invitation (
        inviter_ID VARCHAR(18) NOT NULL,
        invited_ID VARCHAR(18) NOT NULL,
        invite_link VARCHAR(8) NOT NULL,
        \`leave\` TINYINT(1) NOT NULL DEFAULT 0
        );`

connection.executeQuery(createTableQuery, [], (error, results, fields) => {
    if (error) {
        throw new Error('Erreur lors de la création de la table : ' + error.message);
    }

    console.log('Table invitation créée/initialisé avec succès hehe !');
});