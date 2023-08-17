$("#exampleInputPassword1").on("change", function(){
  $(".alerts").empty();
  $(".alerts").append(lengthCheck($("#exampleInputPassword1").val()));
  $(".alerts").append(numberCheck($("#exampleInputPassword1").val()));
  $(".alerts").append(leterCheck($("#exampleInputPassword1").val()));
  $(".alerts").append(capitalLeterCheck($("#exampleInputPassword1").val()));
});

function lengthCheck(str) {
  if(str.length < 8) return '<label id="valPass">Min 8 characters</label><br>';
}

function numberCheck(str) {
  let isHaveOneNumber = false;
  for (let i = 0; i < str.length; i++) {
    if(!isNaN(str[i])) {
      isHaveOneNumber = true;
    }
  }

  if(!isHaveOneNumber) return '<label id="valPass">No have number</label><br>'; 
}

function capitalLeterCheck(str) {
    let hasCapital = false;
    if (str == str.toLowerCase()) hasCapital = true;

    if(hasCapital) return '<label id="valPass">No have Capital leter</label><br>' 
}

function leterCheck(str) {
  let isHaveOneLeter = false;
  for (let i = 0; i < str.length; i++) {
    if(isNaN(str[i])) {
      isHaveOneLeter = true;
    }
  }

  if(!isHaveOneLeter) return '<label id="valPass">No have leters</label><br>'; 
}