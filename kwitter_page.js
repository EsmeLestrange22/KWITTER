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

user_name = localStorage.getItem("un1");
room_name = localStorage.getItem("r_n");

function send() {
    i_message = document.getElementById("msg").value;
    if (i_message == "") {
        document.getElementById("msg").value = "Type something first"

    } else {
        firebase.database().ref(room_name).push({
            name: user_name,
            message: i_message,
            like: 0
        })
        document.getElementById("msg").value = "";
    }
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("oput").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
var name= message_data['name']
message= message_data['message'] 
like= message_data['like'] 

name_var= "<h4>" +name+ "<img class= 'user_tick' src= 'tick.png'> </h4>";
name_message= "<h4 class= 'message_h4'>" +message+ "</h4>";
firebase_btn= "<button class= 'btn btn-warning' id= "+firebase_message_id+" value= "+like+" onclick= 'update_like(this.id)'>"
span_tag= "<span class= 'glyphicon glyphicon-thumbs-up'> Like:" +like+ "</span> </button> <hr>"
row= name_var+name_message+firebase_btn+span_tag;
document.getElementById("oput").innerHTML += row;

            }
        });
    });
}
getData();
function logout() {
    localStorage.removeItem("r_n");
    localStorage.removeItem("un1");
    window.location= "kwitter.html";
  }
  function update_like(message_id) {
button_id= message_id;
likes= document.getElementById(button_id).value;
likes_in_number= Number(likes) + 1;
 firebase.database().ref(room_name).child(message_id).update({
     like: likes_in_number
 })
  }