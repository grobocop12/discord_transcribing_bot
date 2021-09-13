import { Client, CommandInteraction, Snowflake } from "discord.js";
import { join } from "./commandHandlers/join";
import { leave } from "./commandHandlers/leave";
import { record } from "./commandHandlers/record";
import { stopRecording } from "./commandHandlers/stopRecording";
import { stopRecordingAll } from "./commandHandlers/stopRecordingAll";


export const interactionHandlers = new Map<
    string,
    (
        interaction: CommandInteraction,
        client: Client,
        recordable?: Set<Snowflake>
    ) => Promise<void>
>();

interactionHandlers.set('join', join);
interactionHandlers.set('leave', leave);
interactionHandlers.set('record', record);
interactionHandlers.set('stop_recording', stopRecording);
interactionHandlers.set('stop_recording_all', stopRecordingAll);