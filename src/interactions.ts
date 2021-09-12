import { Client, CommandInteraction, Snowflake } from "discord.js";
import { join } from "./join";
import { leave } from "./leave";
import { record } from "./record";
import { stopRecording } from "./stopRecording";

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