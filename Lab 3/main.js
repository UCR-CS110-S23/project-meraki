/* References:
https://www.w3schools.com/howto/howto_js_display_checkbox_text.asp
https://www.w3schools.com/tags/att_input_size.asp
*/

let searchString = ""; // here we use a global variable

const handleSearch = (event) => {
  // searchString = event.target.value.trim().toLowerCase() ...
  // you may want to update the displayed HTML here too
};
document.getElementById("searchBar").addEventListener("input", handleSearch);

const tweetContainer = document.getElementById("tweet-container");

/**
 * Removes all existing tweets from tweetList and then append all tweets back in
 *
 * @param {Array<Object>} tweets - A list of tweets
 * @returns None, the tweets will be renewed
 */
// function refreshTweets(tweets) {
//     // feel free to use a more complicated heuristics like in-place-patch, for simplicity, we will clear all tweets and append all tweets back
//     // {@link https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript}
//     while (tweetContainer.firstChild) {
//         tweetContainer.removeChild(tweetContainer.firstChild);
//     }

//     // create an unordered list to hold the tweets
//     // {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement}
//     const tweetList = document.createElement("ul");
//     // append the tweetList to the tweetContainer
//     // {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild}
//     tweetContainer.appendChild(tweetList);

//     // all tweet objects (no duplicates) stored in tweets variable

//     // filter on search text
//     // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter}
//     const filteredResult = tweets.filter(...);
//     // sort by date
//     // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort}
//     const sortedResult = filteredResult.sort(...);

//     // execute the arrow function for each tweet
//     // {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach}
//     sortedResult.forEach(tweetObject => {
//         // create a container for individual tweet
//         const tweet = document.createElement("li");

//         // e.g. create a div holding tweet content
//         const tweetContent = document.createElement("div");
//         // create a text node "safely" with HTML characters escaped
//         // {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode}
//         const tweetText = document.createTextNode(tweetObject.text);
//         // append the text node to the div
//         tweetContent.appendChild(tweetText);

//         // you may want to put more stuff here like time, username...
//         tweet.appendChild(tweetContent);

//         // finally append your tweet into the tweet list
//         tweetList.appendChild(tweet);
//     });
// }

let url = "http://50.21.190.71/get_tweets";
function getRequest() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      updateTweetContent(data);
    })
    .catch((err) => {
      // error catching
      console.log(err);
    });
}
getRequest();

function updateTweetContent(data) {
  let tweet = data[0];
  //   let getHTMLUsername = document.getElementById("username");
  //   getHTMLUsername.innerHTML = data[0].user_name;

  for (let i = 0; i < 5; i++) {
    let idNum = i + 1;
    let idUsername = "username" + idNum;
    console.log(idUsername);
    let getHTMLUsername = document.getElementById(idUsername);
    let getHTMLTweetText = document.getElementById("tweet-text");
    getHTMLUsername.innerHTML = data[i].user_name;
    // getHTMLTweetText.innerHTML = data[i].text;
  }
  console.log(tweet.user_name);
}
