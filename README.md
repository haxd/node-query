# Query

Called node-query because it's currently packaged as a NodeJS / CommonJS module and works well with Node.

I needed a way to filter json data being returned, and wanted a nice way of doing that.

## Examples

    var query = require('../node-query/node-query');

    var q = new query().data([
	    {var1: 'data', grep: 'upgrep', var2: 1, blam: 'wan', quid: 'ro'},
	    {var1: 'date', grep: 'upgrep', var2: 2, blam: 'rap', quid: 'ro'},
	    {var1: 'date', grep: 'upgrep', var2: 3, blam: 'rap', quid: 'ro'},
	    {var1: 'datr', grep: 'upgrep', var2: 4, blam: 'wan', quid: 'ro'},
    ]);

    q.select([
	    {'var1': 'var3'}, 'grep', 'var2', 'blam', {'quid': 'pro'}
    ]);

    q.where({
	    conditions: {
		    'var3': /dat(a|e)/ig, // supports regexp or standard comparison
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
    
    // outputs:
    
    //  [ { var3: 'date'
    //    , grep: 'upgrep'
    //    , var2: 2
    //    , blam: 'rap'
    //    , pro: 'ro'
    //    }
    //  , { var3: 'date'
    //    , grep: 'upgrep'
    //    , var2: 3
    //    , blam: 'rap'
    //    , pro: 'ro'
    //    }
    //  ]


The above is just test.js in this repo. Clone the repo and run <code>node test.js</code> to run.

## Notes

<code>query.select</code> allows you to select / filter the object data, and even allows you to rename the property names

<code>query.where</code> allows you to conditionally filter the data based on condition rules you may or may not know and love

It also supports sorting, ala:

    q.where({order: {varname: 'asc', varname2: 'des'}});
    
which can be combined with the conditions object in the <code>query.where</code> function. This supports numerically based sorting only for now.

I didn't make this to be extremely quick, just worked on it enough to make it work for everything I need it for. If you like it, then use it. If you don't then don't.

## Installation

Just fork this repo and require as shown above, as much as I love npm personally, there is no way on earth I am going to jump through the copious amounts of hoops in order to get this published as an npm module. Sorry. If you want to do that, then be my guest.

Hugs and Kisses,

Haxd
