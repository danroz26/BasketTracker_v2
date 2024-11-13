var MissedBaskets = 0;
var MadeBaskets = 0;
var Percentage = 0;
//Classifier Variable
let classifier;
// Model URL
// let imageModelURL = 'https://teachablemachine.withgoogle.com/models/ux_wTI7c4/';
  
  // Video
  let video;
  // To store the classification
  let label = "waiting...";

  // Load the model first
  function preload() {
    classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/dLqGPT09w/model.json');
  }

  function setup() {
    createCanvas(320, 260);
    // Create the video
    video = createCapture(VIDEO);
    video.size(320, 240);
    video.hide();

    // flippedVideo = ml5.flipImage(video);
    // Start classifying
    classifyVideo();
  }

//This gives us the results of the image/video
function classifyVideo() {
  classifier.classify(video, gotResults);
  //flipVideo = ml5.flipImage(video);
}

function gotResults(error, results) {
  // If something goes wrong with the program, it will restart
  if (error) {
    console.error(error);
    return;
  }
  
 //Whatever label the computer is most confident it is will be displayed
    label = results[0].label;
  
  if (MissedBaskets >= 10 ) {
    setProperty("DISPLAYSCREEN", "background-color", "red");
  }
  else if (MissedBaskets >= 7  ) {
    setProperty("DISPLAYSCREEN", "background-color", "orange");
  }
  else if (MissedBaskets >=  5 ) {
    setProperty("DISPLAYSCREEN", "background-color", "blue");
  }
  else if (MissedBaskets >= 0 ) {
    setProperty("DISPLAYSCREEN", "background-color", "green");
  }

  if (MadeBaskets === 1 ) { 
    playSound ("100, 200");
  }

  Percentage = MadeBaskets/(MadeBaskets+MissedBaskets);

  if (MadeBaskets + MissedBaskets === 12){
    Percentage = (MadeBaskets/12)*100;
  }
  
  //This classifies the video in a loop
  classifyVideo();
  runTeachable();
}

//When the key is pressed, the snake moves in a different direction
function runTeachable(){
  
      if (label == "Miss") {
      MissedBaskets = MissedBaskets + 1;
    }
    if (label == "Make") {
      MadeBaskets = MadeBaskets + 1;
    }

}

function draw() {
 //The background color and the scale
  background(220);
  
  // Start a new drawing state
  push();
  
  // display flipped video on screen
  translate(width,0);
  scale(-1, 1);
  image(video,0,0);
  
  
  pop(); // Restore original state
  

  //The text that shows the label
  textSize(32);
  fill(0);
  text(label, 10, 50);
}



onEvent("button1", "click", function( ) {
  setScreen ("DISPLAYSCREEN");
});
onEvent("GETRESULTS1", "click", function( ) {
  setText("label2", "you have made " +MadeBaskets+ " baskets");
});
onEvent("GETRESULTS2", "click", function( ) {
  setText("label6", "you have taken " +MadeBaskets + MissedBaskets+ " shots");
});
onEvent("GETRESULTS3", "click", function( ) {
  setText("label7", "your shot percentage is " +Percentage );
});