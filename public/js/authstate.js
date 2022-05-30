// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
    /* console.log('user logged in: ', user);
    Materialize.toast("user logged in: ", user); */
    document.getElementById("accountDetails").innerHTML = user.email;
    } else {
      console.log('user logged out');
      Materialize.toast("user logged out", 4000);// 4000 is the duration of the toast
    }
  })
 // logout
 const logout = document.querySelector('#logout');
 logout.addEventListener('click', (e) => {
   auth.signOut();
   window.location = '../index.html'; 
 });  