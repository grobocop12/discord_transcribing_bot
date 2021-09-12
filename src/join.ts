import { entersState, getVoiceConnection, joinVoiceChannel, VoiceConnection, VoiceConnectionStatus } from "@discordjs/voice";
import { Client, CommandInteraction, GuildMember } from "discord.js";
import { createListeningStream } from "./createListeningStream";

export async function join(interaction: CommandInteraction, client: Client) {
    await interaction.deferReply();
    let connection = getVoiceConnection(interaction.guildId!);
    if (!connection) {
        tryCreatingConnection(interaction).then((voiceConnection) => {
            tryCreatingReceiverHandlers(interaction, client, voiceConnection);
        })
        .catch((message) => {
            interaction.followUp(message)
        })
    } else {
        tryCreatingReceiverHandlers(interaction, client, connection);
    }
}

async function tryCreatingConnection(interaction: CommandInteraction): Promise<VoiceConnection> {
    try {
        return createVoiceConnection(interaction);
    } catch (error) {
        throw error;
    }
}

async function createVoiceConnection(interaction: CommandInteraction): Promise<VoiceConnection> {
    if (interaction.member instanceof GuildMember && interaction.member.voice.channel) {
        const channel = interaction.member.voice.channel;
        return joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guildId,
            selfDeaf: false,
            selfMute: true,
            adapterCreator: channel.guild.voiceAdapterCreator
        });
    } else {
        throw new Error('Join a voice channel and then try again!');
    }
}

async function tryCreatingReceiverHandlers(interaction: CommandInteraction, client: Client, connection: VoiceConnection) {
    try {
        createReceiverHandlers(connection, client);
        await interaction.followUp('Ready!');
    } catch (error) {
        throw Error('Failed to join voice channel within 20 seconds, please try again later!');
    }
}

async function createReceiverHandlers(connection: VoiceConnection, client: Client) {
    await entersState(connection, VoiceConnectionStatus.Ready, 20e3);
    const receiver = connection.receiver;
    receiver.speaking.on('start', (userId: string) => {
        createListeningStream(receiver, userId, client.users.cache.get(userId))
    });
}