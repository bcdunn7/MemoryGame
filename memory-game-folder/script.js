const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    //set isClicked boolean to false
    newDiv.isClicked = false;
    newDiv.isMatched = false;

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
    // console.log("you just clicked", event.target);
  
  //catch for 'isMatched'
  if (event.target.isMatched === false){

  //Initializing a clickedCounter
  let clickedCounter = 0

  //loop through divs to check if two have been clicked
  const colorDivs = document.querySelectorAll('div div');
  let colorDivsArray = Array.from(colorDivs);
    // console.log (colorDivsArray);
  for (let i = 0; i < colorDivsArray.length; i++){
    if(colorDivsArray[i].isClicked === true){
      clickedCounter++;
    }
  }

  //User can only click 2 at 1 time (clicking the first one)
  if (clickedCounter === 0){
    //finding and revealing color
    event.target.style.backgroundColor = event.target.classList[0];

    //Toggle 'selected/clicked' boolean
    event.target.isClicked = true;
      // console.log(event.target, "is clicked:", event.target.isClicked);
  }

  //User can only click 2 at 1 time (clicking the second)
  if (clickedCounter === 1){
    //finding and revealing color
    event.target.style.backgroundColor = event.target.classList[0];

    //Toggle 'selected/clicked' boolean
    event.target.isClicked = true;
      // console.log(event.target, "is clicked:", event.target.isClicked);
    
    //Compare two clicked divs
    // console.log(event.target.classList[0]);

      //find which divs are clicked
        let isClickedIndex = [];
        for (i=0; i < colorDivsArray.length; i++){
          if (colorDivsArray[i].isClicked === true){
            isClickedIndex.push(i);
          }
        }

      //Compare
        let index1 = isClickedIndex[0];  
        let index2 = isClickedIndex[1];
        let div1 = colorDivsArray[index1];
        let div2 = colorDivsArray[index2];
          // console.log(div1, div2);
      if (div1.classList[0] === div2.classList[0]){
          console.log("match!");
        div1.isMatched = true;
        div2.isMatched = true;
        div1.isClicked = false;
        div2.isClicked = false;
      }
      if (div1.classList[0] !== div2.classList[0]){
        setTimeout(function() {
          div1.style.backgroundColor = '';
          div2.style.backgroundColor = '';
          div1.isClicked = false;
          div2.isClicked = false;
        }, 1000)
      }
  }
  //game over alert
  let isMatchedCount = 0
  for (let i=0; i < colorDivsArray.length; i++){
    if (colorDivsArray[i].isMatched === true){
      isMatchedCount++;
    }
    if (isMatchedCount === colorDivsArray.length){
      setTimeout(function () {alert('You won!!')}, 200);
    }
  }
}
}

// when the DOM loads
createDivsForColors(shuffledColors);