import { Client, CommandInteraction, Snowflake } from "discord.js";
import { join } from "./join";
import { leave } from "./leave";

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