import Discord, { Interaction, Snowflake } from 'discord.js';
import { commands } from './commands';
import { createRecordingsChannel } from './create_channel';
import { interactionHandlers } from './interactions';

export const client = new Discord.Client({ intents: ['GUILD_VOICE_STATES', 'GUILD_MESSAGES', 'GUILDS'] });

const recordables = new Map<Snowflake, Set<string>>();

client.on('ready', () => {
    initializeCommands();
});

client.on('interactionCreate', async (interaction: Interaction) => {
    if (interaction.isCommand() && interaction.guildId) {
        const handler = interactionHandlers.get(interaction.commandName);
        if (handler) {
            handler(interaction, client, recordables.get(interaction.guildId));
        }
    }
})

function initializeCommands() {
    client.guilds.cache.forEach(async (guild, key, map) => {
        await commands(guild)
            .then(() => {
                recordables.set(guild.id, new Set<Snowflake>())
                createRecordingsChannel(guild);
            })
    })
    console.log('Recorder is up!');
}