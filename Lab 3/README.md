# Implementation Details and Libraries used

#### ChatGPT Usage Reference:

ChatGPT was used for the `removeDuplicates()` function on line 160 of `main.js`. In this function, we take in an array of tweet objects and remove any duplicate tweet objects to prevent them from being displayed onto the page.

The `filter()` method loops through our array of tweet objects we fetched called `tweets` and keeps the entries that satisfies the callback function's conditions for filtering duplicates in the array.

In the callback function, it uses the `findIndex()` method which finds the first instance of a tweet object and checks if the `user_name`, `user_created`, `date`, and `text` properties of this tweet object matches with the current tweet object's same properties. If it finds that the index of the first instance of the tweet matches with the index of the current tweet, then it is unique and is kept in the array of tweet objects. Otherwise, it is not unique (since it finds that the current tweet object is the same as the first instance of the tweet object but in another index location) and returns false and the current element does not get added to the array of tweet objects.

At the end of filtering, we have an array of unique tweet objects stored in `uniqueTweets` and return it.

#### Libraries used:

- Moment.js for displaying the date in a readable format

#### References used:

- https://www.w3schools.com/howto/howto_js_display_checkbox_text.asp
- https://www.w3schools.com/tags/att_input_size.asp
- https://www.w3schools.com/JSREF/jsref_filter.asp
- https://momentjs.com/
- https://stackoverflow.com/questions/64032097/can-i-get-a-fetch-function-to-repeat-every-few-seconds
  - for fetching data every 10 seconds
- https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
  - Sorting the dates; Converts date property from a string to Date object. Uses sort() and a comparison function that compares the dates of two objects by taking their difference to get the correct descending order (from most recent to least recent).
