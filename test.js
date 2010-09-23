var query = require('../node-query/node-query');

var q = new query().data([
	{var1: 'data', grep: 'upgrep', var2: 1, blam: 'wan'},
	{var1: 'date', grep: 'upgrep', var2: 2, blam: 'rap'},
	{var1: 'date', grep: 'upgrep', var2: 3, blam: 'rap'},
	{var1: 'data', grep: 'upgrep', var2: 4, blam: 'wan'},
]);

q.where({
	conditions: {
		'var1': /dat(a|e)/ig, // supports regexp or standard comparison
    and: [
      {'grep': 'upgrep'}, // this could be in seperate objects or in one big one
      {'var2': {'>': 1}} // supports all the usual operators, < > >= <= !=
    ],
		or: [
			{'blam': 'rap'},
			{'blam': 'wan'}
		],
	}
});

console.log(q.data());
