import * as FileSystem from 'expo-file-system';

const SECRET_APP_KEY = process.env.SECRET_APP_KEY
const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL

export async function getSpeechTranslation({recordingUri}) {
  const formData = new FormData();
  formData.append('file', {
    uri: recordingUri,
    type: 'audio/x-wav',
    name: 'file'
  });

  const url = `${BACKEND_URL}/translate-speech`
  const options = {
    method: "POST",
    headers: {
      "X-SECRET-APP-KEY": SECRET_APP_KEY
    },
    body: formData
  }

  const result = await (await fetch(url, options)).json()

  return result
}
