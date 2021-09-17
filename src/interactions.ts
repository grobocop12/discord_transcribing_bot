import { Client, CommandInteraction, Snowflake } from "discord.js";
import { join } from "./commandHandlers/join";
import { leave } from "./commandHandlers/leave";
import { transcribe } from "./commandHandlers/transcribe";
import { stopTranscribing } from "./commandHandlers/stop_transcribing";
import { stopTranscribingAll } from "./commandHandlers/stop_transcribing_all";


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
interactionHandlers.set('transcribe', transcribe);
interactionHandlers.set('stop_transcribing', stopTranscribing);
interactionHandlers.set('stop_transcribing_all', stopTranscribingAll);