import { EndBehaviorType, VoiceReceiver } from "@discordjs/voice";
import { Guild, GuildChannel, TextChannel, User } from "discord.js";
import { createWriteStream, readFileSync, unlinkSync, PathLike, WriteStream } from 'fs';
import { pipeline, Writable } from "stream";
import { opus } from 'prism-media';
import { findRecordsChannel } from "../create_channel";
import { AudioStringWritable } from "../audioWriteStream";
import { googleClient, googleRequestConfig } from "../googleClient";
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
    const out = new AudioStringWritable();
    out.on('finish', async () => {
        googleClient.recognize({
            config: googleRequestConfig as google.cloud.speech.v1.IRecognitionConfig,
            audio: {
                content: out.encodeBuffersToBase64()
            }
        })
            .then((response) => {
                const result = response[0];
                const alternatives = result.results?.flatMap(result => result.alternatives);
                if(alternatives && alternatives?.length > 0) {
                    channel.send(`${user?.username}: ${alternatives[0]?.transcript}`);
                }
            })
            .catch(reason => {
                console.error(reason)
            });
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
