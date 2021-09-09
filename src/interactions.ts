import { Client, CommandInteraction, GuildMember } from "discord.js";
import { entersState, getVoiceConnection, joinVoiceChannel, VoiceConnectionStatus } from '@discordjs/voice';

async function join(interaction: CommandInteraction, client: Client) {
    await interaction.deferReply();
    let connection = getVoiceConnection(interaction.guildId!);
    if (!connection) {
        if (interaction.member instanceof GuildMember && interaction.member.voice.channel) {
            const channel = interaction.member.voice.channel
            connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guildId,
                selfDeaf: false,
                selfMute: true,
                adapterCreator: channel.guild.voiceAdapterCreator
            })
        } else {
            await interaction.followUp('Join a voice channel and then try again!');
            return;
        }
        try {
            await entersState(connection, VoiceConnectionStatus.Ready, 20e3);
            const receiver = connection.receiver;
            receiver.speaking.on('start', (userId: string) => {
                
            })
        } catch (error) {
            console.warn(error);
            await interaction.followUp('Failed to join voice channel within 20 seconds, please try again later!')
        }
        await interaction.followUp('Ready!');
    }

    export const interactionHandlers = new Map<
        string,
        (
            interaction: CommandInteraction,
            client: Client
        ) => Promise<void>
    >();

    interactionHandlers.set('join', join);