# Discord Voice recording bot
This bot can join voice channels on discord and record users. Recorded files are send to dedicated text channel. This is a modified version of Recorder bot from discordjs/voice repository: https://github.com/discordjs/voice/tree/main/examples/recorder.

## Configuration
Before running the bot a config.json file should be created in directory src/config. The file should contain a bot token.

```
{
    "token": "<YOUR_TOKEN_GOES_HERE>"
}
```

## Usage
Bot has following commands:

### Join
```
/join
```
Joins the voice channel. Works only if user sending this command is connected to voice channel.

### Leave
```
/leave
```
Leaves the voice channel.  Works only if user sending this command and bot are connected to the same voice channel.

### Record
```
/record <USER>
```
Starts recording indicated user.

### Stop recording
```
/stop_recording <USER>
```
Stops recording indicated user.

```
/stop_recording_all
```
Stops recording all users.
