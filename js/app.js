// Google OAuth2
function onSuccess(googleUser) {
  console.log("Usuário logado: " + googleUser.getBasicProfile().getName());
}

function onFailure(error) {
  console.log(error);
}

gapi.load("auth2", function () {
  gapi.auth2.init();
  const googleButton = document.getElementById("googleBtn");
  googleButton.addEventListener("click", function () {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signIn().then(onSuccess).catch(onFailure);
  });
});

// function handleCredentialResponse(response) {
//     // Decodifica o token JWT
//     const responsePayload = parseJwt(response.credential);
//     console.log('Decoded JWT:', responsePayload);

//     // Obtém as informações do usuário
//     const profilePicUrl = responsePayload.picture;
//     const userName = responsePayload.name;
//     const userEmail = responsePayload.email;

//     // Atualiza os elementos da interface com as informações do usuário
//     document.getElementById('profile-pic').src = profilePicUrl;
//     document.getElementById('user-name').innerText = userName;
//     document.getElementById('user-email').innerText = userEmail;

//     // Mostra a div com as informações do usuário
//     document.getElementById('user-info').style.display = 'block';

//     // Redireciona o usuário após 2 segundos (2000 ms)
//     setTimeout(() => {
//         window.location.href = 'inicio.html'; // Altere para a página de redirecionamento desejada
//     }, 2000);
// }

// // Função para decodificar o token JWT
// function parseJwt(token) {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     return JSON.parse(window.atob(base64));
// }

function handleCredentialResponse(response) {
    // Decodifica o token JWT
    const responsePayload = parseJwt(response.credential);
    console.log('Decoded JWT:', responsePayload);

    // Obtém as informações do usuário
    const profilePicUrl = responsePayload.picture;
    const userName = responsePayload.name;
    const userEmail = responsePayload.email;

    // Armazena os dados no localStorage
    localStorage.setItem('profilePic', profilePicUrl);
    localStorage.setItem('userName', userName);
    localStorage.setItem('userEmail', userEmail);

    // Mostra a div com as informações do usuário
    document.getElementById('user-info').style.display = 'block';

    // Redireciona o usuário após 2 segundos (2000 ms)
    setTimeout(() => {
        window.location.href = 'inicio.html'; // Altere para a página de redirecionamento desejada
    },);
}

// Função para decodificar o token JWT
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
}