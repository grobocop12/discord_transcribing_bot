import { Guild, GuildChannel, ThreadChannel } from "discord.js";

const recordsChannelName = "records";

export async function createRecordingsChannel(guild: Guild) {
    const recordsChannel = findRecordsChannel(guild);
    if (!recordsChannel) {
        guild.channels.create(recordsChannelName, {
            type: 'GUILD_TEXT',
            reason: "Channel for storing voice records.",
        });
    }
}

export function findRecordsChannel(guild: Guild): GuildChannel | ThreadChannel | undefined {
    return guild.channels.cache.find(c => c.name === recordsChannelName);
}
