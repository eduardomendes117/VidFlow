const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  'YOUR_CLIENT_ID',
  'YOUR_CLIENT_SECRET',
  'YOUR_REDIRECT_URL'
);

// Gerar URL de autenticação
const scopes = [
  'https://www.googleapis.com/auth/youtube.upload',
  'https://www.googleapis.com/auth/youtube'
];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes
});

// Após o usuário autorizar, você receberá um código
// Troque o código por um token de acesso
oauth2Client.getToken(code, (err, tokens) => {
  if (err) {
    console.error('Error getting oAuth tokens: ', err);
    return;
  }
  oauth2Client.setCredentials(tokens);
});


// Enviar o video 
const fs = require('fs');
const { google } = require('googleapis');
const youtube = google.youtube('v3');

async function uploadVideo(auth) {
  const youtube = google.youtube({ version: 'v3', auth });
  
  const res = await youtube.videos.insert({
    part: 'snippet,status',
    requestBody: {
      snippet: {
        title: 'Título do Vídeo',
        description: 'Descrição do Vídeo',
        tags: ['tag1', 'tag2'],
        categoryId: '22', // Categoria do YouTube (22 = People & Blogs, por exemplo)
      },
      status: {
        privacyStatus: 'public' // Pode ser 'private' ou 'unlisted'
      }
    },
    media: {
      body: fs.createReadStream('caminho/para/o/video.mp4')
    }
  });

  console.log('Video ID: ', res.data.id);
}

// Chame a função após a autenticação
uploadVideo(oauth2Client);