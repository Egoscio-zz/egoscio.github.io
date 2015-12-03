// script.js

function logger(str) {
	$('#zero-results').append(str + '<br/ >')
}

$('#zero-form').on('submit', function(e) {
	$('#zero-results').html('')
	zeros($('#zero-input').val(), logger)
	return false
})
