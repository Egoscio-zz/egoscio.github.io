// script.js

$(document).ready(function () {
  // Your code goes in here
  // Contains score data:
  var scores = {
    red: 0,
    blue: 0
  }

  $('.tap').on('touchstart mousedown', function (e) {
    // The element that was clicked:
    var $this = $(this)
    // Grabs the second item of the class attribute, which is red or blue respectively.
    var type = $this.attr('class').split(' ')[1]
    // Increments the score
    scores[type] += 1
    // Change the text.
    $this.text('Your score is ' + scores[type])
    // Stop it from doing generic actions like selecting text.
    return false
  })
})
