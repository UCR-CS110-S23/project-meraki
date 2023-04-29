/* References:
https://www.w3schools.com/howto/howto_js_display_checkbox_text.asp
https://www.w3schools.com/tags/att_input_size.asp
*/

let searchString = ""; // here we use a global variable
let url = "http://50.21.190.71/get_tweets";
let paused = false;
let count = 0;
let tweets = [];
// getRequest(); //first load
$(document).ready(function () {
  getRequest();
});
/* FETCH DATA EVERY 10 SECONDS*/
// Reference: https://stackoverflow.com/questions/64032097/can-i-get-a-fetch-function-to-repeat-every-few-seconds
window.addEventListener("load", function () {
  // The document is loaded.
  // Fetch new data every 10 seconds.
  setInterval(getRequest, 5000);
});

const handleSearch = (event) => {
  // searchString = event.target.value.trim().toLowerCase() ...
  // you may want to update the displayed HTML here too
};
document.getElementById("searchBar").addEventListener("input", handleSearch);

function pauseFeed() {
  var box = document.getElementById("check");
  box.addEventListener("click", function () {
    document.getElementById("check").innerHTML = "checked";
  });
  if (box.checked) {
    // alert("testing!");
    paused = true;
  } else {
    // alert("unpaused");
    paused = false;
  }
}

const tweetContainer = document.getElementById("tweet-container");

/**
 * Removes all existing tweets from tweetList and then append all tweets back in
 *
 * @param {Array<Object>} tweets - A list of tweets
 * @returns None, the tweets will be renewed
 */
function refreshTweets(data) {
  for (let i = 0; i < data.length; i++) {
    tweets.push(data[i]);
  }
  tweets = removeDuplicates();

  // console.log("removed", tweets);

  // feel free to use a more complicated heuristics like in-place-patch, for simplicity, we will clear all tweets and append all tweets back
  // {@link https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript}
  while (tweetContainer.firstChild) {
    tweetContainer.removeChild(tweetContainer.firstChild);
  }

  // create an unordered list to hold the tweets
  // {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement}
  const tweetList = document.createElement("ul");
  // append the tweetList to the tweetContainer
  // {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild}
  tweetContainer.appendChild(tweetList);

  // all tweet objects (no duplicates) stored in tweets variable

  // // filter on search text
  // // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter}
  // const filteredResult = tweets.filter(...);

  // console.log("NON-SORTED ARRAY:", displayDatesSorted());

  /*SORT TWEETS BY DATE*/
  sortTweets();
  console.log("SORTED ARRAY:", displayDatesSorted());

  /*TODO: REMOVE DUPLICATE TWEETS*/

  // execute the arrow function for each tweet
  // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach}
  tweets.forEach((tweetObject) => {
    // create a container for individual tweet
    console.log(tweetObject);
    const tweet = document.createElement("li");

    // e.g. create a div holding tweet content
    const tweetContent = document.createElement("div");
    tweetContent.id = "tweet";

    var imgElement = document.createElement("img");
    imgElement.id = "pfp";

    var http = new XMLHttpRequest();
    var imgURL = tweetObject.avatar;
    http.open("HEAD", imgURL, false);
    http.send();
    if (http.status != 404) {
      imgElement.setAttribute("src", imgURL);
      imgElement.setAttribute("alt", "profile picture");
    } else {
      imgElement.setAttribute("src", "images/linguini.png");
      imgElement.setAttribute("alt", "profile picture");
    }
    tweetContent.appendChild(imgElement);

    var userDateContentP = document.createElement("p");
    var bold = document.createElement("strong");
    var name = document.createTextNode(tweetObject.user_name);
    bold.appendChild(name);
    userDateContentP.appendChild(bold);

    var spanHandle = document.createElement("span");
    spanHandle.id = "name-date";
    var date = tweetObject.date; /*TODO: CLEAN & PARSE THE DATE*/
    var handleDate = document.createTextNode(
      "@" + tweetObject.user_name + " " + date
    );
    spanHandle.appendChild(handleDate);
    userDateContentP.appendChild(spanHandle);

    tweetContent.appendChild(userDateContentP);

    var tweetTextP = document.createElement("p");
    tweetTextP.id = "tweet-text";

    // create a text node "safely" with HTML characters escaped
    // {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode}
    const tweetText = document.createTextNode(
      tweetObject.text
    ); /*TODO: REMOVE Twitter short url at the end of the text; can prob do this by doing somethign like */
    tweetTextP.appendChild(tweetText);
    // append the text node to the div

    tweetContent.appendChild(tweetTextP);

    // you may want to put more stuff here like time, username...
    tweet.appendChild(tweetContent);

    // finally append your tweet into the tweet list
    tweetList.appendChild(tweet);

    /*
    var borderBottom = document.createElement("div");
    borderBottom.id = "cc-border-bot";
    var getTweet = document.getElementById("tweet");
    tweet.appendChild(borderBottom);*/
  });
}

function removeDuplicates() {
  //USED CHATGPT
  var uniqueTweets = tweets.filter((obj, index, arr) => {
    return (
      index ===
      arr.findIndex(
        (t) =>
          t.user_name === obj.user_name &&
          t.user_created === obj.user_created &&
          t.date === obj.date &&
          t.text === obj.text
      )
    );
  });

  return uniqueTweets;
}

function getRequest() {
  //Check if not paused, then fetch. If paused, then no fetch.

  if (!paused) {
    console.log("COUNT: ", (count += 1));
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        refreshTweets(data);
        // addTweets(data);
      })
      .catch((err) => {
        // error catching
        console.log(err);
      });
  }
}

//Reference: https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
function sortTweets() {
  tweets.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.date) - new Date(a.date);
  });
}

function displayDatesSorted() {
  let dis = [];
  for (let i = 0; i < tweets.length; i++) {
    dis.push(tweets[i]);
  }
  return dis;
}
