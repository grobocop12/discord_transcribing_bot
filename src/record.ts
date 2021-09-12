import { getVoiceConnection } from "@discordjs/voice";
import { Client, CommandInteraction, Snowflake } from "discord.js";

export async function record(interaction: CommandInteraction, client: Client, recordable?: Set<Snowflake>) {
    let connection = getVoiceConnection(interaction.guildId!);
    if(recordable && connection) {
        const userId = interaction.options.get('speaker')?.value! as Snowflake;
        recordable.add(userId);
        await interaction.reply("Listening!");
    } else {
        await interaction.reply("Join voice channel and try again.");
    }
}