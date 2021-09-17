import { EndBehaviorType, VoiceReceiver } from "@discordjs/voice";
import { Guild, TextChannel, User } from "discord.js";
import { pipeline } from "stream";
import { opus } from 'prism-media';
import { findRecordsChannel } from "../create_channel";
import { BufferToBase64Encoder } from "../buffet_to_base64_encoder";
import { googleClient, googleRequestConfig } from "../google_client";
import { google } from "@google-cloud/speech/build/protos/protos";

export function createListeningStream(receiver: VoiceReceiver, userId: string, guild: Guild, user?: User) {
    const channel = findRecordsChannel(guild) as TextChannel;
    const opusStream = receiver.subscribe(userId, {
        end: {
            behavior: EndBehaviorType.AfterSilence,
            duration: 150
        }
    });
    const oggStream = new opus.OggLogicalBitstream({
        opusHead: new opus.OpusHead({
            channelCount: 2,
            sampleRate: 48000,
        }),
        pageSizeControl: {
            maxPackets: 1000,
        },
    });
    const out = new BufferToBase64Encoder();
    out.on('finish', async () => {
        transcriptAndSendToChannel(channel, out, user);
    })
    pipeline(
        opusStream,
        oggStream,
        out,
        (error) => {
            if (error) {
                console.warn(error);
            }
        }
    );

}

function transcriptAndSendToChannel(channel: TextChannel, out: BufferToBase64Encoder, user?: User) {
    googleClient.recognize({
        config: googleRequestConfig as google.cloud.speech.v1.IRecognitionConfig,
        audio: {
            content: out.encodeBuffersToBase64()
        }
    })
        .then((response) => {
            const result = response[0];
            const alternatives = result.results?.flatMap(result => result.alternatives);
            if (alternatives && alternatives?.length > 0) {
                channel.send(`${user?.username.toUpperCase()}:\n${alternatives[0]?.transcript?.toLowerCase()}`);
            }
        })
        .catch(reason => {
            console.error(reason)
        });
}
