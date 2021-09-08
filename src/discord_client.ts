import Discord, { Interaction } from 'discord.js';
import { commands } from './commands';

export const client = new Discord.Client({ intents: ['GUILD_VOICE_STATES', 'GUILD_MESSAGES', 'GUILDS'] });

client.on('ready', () => {
    initializeCommands();
});

client.on('interactionCreate', async (interaction: Interaction) => {

})

function initializeCommands() {
    client.guilds.cache.forEach(async (guild, key, map) => {
        await commands(guild);
    })
    console.log('Recorder is up!');
}