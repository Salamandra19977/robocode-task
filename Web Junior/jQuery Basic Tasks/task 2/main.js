let text = "You clicked on "

$("h1").click(function() {
  alert(text + $("h1").text());
});

$("p").click(function() {
  alert(text + $("p").text());
});

$("a").click(function() {
  alert(text + $("a").text());
});
