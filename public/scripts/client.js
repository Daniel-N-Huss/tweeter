/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
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
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];


//look at library:      momentjs 
const calculateDisplayDate = function(postTime) {
  const currentTime = Date.now();
  const difference = currentTime - postTime;
  const calculatedDays = difference / (1000 * 3600 * 24);

  if (calculatedDays <= 1) {
    const calculatedHours = Math.round(calculatedDays * 24);
    if (calculatedHours <= 1) {
      return `Posted Recently`;
    } else {
      return `Posted ${calculatedHours} hours ago`;
    }
  } else {
    return `Posted ${Math.round(calculatedDays)} days ago`;
  }

};


const createTweetElement = function(data) {
  const $tweet = $(
    `<article class='tweet'>
          <header>
            <div class='leftAlignUserInfo'>
              <img class='profilePhoto' src="${data.user.avatars}">
              <h1>${data.user.name}</h1>
            </div>
            <h2 class='userHandle'>${data.user.handle}</h2>
          </header>

          <p class='tweetContent'>${data.content.text}</p>

          <footer>
            <span class='postDate'>${calculateDisplayDate(data['created_at'])}</span>
            <span class='actions'>FlagRetweetLoveGoHere</span>
          </footer>
        </article>    
    `);
  return $tweet;
};

// find fontawesome to apply styles

const renderTweets = function(tweetArray) {
  tweetArray.forEach(tweet => {
    $('.tweet-container').prepend(createTweetElement(tweet));
  });
};

const submitTweet = function(whatToSubmit) {
  $.post('/tweets', $(whatToSubmit).serialize())
    .then(() => {
      $(whatToSubmit).val('');
      $('.tweet-container').empty();
      renderTweets(data);
    });
};



$(document).ready(function() {
  
  renderTweets(data);

  $('.new-tweet').submit((event) => {
    event.preventDefault();
    submitTweet('#tweet-text');
  });

  const loadTweets = function() {
    $.get('/tweets', { dataType: 'json' }, function(result) {
      console.log(result);
    });
  };

  loadTweets();

});
