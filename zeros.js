// zeros.js

var mjs = require('mathjs')
var args = process.argv.slice(2).join('')

var helpString = 'Usage: node ./zeros.js expression\nThe expression must use "x".'
var match = args.match(/((\+|\-)?(x|\d+x?)\^?(\+|\-)?)+/g)
match = match ? match : []

if (args.length === 0 || args !== match.join('')) {
	console.log(helpString)
	process.exit(0)
}

var argsS = args.split('x') // Cached split.

var q = Number(argsS[0].match(/(\+|\-)?\d+/)[0]); // Constant
var p = Number(argsS[argsS.length - 1].match(/(\+|\-)\d+/)[0]); // Leading

console.log(`P is ${p} and Q is ${q}`)

var pf = getFactors(p) // Factors of p
var qf = getFactors(q) // Factors of q
var pq = new Set() // Set for possible Zeros
var zeros = new Set() // Set for Zeros

console.log(`Factors of P are +-{${pf.reduce((a, b) => `${a}, ${b}`)}}`)
console.log(`Factors of Q are +-{${qf.reduce((a, b) => `${a}, ${b}`)}}`)

for (var i = 0; i < pf.length; i++) {
	for (var j = 0; j < qf.length; j++) {
		var fraction = mjs.fraction(pf[i]/qf[j])
		if (fraction.d === 1) { // Omit if denominator is 1.
			pq.add(`${fraction.n}`)
		} else {
			pq.add(`${fraction.n}/${fraction.d}`) // Add a possible zero to the set.
		}
	}
}

console.log(`Possible zeros are +-{${Array.from(pq).reduce((a,b) => `${a}, ${b}`)}}`)

pq.forEach((val) => {
	var negVal = '-' + val
	var res1 = mjs.eval(args, { x: mjs.eval(val) })
	var res2 = mjs.eval(args, { x: mjs.eval(negVal) })
	if (res1 === 0) zeros.add(val) // The positive value is a zero.
	if (res2 === 0) zeros.add(negVal) // The negative value is a zero.
})

if (Array.from(zeros).length === 0) {
	console.log(`There are no zeros.`)
} else {
	console.log(`The zeros are: ${Array.from(zeros).reduce((a, b) => `${a}, ${b}`)}`)
}

function getFactors(num) { // Function to accumulate all possible factors.
	num = mjs.abs(num) // Absolute value of num.
	var nums = []
	for (var i = 0; i <= num; i++) {
		nums.push(i)
	}
	nums = nums.filter(a => num % a === 0) // Filter uses modulo's returned value compared to 0.
	return nums
}