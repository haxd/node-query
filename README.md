# Query

Called node-query because it's currently packaged as a NodeJS / CommonJS module and works well with Node.

I needed a way to filter json data being returned, and wanted a nice way of doing that.

## Examples

    var query = require('../node-query/node-query');

    var q = new query().data([
      {var1: 'data', grep: 'upgrep', var2: 1, blam: 'wan'},
      {var1: 'date', grep: 'upgrep', var2: 2, blam: 'rap'},
      {var1: 'date', grep: 'upgrep', var2: 3, blam: 'rap'},
      {var1: 'datr', grep: 'upgrep', var2: 4, blam: 'wan'},
    ]);

    q.where({
      conditions: {
        'var1': /dat(a|e)/ig, // supports regexp or standard comparison
        and: [
          {'grep': 'upgrep'}, // this could be in seperate objects or in one big one
          {'var2': {'>': 1} // supports all the usual operators, < > >= <= !=
        ],
        or: [
          {'blam': 'rap'}, // these need to be in seperate objects in the array
          {'blam': 'wan'}
        ],
      }
    });

    // call q.data() to read the data, call q.data(object) to
    // overwrite the query's current object.

    console.log(q.data());

## Installation

Just fork this repo and require as shown above, as much as I love npm personally, there is no way on earth I am going to jump through the copious amounts of hoops in order to get this published as an npm module. Sorry. If you want to do that, then be my guest.

Hugs and Kisses,

Haxd.
