/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


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
            <span class='postDate'>${moment(data['created_at']).fromNow()}</span>
            <span class='icons'> 
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
            </span>
          </footer>
        </article>    
    `);
  return $tweet;
};

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
    $.post('/tweets', $(whatToSubmit).serialize())
      .then(() => {
        $(whatToSubmit).val('');
        $('.counter').text(140);
        //$('.tweet-container').empty();
        loadTweets();
      });
  }
};


$(document).ready(function() {
  
  loadTweets();

  $('#openNewTweet').click(() => {
    $('.new-tweet').slideToggle();
  });

  $('.new-tweet').submit((event) => {
    event.preventDefault();
    submitTweet('#tweet-text');
  });

});
