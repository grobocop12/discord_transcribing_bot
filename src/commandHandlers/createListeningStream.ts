import { EndBehaviorType, VoiceReceiver } from "@discordjs/voice";
import { Guild, GuildChannel, TextChannel, User } from "discord.js";
import { createWriteStream, unlinkSync, PathLike } from 'fs';
import { pipeline } from "stream";
import { opus } from 'prism-media';
import { findRecordsChannel } from "../create_channel";

function getDisplayName(userId: string, user?: User) {
    return user ? `${user.username}_${user.discriminator}` : userId;
}

export function createListeningStream(receiver: VoiceReceiver, userId: string, guild: Guild, user?: User) {
    const channel = findRecordsChannel(guild) as TextChannel;
    const opusStream = receiver.subscribe(userId, {
        end: {
            behavior: EndBehaviorType.AfterSilence,
            duration: 100
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
    const filename = `./records/${Date.now()}-${getDisplayName(userId, user)}.ogg`;
    const out = createWriteStream(filename);
    pipeline(
        opusStream,
        oggStream,
        out,
        (error) => {
            if (error) {
                console.warn(error);
            } else {
                channel.send({
                    files: [filename]
                }).then(() => {
                    unlinkSync(filename as PathLike);
                });
            }
        }
    );

}
