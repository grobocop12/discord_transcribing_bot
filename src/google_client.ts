import { SpeechClient } from '@google-cloud/speech';
import { google } from '@google-cloud/speech/build/protos/protos';

const encoding = 'OGG_OPUS';
const sampleRateHertz = 48000;
const languageCode = 'pl-PL';

export const googleRequestConfig : google.cloud.speech.v1.IRecognitionConfig = {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
    audioChannelCount: 2,
    enableSeparateRecognitionPerChannel: true,
};

export const googleClient = new SpeechClient({
    keyFilename: "./config/google-credentials.json"
});