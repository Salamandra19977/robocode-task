let counter = 1;

$("div").click(function() {
  counter -=0.1;
  $(this).fadeTo(0.2, counter);
});