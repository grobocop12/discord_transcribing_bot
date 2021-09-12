import { Guild } from 'discord.js';

export const commands = async (guild: Guild) => {
    await guild.commands.set([
        {
            name: 'join',
            description: 'Joins the voice channel that you are in'
        },
        {
            name: 'leave',
            description: 'Leaves the voice channel.'
        },
        {
            name: 'record',
            description: 'Enables recording for a user',
            options: [
                {
                    name: 'speaker',
                    type: 'USER' as const,
                    description: 'The user to record',
                    required: true,
                },
            ],
        },
        {
            name: 'stop_recording',
            description: 'Deletes all users from list of recordable users.'
        }
    ])
}