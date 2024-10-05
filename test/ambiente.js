let GoogleAuth = "https://accounts.google.com/gsi/client";
const SCOPE = "https://www.googleapis.com/auth/youtube.upload";

function initClient() {
  gapi.client
    .init({
      apiKey: "AIzaSyDcGUGt1axg44Mqqo4cdnyfPDVvWQ3Ah08", // Sua API key
      clientId:
        "839385603142-i6vdv0tqupvv4luhb05hpah2pf6ilgo8.apps.googleusercontent.com", // Seu client ID
      scope: SCOPE,
      discoveryDocs: [
        "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest",
      ],
    })
    .then(() => {
      GoogleAuth = gapi.auth2.getAuthInstance();

      // Verifica o estado de login
      GoogleAuth.isSignedIn.listen(updateSigninStatus);
      updateSigninStatus(GoogleAuth.isSignedIn.get());

      document.getElementById("login-button").onclick = handleAuthClick;
      document.getElementById("upload-form").onsubmit = handleUpload;
    });
}

// Função para gerenciar o login do usuário
function handleAuthClick() {
  GoogleAuth.signIn();
}

// Atualiza o estado de login e mostra o formulário de upload se o usuário estiver autenticado
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    document.getElementById("login-button").style.display = "none";
    document.getElementById("upload-form").style.display = "block";
  } else {
    document.getElementById("login-button").style.display = "block";
    document.getElementById("upload-form").style.display = "none";
  }
}

// Função de upload com acompanhamento de progresso
function handleUpload(event) {
  event.preventDefault();

  const fileInput = document.getElementById("video");
  const file = fileInput.files[0];
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  if (!file) {
    alert("Por favor, selecione um vídeo!");
    return;
  }

  const metadata = {
    snippet: {
      title: title,
      description: description,
      categoryId: "22", // Categoria do vídeo
    },
    status: {
      privacyStatus: "public", // Privacidade do vídeo
    },
  };

  const uploader = new MediaUploader({
    baseUrl: "https://www.googleapis.com/upload/youtube/v3/videos",
    file: file,
    token: gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse()
      .access_token,
    metadata: metadata,
    params: {
      part: "snippet,status",
    },
    onProgress: onProgress,
    onComplete: onComplete,
    onError: onError,
  });

  uploader.upload();
}

// Função para mostrar o progresso do upload
function onProgress(event) {
  const progress = Math.round((event.loaded * 100) / event.total);
  document.getElementById("progress-container").style.display = "block";
  document.getElementById("progress-bar").value = progress;
  document.getElementById("progress-percent").textContent = `${progress}%`;
}

// Função para lidar com a conclusão do upload
function onComplete(response) {
  alert("Upload completo! ID do vídeo: " + JSON.parse(response).id);
}

// Função para lidar com erros no upload
function onError(error) {
  console.error("Erro no upload: ", error);
  alert("Erro ao fazer upload do vídeo.");
}

// Inicializar a Google API Client
function handleClientLoad() {
  gapi.load("client:auth2", initClient);
}

// Script de upload de mídia
class MediaUploader {
  constructor(options) {
    const noop = () => {};
    this.file = options.file;
    this.contentType =
      options.contentType || this.file.type || "application/octet-stream";
    this.metadata = options.metadata || {};
    this.token = options.token;
    this.onComplete = options.onComplete || noop;
    this.onProgress = options.onProgress || noop;
    this.onError = options.onError || noop;
    this.url =
      options.baseUrl + "?" + new URLSearchParams(options.params).toString();
  }

  upload() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", this.url, true);
    xhr.setRequestHeader("Authorization", "Bearer " + this.token);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

    xhr.upload.addEventListener("progress", this.onProgress);
    xhr.onload = () => {
      if (xhr.status === 200) {
        this.onComplete(xhr.responseText);
      } else {
        this.onError(xhr.responseText);
      }
    };
    xhr.onerror = () => this.onError(xhr.responseText);

    const formData = new FormData();
    formData.append(
      "metadata",
      new Blob([JSON.stringify(this.metadata)], { type: "application/json" })
    );
    formData.append("file", this.file);

    xhr.send(formData);
  }
}
