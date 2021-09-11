import Discord, { Interaction } from 'discord.js';
import { commands } from './commands';
import { createRecordingsChannel } from './create_channel';
import { interactionHandlers } from './interactions';

export const client = new Discord.Client({ intents: ['GUILD_VOICE_STATES', 'GUILD_MESSAGES', 'GUILDS'] });

client.on('ready', () => {
    initializeCommands();
});

client.on('interactionCreate', async (interaction: Interaction) => {
    if (interaction.isCommand() && interaction.guildId) {
        const handler = interactionHandlers.get(interaction.commandName);
        if (handler) {
            handler(interaction, client);
        }
    }
})

function initializeCommands() {
    client.guilds.cache.forEach(async (guild, key, map) => {
        await commands(guild)
            .then(() => {
                createRecordingsChannel(guild);
            })
    })
    console.log('Recorder is up!');
}