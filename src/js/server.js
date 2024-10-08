// Recupera os dados do localStorage
const picture = localStorage.getItem("profilePic");
const userName = localStorage.getItem("userName");
const userEmail = localStorage.getItem("userEmail");

// Atualiza os elementos da interface com as informações do usuário
document.getElementById("profile-pic").src = picture;
document.getElementById("user-name").innerText = userName;
document.getElementById("user-email").innerText = userEmail;