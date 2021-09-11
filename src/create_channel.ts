import { Guild } from "discord.js";

const recordsChannelName = "records";

export async function createRecordingsChannel(guild: Guild) {
    const recordsChannel = guild.channels.cache.find(c => c.name === recordsChannelName);
    if (!recordsChannel) {
        guild.channels.create(recordsChannelName, {
            type: 'GUILD_TEXT',
            reason: "Channel for storing voice records.",
        });
    }
}