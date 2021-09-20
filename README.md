# Discord Transcribing Bot
This bot can join voice channels on discord and transcribe audio from voice channel using Google-Cloud Speech-To-Text API. Transciptions are published on dedicated text channel.
This is a modified version of Recorder bot from discordjs/voice repository: https://github.com/discordjs/voice/tree/main/examples/recorder.

## Configuration
Bot application requires scopes: 
* **bot**
* **applications.commands**

and **Administrator** permission.

Before running the bot a config.json file should be created in config directory. The file should contain a bot token.

```
{
    "token": "<YOUR_TOKEN_GOES_HERE>"
}
```

Config directory should also contain a JSON key file from google cloud named "google-credentials.json"

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
Leaves the voice channel. Works only if user sending this command and bot are connected to the same voice channel.

### Transcribe
```
/transcribe <USER>
```
Starts transcription of indicated user.

### Stop transcribing
```
/stop_transcribing <USER>
```
Stops transcription of indicated user.

```
/stop_transcribing_all
```
Stops transcription of  all users.
