// signup
const signupForm = document.querySelector('#signup-form');


signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;
  
 

 

  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {

    // close the signup modal & reset form
        $('.modal').modal('close');
        signupForm.reset();
        Materialize.toast("user registered succesfully")
  }).catch(function(error){
    
    Materialize.toast("Error: make sure email is valid and password contains more the six characters of mixed alphabet ")
  
  });
});


// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;
  const projectCode = loginForm['project-code'].value;

  sessionStorage.setItem('code',projectCode);

  // log the user in
  auth.signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var error = error.message;
    console.log(error.Message);
    Materialize.toast("error: password or email invalid")

});

//Handle Account Status
firebase.auth().onAuthStateChanged(user => {
    if(user) {
      const docRef = firestore.collection("users").doc(user.uid);

      const name = document.querySelector('#signup-name');
      const user_name = name.value;
      docRef.set({
        email:user.emai,
        name: user_name,
        email:user.email
      })
      window.location.href = './pages/questionnair.html'; //After successful login, user will be redirected to home.html    
    }
  });

});
