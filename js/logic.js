
$(document).ready(function() {

  var config = {
    apiKey: "AIzaSyCJ-ik74QQ1NOGZZPSy9zLbIGOgOdulooc",
    authDomain: "train-schedule-fcbd9.firebaseapp.com",
    databaseURL: "https://train-schedule-fcbd9.firebaseio.com",
    projectId: "train-schedule-fcbd9",
    storageBucket: "train-schedule-fcbd9.appspot.com",
    messagingSenderId: "731890395072"
  };
  firebase.initializeApp(config);
var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainTime = moment($("#time-input").val().trim(), "HH:mm").format("X");;
  var trainFrequency = $("#frequency-input").val().trim();

  var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: trainTime,
    frequency: trainFrequency
  };
 
  database.ref().push(newTrain);
 
  alert("Train successfully added");
  
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");

});

 
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  var dataName = childSnapshot.val().name;
  var dataDestination = childSnapshot.val().destination;
  var dataTime = childSnapshot.val().time;
  var dataFrequency = childSnapshot.val().frequency;

  //Time Stuff
  var now = moment();
  var diffTime = now.diff(moment.unix(dataTime), "minutes");
  var timeRemainder = now.diff(moment.unix(dataTime), "minutes") % dataFrequency ;
  var minutesAway = dataFrequency - timeRemainder;
  var nextTrain = now.add(minutesAway, "m").format("hh:mm A"); 

  //Update dom
  $("#train-table > tbody").append("<tr><td>" + dataName + "</td><td>" + dataDestination + "</td><td>" +
  dataFrequency + "</td><td>" + nextTrain + "</td><td>" + minutesAway + "</td></tr>");
});

});

