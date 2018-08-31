//onload = () => {
var user = {};
firebase.initializeApp({
  apiKey: "AIzaSyC8QjGyRqbr7BLDUvnh5jXj9Qs5s0W6khA",
  authDomain: "school-project-9de98.firebaseapp.com",
  databaseURL: "https://school-project-9de98.firebaseio.com",
  projectId: "school-project-9de98",
  storageBucket: "school-project-9de98.appspot.com",
  messagingSenderId: "282439850540"
});
user.db = firebase.firestore();
onload = () => {
  if (localStorage.getItem('user-id') != undefined) {
    document.getElementById('login').style.display = 'none';
    let interval = setInterval(()=> {
      let signedIn = signin();
      if(signedIn){
        add();
        clearInterval(interval)
      }
    },1000)
  }
}
function signin() {
  // Get id and check if database/users/{id} is true
  let ID = document.getElementById('id').value;
  if (localStorage.getItem('user-id') != undefined) {
    ID = localStorage.getItem('user-id')
  }
  let REF = user.db;
  user.mainDirectory = '/users/' + ID;
  user.id = ID;
  REF.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach(doc => {
      console.log(doc.id, " => ", doc.data());
      (doc.id == ID) ? user.valid = true : '';
    });
  });
  if (user.valid) {
    console.log('Sign in succesfull');
    localStorage.setItem('user-id', ID);
    document.getElementById('login').style.display = 'none';
  } else {
    console.log('Sign in failed, unknown user');
  }
  return user.valid;
}

// Creates new tasks
function send() {
  if (n.value !== '' && txt.value !== '') {
    let msg = txt.value;
    document.getElementById('txt').value = '';
    document.getElementById('n').value = '';
    user.db.collection('users').doc(user.id).collection('tasks').add({
      message: msg
    }).key;
  }
}

// Deletes data (Not completed)
function del(theDataToAdd) {
  usersRef.child(theDataToAdd).once('value', function (snapshot) {
    if (snapshot.exists()) {
      alert('exists');
    }
  });
}

// LIsts the tasks into the visible list
function add() {
  let tabl = document.getElementById('out');
  document.getElementById('out').innerHTML = "";
  user.db.collection("users").doc(user.id).collection('tasks').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      tabl.innerHTML += '<br>' + doc.data().message + '<hr>';
    });
  });
}
//}