let btnYoutube = document.getElementById("btnYoutube");
btnYoutube.addEventListener("click", initClient);

// Definir variáveis para o cliente e API
const clientID =
  "839385603142-i6vdv0tqupvv4luhb05hpah2pf6ilgo8.apps.googleusercontent.com";
const API_KEY = "AIzaSyDcGUGt1axg44Mqqo4cdnyfPDVvWQ3Ah08";
const scopes = "https://www.googleapis.com/auth/youtube.upload";
const token = '';

// Função de inicialização da API do YouTube
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

function initClient() {
  gapi.client.init({
      clientId: clientID,
      scope: scopes,
  }).then(function () {
      // Botão de login
      btnYoutube.addEventListener('click', handleAuthClick);
  });
}

// Função para lidar com o clique no botão
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn().then(function() {
      // Login bem-sucedido, atualiza o texto do botão
      event.target.textContent = 'Conectado';
      // Habilita o upload de vídeos (implementação não mostrada aqui)
      enableVideoUpload();
  });
}