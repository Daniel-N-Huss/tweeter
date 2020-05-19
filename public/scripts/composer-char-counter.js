$(document).ready(function() {
  console.log('Document is ready now!');

  $('#tweet-text').keyup(function() {
    let textArea = this;
    let count = $(textArea).val().length;
    let counterViz = $(textArea).siblings().find('.counter');
    $(counterViz).val(140 - count);

    $(counterViz).toggleClass('error', count > 140);
  });
});

