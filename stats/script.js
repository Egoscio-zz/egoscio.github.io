'use strict';

// script.js

MathJax.Hub.Config({
  tex2jax: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    processEscapes: true
  }
});

function inputToList(input) {
  return input.val().split(' ').filter(function (a) {
    return a.match(/^\d+(?:\.?\d+)?$/);
  }).map(Number);
}

$('#stat-form').on('submit', function (e) {
  e.preventDefault();
  e.stopPropagation();
  var set = inputToList($('#set-input'));
  var add = inputToList($('#add-input'));
  var rem = inputToList($('#rem-input'));
  var exp = $('#exp-input').val();
  var result = '';
  result += '$$ Original $$ ' + render(set);
  set = set.concat(add).filter(function (a) {
    return rem.indexOf(a) === -1;
  });
  if (exp.match(/x/)) {
    set = set.map(function (a) {
      return math.eval(exp, { x: a });
    });
  }
  result += '$$ Transformed $$ ' + render(set);
  $('#result').html(result);
  MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'result']);
});