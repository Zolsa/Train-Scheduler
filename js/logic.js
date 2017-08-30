/* global firebase moment */
// Steps to complete:
// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed
// 1. Initialize Firebase
$(document).ready(function() {



  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCJ-ik74QQ1NOGZZPSy9zLbIGOgOdulooc",
    authDomain: "train-schedule-fcbd9.firebaseapp.com",
    databaseURL: "https://train-schedule-fcbd9.firebaseio.com",
    projectId: "train-schedule-fcbd9",
    storageBucket: "train-schedule-fcbd9.appspot.com",
    messagingSenderId: "731890395072"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();


// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();
  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainTime = moment($("#time-input").val().trim(), "HH:mm").format("X");;
  var trainFrequency = $("#frequency-input").val().trim();
  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: trainTime,
    frequency: trainFrequency
  };
 
  database.ref().push(newTrain);
 
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);
 
  alert("Train successfully added");
  
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");

  var now = moment();
  var timeMin = now.hour() * 60 + now.minutes();
  console.log(timeMin);
  console.log(trainTime.split(":"));


});

 
// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
  // Store everything into a variable.
  var dataName = childSnapshot.val().name;
  var dataDestination = childSnapshot.val().destination;
  var dataTime = childSnapshot.val().time;
  var dataFrequency = childSnapshot.val().frequency;

  var now = moment();

  var diffTime = now.diff(moment.unix(dataTime), "minutes");
  var timeRemainder = now.diff(moment.unix(dataTime), "minutes") % dataFrequency ;
  var minutesAway = dataFrequency - timeRemainder;
  var nextTrain = now.add(minutesAway, "m").format("hh:mm A"); 

  console.log(diffTime);
  console.log(dataName);
  console.log(dataDestination);
  console.log(dataTime);
  console.log(dataFrequency);
  console.log(nextTrain);
  //Update
  $("#train-table > tbody").append("<tr><td>" + dataName + "</td><td>" + dataDestination + "</td><td>" +
  dataFrequency + "</td><td>" + nextTrain + "</td><td>" + minutesAway + "</td></tr>");
});


});

