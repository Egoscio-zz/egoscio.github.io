'use strict';

// mct.js (Measures of Central Tendency)
// Mean, Median, Mode, Range, and Standard Deviation

function sortAssend(set) {
  return set.sort(function (a, b) {
    return a - b;
  });
}

function mean(set) {
  var result = 0;
  for (var i = 0; i < set.length; i++) {
    result += set[i];
  }
  result = result / set.length;
  return result;
}

function median(set) {
  var result = 0;
  set = sortAssend(set);
  if (set.length % 2) {
    // Is odd
    var index = Math.floor(set.length / 2);
    result = set[index];
  } else {
    // Is even
    var index = set.length / 2;
    result = mean([set[index - 1], set[index]]);
  }
  return result;
}

function mode(set) {
  var result = [];
  var freq = {};
  for (var i = 0; i < set.length; i++) {
    var item = set[i];
    freq[item] = typeof freq[item] === 'number' ? freq[item] + 1 : 1;
  }
  var keys = Object.keys(freq);
  var highest = Math.max.apply({}, keys.map(function (key) {
    return freq[key];
  }));
  if (highest === 1) {
    result = false;
  } else {
    result = keys.filter(function (key) {
      return freq[key] === highest;
    });
  }
  return result;
}

function range(set) {
  var result = 0;
  set = sortAssend(set);
  result = set[set.length - 1] - set[0];
  return result;
}

function stdDev(set) {
  var result = 0;
  var xbar = mean(set);
  result = set.map(function (a) {
    return Math.pow(a - xbar, 2);
  });
  result = result.reduce(function (a, b) {
    return a + b;
  }) / set.length;
  result = Math.sqrt(result);
  return result;
}

function outliers(set) {
  var result = [];
  var offset = stdDev(set) * 2;
  var xbar = mean(set);
  var ranges = offset = [xbar + offset, xbar - offset];
  result = set.filter(function (a) {
    return a > ranges[0] || a < ranges[1];
  });
  result = result.length ? result : false;
  return result;
}

var functions = {
  'Aranged': sortAssend,
  'Length': function Length(set) {
    return set.length;
  },
  'Mean': mean,
  'Median': median,
  'Mode': mode,
  'Range': range,
  'Standard Deviation': stdDev,
  'Outliers': outliers
};

function render(set) {
  set = sortAssend(set);
  return '$$ \\overline{x} = \\frac{' + set.reduce(function (a, b) {
    return a + ' + ' + b;
  }) + '}{' + set.length + '} = ' + mean(set) + ' $$\n  $$ median = ' + median(set) + ' $$\n  $$ mode = ' + mode(set) + ' $$\n  $$ range = ' + set[set.length - 1] + ' - ' + set[0] + ' = ' + range(set) + ' $$\n  $$ \\sigma = \\sqrt{\\frac{' + set.map(function (a) {
    return '(' + a + ' - \\overline{x})^2';
  }).reduce(function (a, b) {
    return a + ' + ' + b;
  }) + '}{' + set.length + '}} = ' + stdDev(set) + ' $$';
}

function logResults(set) {
  return Object.keys(functions).map(function (key) {
    return key + ': ' + functions[key](set);
  });
}