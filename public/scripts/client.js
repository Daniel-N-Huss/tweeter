/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  
  loadTweets();

  $('#openNewTweet').click(() => {
    $('.new-tweet').slideToggle();
    $('#tweet-text').focus();
  });

  $('.new-tweet').submit((event) => {
    event.preventDefault();
    submitTweet('#tweet-text');
  });
});
