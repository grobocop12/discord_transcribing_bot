import { getVoiceConnection } from "@discordjs/voice";
import { Client, CommandInteraction, GuildMember, Snowflake } from "discord.js";

export async function stopTranscribing(interaction: CommandInteraction, client: Client, recordable?: Set<Snowflake>) {
    interaction.deferReply();
    let connection = getVoiceConnection(interaction.guildId!);
    if (connection &&
        recordable &&
        interaction.guildId &&
        interaction.member instanceof GuildMember &&
        interaction.member.voice.channel) {
        const userId = interaction.options.get('speaker')?.value! as Snowflake;
        if(recordable.has(userId)){
            recordable.delete(userId);
        }
        interaction.followUp("User deleted from list.");
    } else {
        interaction.followUp("Join voice channel and try again.");
    }
}