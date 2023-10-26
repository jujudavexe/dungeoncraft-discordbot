const fs = require('node:fs');
const path = require('node:path');

module.exports = async client => {

    const foldersPath = path.join(__dirname, '../commands');
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {

        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
                console.log(`La commande "${command.data.name}" du package "${folder}" à bien été chargée !`)
            } else {
                console.log(`[ATTENTION] La commande ${filePath} n'a pas les propriétés data ou execute.`);
            }
        }
    }
}