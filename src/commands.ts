import { Guild } from 'discord.js';

export const commands = async (guild: Guild) => {
    await guild.commands.set([
        {
            name: 'join',
            description: 'Joins the voice channel that you are in.'
        },
        {
            name: 'leave',
            description: 'Leaves the voice channel.'
        },
        {
            name: 'transcribe',
            description: 'Enables transcribing of a user.',
            options: [
                {
                    name: 'speaker',
                    type: 'USER' as const,
                    description: 'The user to transcribe.',
                    required: true,
                },
            ],
        },
        {
            name: 'stop_transcribing',
            description: 'Disables transcribing of a user.',
            options: [
                {
                    name: 'speaker',
                    type: 'USER' as const,
                    description: 'The user to not transcribe.',
                    required: true,
                },
            ],
        },
        {
            name: 'stop_transcribing_all',
            description: 'Disables transcribing of all users.'
        }
    ])
}