//console.log("Client side javascript file is loaded!");

// This was the first exercise.  It shows how we can make a request to
// a service and then display the results on the chrome console.
// fetch("http://puzzle.mead.io/puzzle").then((response) =>
//   response.json().then((data) => {
//     console.log(data);
//   })
// );

// From that I was able to figure out a call to my own weather service

// In the statement below we are specifying Form.  Javascript will select
// the first "form" in the index.js
const weatherForm = document.querySelector("form");

// In the statement below we are specifying input.  Javascript will select
// the first "input" in the index.js
const search = document.querySelector("input");

// Here we are selecting the paragraph in index document that has an ID of #message-1
// Remember it is case sensitive
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")

weatherForm.addEventListener("submit", (e) => {
  // The following line prevents the browser from refreshing so we can actually see the message of 'testing'
  e.preventDefault();

  const location = search.value;

  fetch("http://localhost:3000/weather?address=" + location).then((response) =>
    // we use the name data but it could be any name we choose.
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent =data.error
      } else {
        messageOne.textContent =data.location
        messageTwo.textContent =data.forecast
      }
    })
  );
});
