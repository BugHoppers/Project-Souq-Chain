// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("fixedbutton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

$(function () {
  $("#state").change(function () {
      if ($(this).val() == "supply") {
          $("#price-div").show();
      } else {
          $("#price-div").hide();
      }
  });
});

function translateLanguage(lang) {

  var $frame = $('.goog-te-menu-frame:first');
  if (!$frame.size()) {
      alert("Error: Could not find Google translate frame.");
      return false;
  }
  $frame.contents().find('.goog-te-menu2-item span.text:contains(' + lang + ')').get(0).click();
  return false;
}