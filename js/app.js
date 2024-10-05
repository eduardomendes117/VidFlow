// Google OAuth2
function handleCredentialResponse(response) {
  // Decodifica o token JWT
  const data = jwt_decode(response.credential);
  console.log(data);

  // Obtém as informações do usuário
  const picture = data.picture;
  // const userName = data.name;
  // const userEmail = data.email;

  // Armazena os dados no localStorage
  localStorage.setItem("profilePic", picture);
  // localStorage.setItem("userName", userName);
  // localStorage.setItem("userEmail", userEmail);

  // Redireciona o usuário após 2 segundos (2000 ms)
  setTimeout(() => {
    window.location.href = "http://localhost:5500/pages/inicio.html"; // Altere para a página de redirecionamento desejada
  }, 2000);
}

window.onload = function () {
  google.accounts.id.initialize({
    client_id:
      "839385603142-i6vdv0tqupvv4luhb05hpah2pf6ilgo8.apps.googleusercontent.com",
    callback: handleCredentialResponse,
  });

  google.accounts.id.renderButton(
    document.getElementById("googleBtn"),
    {
      type: "standard",
      theme: "outline",
      text: "signin_with",
      size: "large",
      logo_alignment: "left",
      width: "312px",
    } // customization attributes
  );
  google.accounts.id.prompt(); // also display the One Tap dialog
};
