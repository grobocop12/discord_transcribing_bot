import { Client, CommandInteraction, GuildMember, Snowflake } from "discord.js";

export async function stopRecording(interaction: CommandInteraction, client: Client, recordable?: Set<Snowflake>) {
    if (interaction.guildId &&
        interaction.member instanceof GuildMember &&
        interaction.member.voice.channel) {
        recordable?.clear();
        interaction.reply('Cleared list of recordable users.')
    } else {
        interaction.reply('Join a voice channel and then try again!');
    }
}