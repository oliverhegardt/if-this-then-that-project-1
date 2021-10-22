
/* ----- Global Scope Variables ----- */

let christmasEve;
let now;
let timeBetweenNowAndChristmasMS;
let timeUntilChristmas;
let createli;
let createspan;
let closeX;


/* ----- Save to Local Storage ------*/

function saveDataToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

/* ----- Save / Get Local Storage ------*/

function getDataFromLocalStorage(key, value) {
  return localStorage.getItem(key, value);
}


/* ----- Save to Session Storage ------*/

function saveDataToSessionStorage(key, value) {
  sessionStorage.setItem(key, value);
}

/* ----- Get from Session Storage ------*/

function getDataFromSessionStorage(key, value) {
  return sessionStorage.getItem(key, value);
}


/* ----- Countdown Timer function, displays the countdown timer ------*/

function christmasCountdownTimer() {
  christmasEve = Date.parse("dec 24, 2021 00:00:01");
  now = new Date();
  timeBetweenNowAndChristmasMS = christmasEve - now;
  timeUntilChristmas = convertMS(timeBetweenNowAndChristmasMS)
  document.getElementById("countdown-timer").innerHTML = `
    <div class="time-box">${timeUntilChristmas.days} Days</div>''
    <div class="time-box">${timeUntilChristmas.hours} Hours</div>''
    <div class="time-box">${timeUntilChristmas.minutes} Minutes</div>''
    <div class="time-box">${timeUntilChristmas.seconds} Seconds</div>`;
}


/* ----- Setting an interval which updates the countdown timer every second ------*/

setInterval("christmasCountdownTimer()", 1000);

/* ----- function that converts milliseconds to: days, hours, minutes and seconds ------*/

function convertMS(milliseconds) {
  let days, hours, minutes, seconds;
  seconds = Math.floor(milliseconds / 1000);
  minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  days = Math.floor(hours / 24);
  hours = hours % 24;
  return { days: days, hours: hours, minutes: minutes, seconds: seconds }
}

/* ----- onlcik function, displaying time left to christmas from moment when clicked, 
         based on session storage  ------*/

function showTimeUntilChristmasLocalStorage() {
  saveDataToLocalStorage("Time Left in MS", timeBetweenNowAndChristmasMS);
  let getTimeFromLocalStorage = getDataFromLocalStorage("Time Left in MS", timeBetweenNowAndChristmasMS);
  timeUntilChristmas = convertMS(getTimeFromLocalStorage)
  document.getElementById("container-timeLeftLS").innerHTML = `<div class="countdown-design">
  According to Local Storage it is:
  <span class="hello">${timeUntilChristmas.days}</span> days
  <span class="hello">${timeUntilChristmas.hours}</span> hours
  <span class="hello">${timeUntilChristmas.minutes}</span> minutes
  <span class="hello">${timeUntilChristmas.seconds}</span> seconds left to Christmas.
  </div>`;
};

/* ----- onlcik function, displaying time left to christmas from moment when clicked, 
         based on session storage  ------*/

function showTimeUntilChristmasSessionStorage() {
  saveDataToSessionStorage("Time Left in MS", timeBetweenNowAndChristmasMS);
  getDataFromSessionStorage("Time Left in MS", timeUntilChristmas);
  timeUntilChristmas = convertMS(timeBetweenNowAndChristmasMS)
  document.getElementById("container-timeLeftSS").innerHTML = `<div class="countdown-design">
  According to Session Storage it is:
  <span class="hello">${timeUntilChristmas.days}</span> days
  <span class="hello">${timeUntilChristmas.hours}</span> hours
  <span class="hello">${timeUntilChristmas.minutes}</span> minutes
  <span class="hello">${timeUntilChristmas.seconds}</span> seconds left to Christmas.
  </div>`
}



document.addEventListener("DOMContentLoaded", getWish)

function closeWish() {
  var close = document.getElementsByClassName("close");
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var liWish = this.parentElement;
      liWish.remove()
      console.log(liWish)
      deleteLocalWishlist(liWish.childNodes[0].nodeValue)
      console.log(liWish.childNodes)


    }
  }
}

function closingElement() {
  createspan.className = "close"; //adds the class name to the span
  createspan.appendChild(closeX);
  createli.appendChild(createspan);
}


function addWish() {

  createli = document.createElement("li"); //creates the list item
  const inputValue = document.getElementById("new-item").value; //takes the value of what you are writing in the input
  const wishValue = document.createTextNode(inputValue); //creates a string of thext from what you write
  createspan = document.createElement("SPAN"); //creates the closing element
  closeX = document.createTextNode("\u00D7"); // creates the text inside the closing element

  createli.appendChild(wishValue); //adds ano ther line with te new stuff you have written
  if (inputValue === '') {
    alert("Don´t you wish for anything");
  } else {
    document.getElementById("wish-list").appendChild(createli); //adds the new wish to the list
  }
  saveLocalWishlist(inputValue);
  document.getElementById("new-item").value = ""; // resets the value to empty
}


function wishListMain() {
  addWish();
  closingElement();
  closeWish();
}


function saveLocalWishlist(wishlistInput) {//check if local storage is empty or if there allready is a wishlist, if its empty it will create array
  let wishlists;
  if (localStorage.getItem("wishlists") === null) {
    wishlists = []; //If there is an array we get it back from local storage
  } else {
    wishlists = JSON.parse(localStorage.getItem("wishlists"));//If there is an array its gonna push a new wish into it
  }
  wishlists.push(wishlistInput);//Then set it back to local storage
  localStorage.setItem("wishlists", JSON.stringify(wishlists));
}


function wishlistClearAll() {
  localStorage.clear();
}

function deleteLocalWishlist(wishListItem) {
  let wishlists;
  if (localStorage.getItem("wishlists") === null) { //check if local storage is empty or if there allready is a wishlist, if its empty it will create array
    wishlists = [];
  } else {
    wishlists = JSON.parse(localStorage.getItem("wishlists")); //If there is an array we get it back from local storage
  }
  wishlists.splice(wishlists.indexOf(wishListItem), 1); //remove the item with help for index position, 1 indicates how many i want to remove
  localStorage.setItem("wishlists", JSON.stringify(wishlists)); //Then set it back to local storage again
}

function getWish() {
  let wishlists;
  if (localStorage.getItem("wishlists") === null) { //If there is an array we get it back from local storage
    wishlists = [];
  } else {
    wishlists = JSON.parse(localStorage.getItem("wishlists"));
  }
  wishlists.forEach(function (wishlist) {
    createli = document.createElement("li"); //creates the list item
    const inputValue = document.getElementById(wishlist); //takes the value of what you are writing in the input
    const wishValue = document.createTextNode(wishlist); //creates a string of thext from what you write
    createspan = document.createElement("SPAN"); //creates the closing element
    closeX = document.createTextNode("\u00D7"); // creates the text inside the closing element

    createli.appendChild(wishValue); //adds ano ther line with te new stuff you have written
    if (inputValue === '') {
      alert("Don´t you wish for anything");
    } else {
      document.getElementById("wish-list").appendChild(createli); //adds the new wish to the list

    }
    closingElement();
    closeWish();
    document.getElementById("new-item").value = ""; // resets the value to empty
    localStorage.setItem("wishlists", JSON.stringify(wishlists));
  })

}
