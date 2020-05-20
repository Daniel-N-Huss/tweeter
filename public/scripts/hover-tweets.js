$(document).ready(function() {
  
  $('.tweet').hover(
    function() {
      $(this).addClass('hover');
      $(this).find('*').addClass('hover');
    }, function() {
      $(this).removeClass('hover');
      $(this).find('*').removeClass('hover');
    }
  );
});