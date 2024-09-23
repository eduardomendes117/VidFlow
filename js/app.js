const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

// Configurar OAuth2
const oauth2Client = new OAuth2(
  YOUR_CLIENT_ID,
  YOUR_CLIENT_SECRET,
  YOUR_REDIRECT_URL
);

// Função para fazer upload
async function uploadVideo(auth, videoPath, title, description) {
  const service = google.youtube('v3');
  const videoFile = fs.createReadStream(videoPath);

  const res = await service.videos.insert({
    auth: auth,
    part: 'snippet,status',
    requestBody: {
      snippet: {
        title: title,
        description: description,
      },
      status: {
        privacyStatus: 'public',
      },
    },
    media: {
      body: videoFile,
    },
  });

  console.log('Video Uploaded', res.data);
}
