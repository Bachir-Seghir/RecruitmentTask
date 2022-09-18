let localData; // global variable.

// api-url commonly puted in an environment variable (.env)
const url = "https://api.coinpaprika.com/v1/coins";

// Query Selectors
const transformBtn = document.querySelector("#transformBtn");
const inputElement = document.querySelector("#rawText");
const outputElement = document.querySelector("#preview");

// Event Listeners
transformBtn.addEventListener("click", () => {
  const transformedText = transform(inputElement.value);
  preview(outputElement, transformedText);
});

// Call api using 'fetch' method and save the response in a global variable {localData}
fetch(url)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Something went wrong");
  })
  .then((data) => {
    localData = data;
    return data;
  })
  .catch((error) => {
    console.log(error);
  });

// transform : function that gets in an argument:string as a parameter and return TransformedText:string
function transform(text) {
  // Regular Expression pattern that matches : {{ methodName/Argument }}
  // The number of spaces between text and curly braces is not precized in task requirments
  // so I created a Regex pattern that matches any number of spaces between curly braces to improve User Experience
  const pattern = /(\{\{.*?(?<method>\w+)\/(?<argument>\w+).*?\}\})/g;

  // execute a callback function ( getText ) for each matched portion and replace it with returned value.
  const transformedText = text.replace(
    pattern,
    function (match, group, methodName, argument) {
      return getText(match, methodName, argument);
    }
  );
  return transformedText;
}

/* 
  getText: function that gets in (match, methodName and Argument) 
  as arguments and return a corresponding value:string
*/
function getText(match, methodName, argument) {
  // find coin by symbol
  const coin = localData.find((coin) => coin.symbol === argument.toUpperCase());

  // either if methodName or argument does not exist, function will return just the raw text and alert the user
  if (!coin || !coin[methodName.toLowerCase()]) {
    /* 
      we could go further than just returning non transformed data marker
      for example : we could create a function that highlights non-transformed data markers 
      or search for the nearest word matching existing ones and replace it for better User Experience
    */
    return match;
  } else {
    // return the value of the given method name
    return coin[methodName.toLowerCase()];
  }
}

// preview : render an output:string inside an HTML element
function preview(element, output) {
  element.innerHTML = output;
}

/*

for better user experience ; insted of fetching https://api.coinpaprika.com/v1/coins/ 
as a whole(960kb) on page load and save it,
we could fetch coins on demande if we had their ids ( BTC is 'btc-bitcoin' ).
in production mode we could for example use 'Batching Requests'

*/

// Real time Transform : this part can be commented out and transform text using 'Transform Button'

// debounce function
function debounce(callback, wait) {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}

inputElement.addEventListener(
  "keyup",
  debounce((event) => {
    const transformedText = transform(event.target.value);
    preview(outputElement, transformedText);
  }, 500)
);
