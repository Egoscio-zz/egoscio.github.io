// zeros.js

'use strict';

function zeros(exp, logger) {
	if (!exp.match(/^\d/)) exp = '1' + exp;
	var match = exp.match(/((\+|\-)?(x|\d+x?)\^?(\+|\-)?)+/g);
	match = match ? match : [];

	if (exp.length === 0 || exp !== match.join('')) {
		logger('Please enter a valid expression.');
	}

	var expS = exp.split('x'); // Cached split.
	var q = Number(expS[0].match(/(\+|\-)?\d+/)[0]); // Constant
	var p = Number(expS[expS.length - 1].match(/(\+|\-)\d+/)[0]); // Leading

	logger('P is ' + String(p) + ' and Q is ' + String(q));

	var pf = getFactors(p); // Factors of p
	var qf = getFactors(q); // Factors of q
	var pq = new Set(); // Set for possible Zeros
	var zeros = new Set(); // Set for Zeros

	logger('Factors of P are +-{' + String(pf.reduce(function (a, b) {
		return String(a) + ', ' + String(b);
	})) + '}');
	logger('Factors of Q are +-{' + String(qf.reduce(function (a, b) {
		return String(a) + ', ' + String(b);
	})) + '}');

	for (var i = 0; i < pf.length; i++) {
		for (var j = 0; j < qf.length; j++) {
			var fraction = math.fraction(pf[i] / qf[j]);
			if (fraction.d === 1) {
				// Omit if denominator is 1.
				pq.add('' + String(fraction.n));
			} else {
				pq.add(String(fraction.n) + '/' + String(fraction.d)); // Add a possible zero to the set.
			}
		}
	}

	logger('Possible zeros are +-{' + String(Array.from(pq).reduce(function (a, b) {
		return String(a) + ', ' + String(b);
	})) + '}');

	pq.forEach(function (val) {
		var negVal = '-' + val;
		var res1 = math.eval(exp, { x: math.eval(val) });
		var res2 = math.eval(exp, { x: math.eval(negVal) });
		if (res1 === 0) zeros.add(val); // The positive value is a zero.
		if (res2 === 0) zeros.add(negVal); // The negative value is a zero.
	});

	if (Array.from(zeros).length === 0) {
		logger('There are no zeros.');
	} else {
		logger('The zeros are: ' + String(Array.from(zeros).reduce(function (a, b) {
			return String(a) + ', ' + String(b);
		})));
	}
}

function getFactors(num) {
	// Function to accumulate all possible factors.
	num = math.abs(num); // Absolute value of num.
	var nums = [];
	for (var i = 0; i <= num; i++) {
		nums.push(i);
	}
	nums = nums.filter(function (a) {
		return num % a === 0;
	}); // Filter uses modulo's returned value compared to 0.
	return nums;
}