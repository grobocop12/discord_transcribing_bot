import { getVoiceConnection } from "@discordjs/voice";
import { Client, CommandInteraction, GuildMember, Snowflake } from "discord.js";

export async function leave(interaction: CommandInteraction, client: Client, recordable?: Set<Snowflake>) {
    if (interaction.guildId &&
        interaction.member instanceof GuildMember &&
        interaction.member.voice.channel) {
        destroyConnectionAndClearRecordables(interaction, interaction.member.voice.channel.id, recordable);
    } else {
        interaction.reply('Join a voice channel and then try again!');
    }
}

function destroyConnectionAndClearRecordables(interaction: CommandInteraction,
    channelId: string,
    recordable?: Set<Snowflake>) {
    const connection = getVoiceConnection(interaction.guildId!);
    if (connection &&
        connection.joinConfig.channelId === channelId) {
        recordable?.clear();
        connection.destroy();
        interaction.reply('Leaving channel');
    } else {
        interaction.reply('You have to be in the same voice channel')
    }
}