/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png"
    ,
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};


const calculateDisplayDate = function(postTime) {
  const currentTime = new Date();
};


const createTweetElement = function(data) {
  const $tweet = $(
    `<article class='tweet'>
          <header>
            <div class='leftAlignUserInfo'>
              <img class='profilePhoto' src="${data.user.avatars}">
              <h1>${data.name}</h1>
            </div>
            <h2 class='userHandle'>${data.user.handle}</h2>
          </header>

          <p class='tweetContent'>${data.content.text}</p>

          <footer>
            <span class='postDate'>100 Years Ago</span>
            <span class='actions'>FlagRetweetLoveGoHere</span>
          </footer>
        </article>    
    `);

};













