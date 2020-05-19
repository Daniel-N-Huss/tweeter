$(document).ready(function() {
  console.log('Document is ready now!');

  $('#tweet-text').keyup(function(event) {
    let textArea = this;
    let counter = $(textArea).val().length;
    console.log(counter);
  });
});