
//Safety code to prevent code injection via form
const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Function that creates our the structure of what will append to the DOM for each tweet
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

// Prepending each tweet from the DB to our DOM
const renderTweets = function(tweetArray) {
  tweetArray.forEach(tweet => {
    $('.tweet-container').prepend(createTweetElement(tweet));
  });
};

// ajax get req. and calling our render function on our received data
const loadTweets = function() {
  $.get('/tweets', { dataType: 'json' }, function() {
  })
    .then((result) => {
      renderTweets(result);
    });
};

// Logic for handling submissions and stopping invalid submissions

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
