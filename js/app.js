// Google OAuth2
function onSuccess(googleUser) {
    console.log('Usuário logado: ' + googleUser.getBasicProfile().getName());
  }

  function onFailure(error) {
    console.log(error);
  }

  gapi.load('auth2', function() {
    gapi.auth2.init();
    const googleButton = document.getElementById('googleBtn');
    googleButton.addEventListener('click', function() {
      const auth2 = gapi.auth2.getAuthInstance();
      auth2.signIn().then(onSuccess).catch(onFailure);
    });
  });