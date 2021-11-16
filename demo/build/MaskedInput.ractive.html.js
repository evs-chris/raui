System.register(['./chunk2.js'], function (exports, module) {
	'use strict';
	var globalRegister, Window;
	return {
		setters: [function (module) {
			globalRegister = module.default;
			Window = module.Window;
		}],
		execute: function () {

			var observables = ['value', 'masked', 'display'];

			function masked(options) {
				if ( options === void 0 ) options = {};

				return function(node, opt1, opt2, opt3) {
					var ctx = this.getContext(node);

					var opts = Object.assign({}, masked.defaults, options);
					if (typeof opt1 === 'object') { Object.assign(opts, opt1); }
					else if (typeof opt2 === 'object') { Object.assign(opts, opt2); }
					else if (typeof opt3 === 'object') { Object.assign(opts, opt3); }

					if (typeof opt1 === 'string') {
			      if (opts.mask) { opts.value = opt1; }
			      else { opts.mask = opt1; }
			    }
					if (typeof opt2 === 'string') {
			      if (opts.value) { opts.mask = opt2; }
			      else { opts.value = opt2; }
			    }

					opts.mask = opts.mask || '';
					opts.masks = opts.masks || masked.defaults.masks;
					opts.maskChars = '';
					opts.bind_value = opts.value;
					opts.bind_masked = opts.masked;
					opts.bind_display = opts.display;

					for (var k in opts.masks) {
						if (k.length > 1) {
							for (var i = 0; i < k.length; i++) { opts.masks[k[i]] = opts.masks[k]; }
						}
					}

					var value = {};
					var bound = {};
					var observe;
					var sync;

					function update(init, nav, blur) {
			      var blurred = blur || document.activeElement !== node;

			      if (init && opts.privateMask) {
			        var start = node.selectionStart;
			        var end = node.selectionEnd;
			        node.value = value.masked;
			        node.selectionStart = start;
			        node.selectionEnd = end;
			      }

						// if this isn't a focus event and there's more than one character selected, all bets are off, let the user do whatever
						if (!blurred && !init && Math.abs(node.selectionEnd - node.selectionStart) > 1) { return; }

						var cursor = node.selectionStart;

						var val = node.value || '';
						var mask = opts.mask;
						var len = mask.length;
						var res = '';
						var unmasked = '';
						var masked = '';
						var last = 0;
						var range = 0;

						for (var i = 0, j = 0; i < len; i++) {
							var m = opts.masks[mask[i]];
							var match = j < val.length && m && m.test(val[j]);

							if (match) {
								unmasked += val[j];
								masked += val[j];
			          if (blurred && opts.privateMask) { res += opts.masks[opts.privateMask[i]] ? val[j++] : opts.privateMask[(j++, i)]; }
								else { res += val[j++]; }
								last = i + 1;
							} else {
								// if looking for a mask match, skip forward in val until one is found
								if (m) {
									while (!match && j++ < val.length) {
										match = m.test(val[j]);
									}
									if (match && last === i) { range--; }
								} else if (last === i) {
									last = i + 1;
									range++;
									masked += mask[i];
								}

								if (!match) {
									if (opts.blurMask && blurred && m) { res += opts.blurMask[0]; }
									else { res += mask[i]; }
								}	else { i--; }
							}
						}

						value.value = unmasked;
						value.masked = masked;
						value.display = res;

						node.value = res;

						// update the cursor position and selection if necessary
						if (init) { cursor = last; } // on initial focus, select the last mask char
						else if (!nav) { // don't adjust stuff on nav keys
							if (cursor > last + range || (last + range <= mask.length && cursor + range === last)) { cursor = last; }
							for (var i$1 = cursor; i$1 <= len; i$1++) {
								if (opts.masks[mask[i$1]]) { break; }
								cursor++;
							}
						}

						// if not a nav key, select the char or value
						if (document.activeElement === node && typeof node.setSelectionRange === 'function') {
							if (!nav) {
								if (init && cursor === mask.length) { node.setSelectionRange(0, cursor + 1); }
								else { node.setSelectionRange(cursor, cursor + 1); }
							} else { node.setSelectionRange(cursor, cursor); } // otherwise move the cursor back to where it should be
						}

						if (sync && opts.lazy === false) {
							sync();
						}
					}

					observables.forEach(function (k) {
						if (opts[("bind_" + k)]) {
							if (!observe) { observe = {}; }
							observe[k] = ctx.observe(opts[("bind_" + k)], function (v) {
								node.value = v;
								update(false, false);
							}, { init: false });
							bound[k] = ctx.get(opts[("bind_" + k)]);
						}
					});

					if (observe) {
						sync = function(e) {
							observables.forEach(function (k) {
								if (observe[k] && value[k] !== bound[k]) {
									observe[k].silence();
									ctx.set(opts[("bind_" + k)], value[k]);
									bound[k] = value[k];
									observe[k].resume();
								}
							});
						};

						ctx.listen('blur', sync);
					}

					var listener = function(e) {
						update(e.type === 'focus', e.key && (~e.key.indexOf('Arrow') || ~e.key.indexOf('Backspace') || ~e.key.indexOf('Del')), e.type === 'blur');
					};

					ctx.listen('focus', listener);
					// yech
					if (window.navigator && ~window.navigator.userAgent.indexOf('Android')) { ctx.listen('input', listener); }
					else { ctx.listen('keyup', listener); }

					// initialize the input mask
					node.value = bound.value || bound.masked || bound.display || opts.mask;
					update(false, false);
					ctx.listen('blur', listener);

					return {
						teardown: function teardown() {
							ctx.unlisten('keyup', listener);
							ctx.unlisten('focus', listener);
							ctx.unlisten('blur', listener);
							if (observe) {
								ctx.unlisten('blur', sync);
								observables.forEach(function (k) { return observe[k] && observe[k].cancel(); });
							}
						},
			      shuffled: function shuffled() {
			        observables.forEach(function (k) {
			          if (opts[("bind_" + k)]) {
			            bound[k] = ctx.get(opts[("bind_" + k)]);
			          }
			        });
			      }
					};
				}
			}

			masked.defaults = {
				masks: {
					'#': /\d/,
					'?': /\w/,
					'@': /[a-zA-Z]/
				}
			};

			function plugin(opts) {
				if ( opts === void 0 ) opts = {};

				return function(ref) {
					var instance = ref.instance;

					instance.decorators[opts.name || 'masked'] = masked(opts);
				}
			}

			globalRegister('masked', 'decorators', masked);

			var MaskedInput_ractive = exports('default', Window.extend({
			  template: {v:4,t:[{t:7,e:"tabs",m:[{t:13,n:"class",f:"alt",g:1},{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13,g:1}],f:[{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13,g:1}],f:[{t:7,e:"marked",f:["    This decorator takes an input field and applies a mask that accepts numbers, letters, or letters and numbers at each mask position. Cursor movement is automatically handled, and the field is filled with the mask, so no weird tricks are needed to display a prompt for the user.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13,g:1}],f:[{t:7,e:"marked",f:["    ### Plugin options\n\n    All options are optional.\n\n    * `name: string ='masked'` - the name to use when registering the decorator as a plugin\n\n    ### Arguments\n\n    This decorator takes up to two strings and an options has as arguments. The first and second may be strings that correspond to the `mask` and `value` options. The first, second, or third may be an options hash.\n\n    * `mask: string` - the mask to use in the input\n      * #### Characters\n\n        `#` - matches any number character\n        `?` - matches any word character\n        `@` - matches any upper or lowercase letter a-z\n        \n        Any other characters are taken literally and automatically included in the masked value.\n    * `value: keypath` - a keypath to use to bind the input value\n    * `display: keypath` - a keypath to use to bind the displayed value\n    * `lazy: boolean = true` - whether or not to immediately update the bound values\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13,g:1}],f:[{t:7,e:"marked",f:["      Template:\n\n      ```hbs\n      <label as-field>All the things\n          <input as-masked=\"{ mask: '### ??? @@@ #-?', value: '.value', masked: '.masked', display: '.display', lazy: false }\" />\n      </label>\n      <label as-field>16-digit thing\n        <input as-masked=`####-####-####-####` />\n      </label>\n      ```\n\n      Result:\n    "]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["All the things ",{t:7,e:"input",m:[{n:"masked",t:71,f:{r:[],s:"[{mask:\"### ??? @@@ #-?\",value:\".value\",masked:\".masked\",display:\".display\",lazy:false}]"}}]}]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["16-digit thing ",{t:7,e:"input",m:[{n:"masked",t:71,f:{r:[],s:"[\"####-####-####-####\"]"}}]}]}," ",{t:7,e:"dl",m:[{t:13,n:"style",f:"margin-top: 2em;",g:1}],f:[{t:7,e:"dt",f:["Value"]}," ",{t:7,e:"dd",f:["​",{t:2,r:".value"}]}," ",{t:7,e:"dt",f:["Masked"]}," ",{t:7,e:"dd",f:["​",{t:2,r:".masked"}]}," ",{t:7,e:"dt",f:["Display"]}," ",{t:7,e:"dd",f:["​",{t:2,r:".display"}]}]}]}]}],e:{"[{mask:\"### ??? @@@ #-?\",value:\".value\",masked:\".masked\",display:\".display\",lazy:false}]":function (){return([{mask:"### ??? @@@ #-?",value:".value",masked:".masked",display:".display",lazy:false}]);},"[\"####-####-####-####\"]":function (){return(["####-####-####-####"]);}}},
			  use: [plugin()],
			  options: {
			    title: 'Decorator :: MaskedInput',
			    resizable: true, flex: true,
			    width: '48em', height: '30em'
			  }
			}));

		}
	};
});
