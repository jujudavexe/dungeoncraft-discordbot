const fs = require('fs');
const path = require('path');

module.exports = async client => {

    const foldersPath = path.join(__dirname, '../events');
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
        const eventsPath = path.join(foldersPath, folder);
        const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js')).filter(file => !file.endsWith('handler.js'));

        for (const file of eventFiles) {
            const filePath = path.join(eventsPath, file);
            const event = require(filePath);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }
            console.log(`L'event "${file}" à bien été chargée !`)
        }
    }
}