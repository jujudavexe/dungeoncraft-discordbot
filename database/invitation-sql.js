const connection = require("./sql-connection.js")

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS invitation (
        inviter_ID VARCHAR(18) NOT NULL,
        invited_ID VARCHAR(18) NOT NULL,
        \`leave\` TINYINT(1) NOT NULL DEFAULT 0
        );`

    connection.executeQuery(createTableQuery, [], (error) => {
    if (error) {
        throw new Error('Erreur lors de la création de la table : ' + error.message);
    }

    console.log('Table invitation créée/initialisé avec succès !');
});

function addInvitation(inviter, invited, callback) {
    const selectQuery = "SELECT * FROM invitation WHERE invited_ID = ?";
    connection.executeQuery(selectQuery, [invited], (error, results) => {
        if (error) {
            callback(error, null);
        } else {
            console.log(results.length)
            if (results.length === 0) {
                // Aucune invitation existante avec les mêmes inviter_ID et invited_ID
                console.log("test1")
                const insertQuery = "INSERT INTO invitation (inviter_ID, invited_ID) VALUES (?, ?)";
                console.log("Valeurs inviter et invited:", inviter, invited);
                connection.executeQuery(insertQuery, [inviter, invited], (error) => {
                    if (error) {
                        console.error("Erreur lors de l'insertion de l'invitation : ", error);
                    } else {
                        console.log("Invitation insérée avec succès !");
                    }
                });

            } else {
                // Une invitation existe déjà avec les mêmes inviter_ID et invited_ID
                // Mise à jour la colonne "leave" ici si nécessaire
                console.log("test2")
                const updateQuery = "UPDATE invitation SET  `leave` = 0 WHERE inviter_ID = ? AND invited_ID = ?";
                connection.executeQuery(updateQuery, [inviter, invited], callback);
            }
        }
    });
}

function setUserQuit(invited) {
    const query = "UPDATE invitation SET `leave` = 1 WHERE invited_ID = ?";
    connection.executeQuery(query, [invited], (error, result) => {
        if (error) {
            // Gérer les erreurs de la requête SQL ici
            console.error("Erreur lors de l'exécution de la requête SQL : ", error);
        } else {
            if (result.affectedRows > 0) {
                // La mise à jour a été effectuée avec succès
                console.log("Mise à jour effectuée avec succès.");
            }
        }
    });
}


module.exports = {
    addInvitation,
    setUserQuit
};