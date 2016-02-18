// script.js

function logger(str) {
	$('#zero-results').append(str + '<br/ >')
}

$('#zero-form').on('submit', function(e) {
	e.stopPropagation()
	e.preventDefault()
	$('#zero-results').html('')
	zeros($('#zero-input').val(), logger)
})
