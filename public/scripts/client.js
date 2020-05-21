/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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

const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(data) {
  const $tweet = $(
    `<article class="tweet">
          <header>
            <div class='leftAlignUserInfo'>
              <img class='profilePhoto' src="${data.user.avatars}">
              <h1>${data.user.name}</h1>
            </div>
            <h2 class='userHandle'>${data.user.handle}</h2>
          </header>

          <p class='tweetContent'>${escape(data.content.text)}</p>

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

const loadTweets = function() {
  $.get('/tweets', { dataType: 'json' }, function() {
  })
    .then((result) => {
      renderTweets(result);
    });
};

const submitTweet = function(whatToSubmit) {
  if ($(whatToSubmit).val() === '' || $(whatToSubmit).val().length > 140) {
    $('span.invalidSubmission').slideDown();
  } else {
    $('span.invalidSubmission').slideUp();
    const cleansed = escape($(whatToSubmit).serialize());
    console.log("submitTweet -> cleansed", cleansed)
    
    $.post('/tweets#submit', cleansed)
      .then(() => {
        $(whatToSubmit).val('');
        //$('.tweet-container').empty();
        loadTweets();
      });
  }
};


$(document).ready(function() {
  
  loadTweets();

  $('.new-tweet').submit((event) => {
    event.preventDefault();
    submitTweet('#tweet-text');
  });


});
