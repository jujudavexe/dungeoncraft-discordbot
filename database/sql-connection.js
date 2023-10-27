const mysql = require('mysql2');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "dungeoncraftdiscord"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Mysql connecté !");
});

// Fonction pour effectuer une requête
function executeQuery(query, values, callback) {
    con.execute(query, values, callback);
}

module.exports = {
    executeQuery
};

