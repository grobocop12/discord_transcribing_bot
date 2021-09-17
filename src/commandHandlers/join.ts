import { entersState, getVoiceConnection, joinVoiceChannel, VoiceConnection, VoiceConnectionStatus } from "@discordjs/voice";
import { Client, CommandInteraction, GuildMember, Interaction, Snowflake } from "discord.js";
import { createListeningStream } from "./create_listening_stream";

export async function join(interaction: CommandInteraction, client: Client, recordable?: Set<Snowflake>) {
    await interaction.deferReply();
    getOrCreateVoiceConnection(interaction)
        .then((connection: VoiceConnection) => {
            return tryCreatingReceiverHandlers(interaction, client, connection, recordable!)
        })
        .then(() => {
            interaction.followUp("Ready!");
        })
        .catch((error: Error) => {
            interaction.followUp(error.message);
        })
}

async function getOrCreateVoiceConnection(interaction: CommandInteraction): Promise<VoiceConnection> {
    let connection = getVoiceConnection(interaction.guildId!);
    if (!connection) {
        return createVoiceConnection(interaction);
    } else {
        return connection;
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

async function tryCreatingReceiverHandlers(interaction: CommandInteraction,
    client: Client,
    connection: VoiceConnection,
    recordable: Set<Snowflake>): Promise<void> {
    return createReceiverHandlers(interaction, connection, client, recordable)
        .catch(error => {
            throw Error('Failed to join voice channel within 20 seconds, please try again later!');
        })
}

async function createReceiverHandlers(interaction: CommandInteraction,
    connection: VoiceConnection,
    client: Client,
    recordable: Set<Snowflake>) {
    await entersState(connection, VoiceConnectionStatus.Ready, 20e3);
    const receiver = connection.receiver;
    receiver.speaking.on('start', (userId: string) => {
        if (recordable.has(userId)) {
            createListeningStream(receiver, userId, interaction.guild!, client.users.cache.get(userId))
        }
    });
}