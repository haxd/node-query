function Query() {
}

Query.prototype = {
	data: function(vadata) {
		if (vadata != null) {
			this._data = vadata;
			return this;
		} else {
			return this._data;
		}
	},

	select: function(props) {
		function _filter(_props, _data) {
			var _tmp = {};

			for (var cursor in _data) {
				var current = _data[cursor];

				for (var i = 0; i < _props.length; i++) {
		      if (!(_props[i] instanceof Array)
  	        && _props[i] !== null
    	      && (typeof(_props[i]) == 'object')) {
    	      for (var name in _props[i]) {
    	      	if (cursor == name) _tmp[_props[i][name]] = current;
    	      }
    	    } else if (cursor == props[i]) _tmp[cursor] = current;
				}
			}

			return _tmp;
		}

		if (this._data.length != undefined) {
			// data is an array of objects
			var tmp = [];
			var type = 'array';
		} else {
			if (typeof this._data == 'function') {
				// data is a function
				console.log('QOWarn: Can\'t filter a function');
				return this;
			} else {
				// data is an object
				var tmp = {};
				var type = 'object';
			}
		}
		
		switch(type) {
			case 'array':
				for (var i = 0; i < this._data.length; i++) {
					tmp[i] = _filter(props, this._data[i]);
				}
			break;
			case 'object':
				tmp = _filter(props, this._data);
			break;
		}

		return this.data(tmp);
	},

	where: function(opts) {
		if (this._data.length != undefined) {
			// data is an array of objects
			var tmp = [];
		} else {
			// cant sort / filter a single object
			console.log('QOWarn: Can\'t sort / filter a single object');
			return this;
		}

		var tmp = [];

    function test(condition, value) {
      var allowed_operations = [ '<'
                             , '<='
                             , '!='
                             , '>'
                             , '>='
                             ];
                             
      if (!(condition instanceof Array)
          && condition !== null
          && (typeof(condition) == 'object')) {
          
        for (var allowed in allowed_operations) {
          var operation = allowed_operations[allowed];
          
          if (condition[operation]) {
            var testvalue = condition[operation];
            break;
          }
        }
        
        switch (operation) {
          case '<':
            if (value < testvalue) return true;
          break;
          case '<=':
            if (value <= testvalue) return true;
          break;
          case '!=':
            if (value.search !== undefined) {
              return !(value.search(testvalue) > -1);
            } else {
              return value != testvalue;
            }
          break;
          case '>':
            if (value > testvalue) return true;
          break;
          case '>=':
            if (value >= testvalue) return true;
          break;
        }
        
        return false;
      } else {
        if (value.search != undefined) {
          return value.search(condition) > -1;
        } else {
          return value == condition;
        }
      }
    }

    function isEmpty(obj) {
    	for (var prop in obj) {
      	if (obj.hasOwnProperty(prop)) return false;
	    }

    	return true;
		}

    function test_array(current, opts, start, testmethod) {
 			if (opts.length == 0 || opts.length == undefined) return true;

      keep_current = start;
      
      for (var item in current) {
        for (var i = 0; i < opts.length; i++) {
        	if (isEmpty(opts[i])) return true;

          for (var variable in opts[i]) {
            var condition = opts[i][variable];
            
            if (variable == item) {
            	keep_current = testmethod.call(null, keep_current, condition, current[item]);
            }
          }
        }
      }
      
      return keep_current;	
    }
    
    function test_or(current, opts) {
    	return test_array(current, opts, false, function $test_or(keep_current, condition, current_item) {
    		return keep_current || test(condition, current_item);
    	});
    }

    function test_normal(current, opts) {
    	return test_array(current, opts, false, function $test_normal(keep_current, condition, current_item) {
    		return test(condition, current_item);
    	});
    }
    
    function test_and(current, opts) {
			return test_array(current, opts, true, function $test_and(keep_current, condition, current_item) {
    		return keep_current && test(condition, current_item);
    	});
    }
    
    var tmp_array = [];

    if (opts.conditions) {
      var or = [];
      var and = [];
      
      if (opts.conditions.or) {
        or = opts.conditions.or;
        delete opts.conditions.or;
      }
      
      if (opts.conditions.and) {
        and = opts.conditions.and;
        delete opts.conditions.and;
      }
      
      if (this._data instanceof Array) {
        for (var i = 0; i < this._data.length; i++) {
          var current = this._data[i];


          if (test_normal(current, [opts.conditions]) &&
              test_or(current, or) &&
              test_and(current, and)) {
              
            tmp_array.push(current);
          }
        }
      } else {
        tmp = this._data;
      }
    } else {
      tmp = this._data;
    }
    
    tmp = tmp_array;

		if (opts.order) {
			for (var od in opts.order) {
				var way = opts.order[od];
				var what = od;
				tmp = tmp.sort(function(a, b) {
					switch (way) {
						case 'asc':
							return a[what] - b[what];
						break;
						case 'des':
							return b[what] - a[what];
						break;
					}
				});
			}
		}

		return this.data(tmp);
	}
};

module.exports = Query;
