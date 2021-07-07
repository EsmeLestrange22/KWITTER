var firebaseConfig = {
  apiKey: "AIzaSyB1QhaytrdyeQtzt79FBf0IEmce1-l42cY",
  authDomain: "kwitter-d5304.firebaseapp.com",
  databaseURL: "https://kwitter-d5304-default-rtdb.firebaseio.com",
  projectId: "kwitter-d5304",
  storageBucket: "kwitter-d5304.appspot.com",
  messagingSenderId: "1027022484766",
  appId: "1:1027022484766:web:def2e94f52b8b3a233450f",
  measurementId: "G-8E30R26KFJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig); //firebase linked

var user_name = localStorage.getItem("un1");
document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom() {
  name_r = document.getElementById("iput").value;
  firebase.database().ref("/").child(name_r).update({
    

  });
  localStorage.setItem("r_n", name_r);
  window.location = "kwitter_page.html"

}

function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("trending_r").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      Room_names = childKey;
      console.log("Room Name - " + Room_names);
      
      //row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
      row= "<div class= 'room_name' id= "+Room_names+" onclick= 'redirect_to_room_name(this.id)'>"+Room_names+ "</div> <hr>" 
      document.getElementById("trending_r").innerHTML += row;
    });
  });

}

getData();

function redirect_to_room_name(name) {
  localStorage.setItem("r_n", name);
  window.location = "kwitter_page.html"
}

function logout() {
  localStorage.removeItem("r_n");
  localStorage.removeItem("un1");
  window.location= "kwitter.html";
}