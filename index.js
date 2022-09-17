let localData; // global variable to cache the API response.

const url = "https://api.coinpaprika.com/v1/coins";

// Query Selectors
const button = document.querySelector("button");
const inputElement = document.querySelector("#rawText");
const outputElement = document.querySelector("#preview");

// Event Listeners
button.addEventListener("click", () => {
  const transformedText = transform(inputElement.value);
  preview(outputElement, transformedText);
});

// Call api using 'fetch' method and save the response on a global variable {localData}
fetch(url)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Something went wrong");
  })
  .then((data) => {
    localData = data;
  })
  .catch((error) => {
    console.log(error);
  });

// transform : function that gets in an argument:string as a parameter and return TransformedText:string
function transform(text) {
  // Regular Expression pattern that matches : {{ methodName/Argument }}
  const pattern = /(\{\{\s(?<method>\w+)\/(?<argument>\w+)\s\}\})/g;

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
  if (coin) {
    // if existed coin, return the value of the given method name
    return coin[methodName.toLowerCase()];
  } else {
    alert(
      `Argument ( ${argument} ) not existed !.` +
        `\n` +
        `Check the API documentation : https://api.coinpaprika.com/`
    );
    return match;
  }
}

// preview : render an output:string inside an HTML element
function preview(element, output) {
  element.innerHTML = output;
}

/*

for better user experience ; insted of fetching https://api.coinpaprika.com/v1/coins/ 
as a whole(it's 960kb) on page load and save it,
we could fetch coins on demande if we had their ids ( BTC is 'btc-bitcoin' ).
in production mode we could for example use 'Batching Requests'

*/
