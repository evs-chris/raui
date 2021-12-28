System.register(['./chunk2.js', './chunk16.js'], function (exports, module) {
	'use strict';
	var globalRegister, Window, split;
	return {
		setters: [function (module) {
			globalRegister = module.default;
			Window = module.Window;
		}, function (module) {
			split = module.default;
		}],
		execute: function () {

			var observed = [];
			var targets = {};

			function watch(el, id, src, opts) {
				var handle = observed.find(function (o) { return o.el === el; });
				if (!handle) {
					handle = { el: el, ids: {} };
					observed.push(handle);
				}

				if (!handle.inited) {
					handle.inited = true;
					var lock = false;
					handle.listener = function (ev) {
						if (ev.target === el && !lock) {
							(window.requestAnimationFrame || setTimeout)(function() {
								updateTargets(handle);
								lock = false;
							}, 16.667);
						}
					};
					setTimeout(function () {
						handle.ready = true;
						el.addEventListener('scroll', handle.listener);
						updateTargets(handle);
					}, 5);
				}

				if (!handle.ids[id]) { handle.ids[id] = []; }
				handle.ids[id].push({ node: src, opts: opts });

				return handle;
			}

			function unwatch(el, id, src) {
				var handle = observed.find(function (o) { return o.el === el; });

				if (handle) {
					var id$1 = handle.ids[id$1];
					if (id$1) {
						id$1.splice(id$1.indexOf(src), 1);
					}

					for (var k in handle.ids) {
						if (handle.ids[k].length) { return; }
					}

					handle.inited = false;
					handle.el.removeEventListener('scroll', handle.listener);
				}
			}

			function updateTargets(handle) {
				var root = handle.el === document ? document.body : handle.el;
				var pos = scrollTop(root);
				var height = root.scrollHeight;

				if (!handle.ready) { return; }

				// loop through relevant ids attached to this node
				for (var id in handle.ids) {
					// check targets for current id
					var h = handle.ids[id][0];
					var cur = h.current;
					var prev = cur;

					var range = h.opts.range === undefined ? 0 : h.opts.range;
					var spot = pos;
					if (h.opts.offset) {
						if (h.opts.offset <= 1 && h.opts.offset >= 0) { spot += (root.clientHeight * h.opts.offset); }
						else if (h.opts.offset > 1) { spot += h.opts.offset; }
					}

					var dist = root.scrollHeight;
					if (cur) {
						var t = top(cur.node, root);
						if (!range || (range > 0 && t > spot) || (range < 0 && t < spot)) { dist = Math.abs(t - spot); }
					}

					var ts = targets[id] || [];
					for (var i = 0; i < ts.length; i++) {
						var t$1 = top(ts[i].node, root);
						if (range && ((range > 0 && t$1 < spot) || (range < 0 && t$1 > spot))) { continue; }
						var y = Math.abs(t$1 - spot);
						if (y <= dist) {
							cur = ts[i];
							dist = y;
						}
					}

					// has the current changed?
					if (cur !== prev) {
						if (h.opts.path) {
							h.ctx.set(h.opts.path, cur.opts.value);
						}

						// fire target events
						if (prev) {
							if (!prev.hitout) {
								prev.hitout = true;
								if (prev.ctx.element.attributes.find(function (a) { return a.events && ~a.template.n.indexOf('firstscrollspyout'); })) { prev.ctx.raise('firstscrollspyout'); }
							}
							if (prev.ctx.element.attributes.find(function (a) { return a.events && ~a.template.n.indexOf('scrollspyout'); })) { prev.ctx.raise('scrollspyout'); }
						}
						if (!cur.hit) {
							cur.hit = true;
							if (cur.ctx.element.attributes.find(function (a) { return a.events && ~a.template.n.indexOf('firstscrollspy'); })) { cur.ctx.raise('firstscrollspy'); }
						}
						if (cur.ctx.element.attributes.find(function (a) { return a.events && ~a.template.n.indexOf('scrollspy'); })) { cur.ctx.raise('scrollspy'); }

						// TODO: fire events on spy el

						h.current = cur;
					}
				}

				if (root.scrollHeight !== height) { updateTargets(handle); }
			}

			function scrollTop(node) {
				if (node === document.body) {
					var style = window.getComputedStyle(node);
					if (style.overflowY !== 'auto' && style.overflowY !== 'scroll') {
						return window.scrollY;
					}
				}

				return node.scrollTop;
			}

			function top(node, from) {
				var y = node.offsetTop;
				var n = node;

				while (n.offsetParent) {
					n = n.offsetParent;
					if (n === from) { break; }
					y += n.offsetTop;
				}

				return y;
			}

			function scrollspy(node, args, optId) {
				var opts;
				if (typeof args === 'string') { opts = { path: args }; }
				else { opts = args || {}; }

				var id = opts.id || optId || '';
				var root = opts.target || node;
				if (root !== document) {
					if (root) {
						var style = window.getComputedStyle(root);
						var overflow = style['overflow-y'];
						if (overflow !== 'scroll' && overflow !== 'auto') { root = document; }
						else if (!style.position || style.position === 'static') { root.style.position = 'relative'; }
					} else { root = document; }
				}

				var handle = observed.find(function (o) { return o.ids[id]; });
				if (handle) {
					console.error(("Can't to create duplicate scrollspy id '" + id + "'"));
					return { update: function update() {}, teardown: function teardown() {} };
				}

				handle = watch(root, id, node, opts);

				var h = handle.ids[id].find(function (o) { return o.node === node; });
				if (h) { h.ctx = this.getContext(node); }

				return {
					update: function update(args, optId) {
						if (h) {
							var opts;
							if (typeof args === 'string') { opts = { path: args }; }
							else { opts = args || {}; }
							opts.id = opts.id || optId || '';
							h.opts = opts;
						}
					},
					teardown: function teardown() {
						unwatch(root, id, node);
					},
					id: id
				}
			}

			function spytarget(node, args, optId) {
				var this$1 = this;

				var opts;
				if (args !== undefined && typeof args !== 'object') { opts = { value: args }; }
				else { opts = args || {}; }

				var id = opts.id || optId || '';

				// wait a tick to set everything up so that implicit parent ids can be found
				setTimeout(function () {
					if (!id) {
						var n = node.parentNode;
						var ctx = this$1.getContext(n);

						while (n && ctx) {
							if (ctx.decorators.scrollspy) {
								id = ctx.decorators.scrollspy.id;
								break;
							}
							n = n.parentNode;
							ctx = this$1.getContext(n);
						}
					}

					var ts = targets[id] || (targets[id] = []);
					var obj = { node: node, opts: opts, ctx: this$1.getContext(node) };
					ts.push(obj);

					observed.filter(function (o) { return o.ids[id]; }).forEach(updateTargets);
				}, 0);

				return {
					update: function update(args, optId) {
						var opts;
						if (args !== undefined && typeof args !== 'object') { opts = { value: args }; }
						else { opts = {}; }
						opts.id = opts.id || optId || id || '';
						obj.opts = opts;
					},
					teardown: function teardown() {
						ts.splice(ts.indexOf(obj), 1);
						var handle = observed.find(function (o) { return o.ids[id]; });
						updateTargets(handle);
					},
					id: id
				}
			}

			function plugin(opts) {
				if ( opts === void 0 ) opts = {};

				return function(ref) {
					var instance = ref.instance;

					instance.decorators[opts.name || 'scrollspy'] = scrollspy;
					instance.decorators[opts.targetName || 'spytarget'] = spytarget;
				}
			}

			globalRegister('scrollspy', 'decorators', scrollspy);
			globalRegister('spytarget', 'decorators', spytarget);

			var ScrollSpy_ractive = exports('default', Window.extend({
			  template: {v:4,t:[{t:7,e:"tabs",m:[{t:13,n:"class",f:"alt",g:1},{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13,g:1}],f:[{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13,g:1}],f:[{t:7,e:"marked",f:["    The scroll spy decorators allow you to watch a scrollable element and check designated targets within it to keep a bound value up to date to match the scroll position.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13,g:1}],f:[{t:7,e:"marked",f:["    ### Plugin options\n\n    All options are optional.\n\n    * `name: string = 'scrollspy'` - the name to use when registering the spy decorator as a plugin\n    * `targetName: string = 'spytarget'` - the name to use when registering the spy target decorator as a plugin\n\n    ### Arguments\n\n    * #### Scroll Spy\n\n      The scroll spy decorator accepts a string keypath or a hash of options as an argument.\n\n      * `string` - the keypath of the data to keep updated with the current target\n      * `object`\n        * `path: string` - the keypath of the data to keep updated with the current target\n        * `id: string = ''` - an identifier to allow having multiple scroll spies on one page. If you try to create to spies with the same id, an error will be thrown.\n        * `target: HTMLElement = node` - the node on which to listen for scroll events\n  \n    * ### Spy Target\n\n      The spy target decorator accepts any value, any value and a string, or an options hash as arguments.\n\n      * `any` - the value to use when this target is active\n      * `any, string`\n        * `any` - the value to use when this target is active\n        * `string = ''` - the id of the spy for which this should be a target\n      * `object`\n        * `value: any` - the value to use when this target is active\n        * `id: string = ''` - the id of the spy for which this should be a target\n\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13,g:1},{n:"no-pad",f:0,t:13}],f:[{t:7,e:"split",f:[{t:7,e:"div",m:[{t:13,n:"style",f:"padding: 1em;",g:1},{n:"size",f:"20",t:13,g:1}],f:[{t:7,e:"marked",f:["          ### Template:\n\n          ```hbs\n          <div style=\"height: 100%; overflow: auto;\" as-scrollspy=`.target`>\n            Check out the target indicator over there ->\n            <div style=\"position: sticky; top: 0; left: calc(100% - 6em); width: 5em;\">{{.target}}</div>\n            {{#each [1, 2, 3, 4, 5, 6, 7]}}\n              <div style=\"min-height: 40%; margin: 2em; background-color: #eee\" as-spytarget=.>\n                Target {{.}}\n                {{#if . === 4}}{{#each [1, 2, 3, 4]}}\n                  <div style=\"height: 100%; margin: 2em; background-color: #ddd\" as-spytarget=`${^^/}.${.}`>\n                    Target {{^^/}}.{{.}}\n                  </div>\n                {{/each}}{{/if}}\n              </div>\n            {{/each}}\n          </div>\n          ```\n\n          ### Result:\n        "]}]}," ",{t:7,e:"div",m:[{t:13,n:"style",f:"height: 100%; overflow: auto;",g:1},{n:"scrollspy",t:71,f:{r:[],s:"[\".target\"]"}}],f:["Check out the target indicator over there -> ",{t:7,e:"div",m:[{t:13,n:"style",f:"position: sticky; top: 0; left: calc(100% - 6em); width: 5em;",g:1}],f:[{t:2,r:".target"}]}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"style",f:"min-height: 40%; margin: 2em; background-color: #eee;",g:1},{n:"spytarget",t:71,f:{r:["."],s:"[_0]"}}],f:["Target ",{t:2,r:"."}," ",{t:4,f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"style",f:"height: 20em; margin: 2em; background-color: #ddd;",g:1},{n:"spytarget",t:71,f:{r:["^^/","."],s:"[(\"\"+(_0)+\".\"+(_1))]"}}],f:["Target ",{t:2,r:"^^/"},".",{t:2,r:"."}]}],n:52,x:{r:[],s:"[1,2,3,4]"}}],n:50,x:{r:["."],s:"_0===4"}}]}],n:52,x:{r:[],s:"[1,2,3,4,5,6,7]"}}]}]}]}]}],e:{"[\".target\"]":function (){return([".target"]);},"[_0]":function (_0){return([_0]);},"[(\"\"+(_0)+\".\"+(_1))]":function (_0,_1){return([(""+(_0)+"."+(_1))]);},"[1,2,3,4]":function (){return([1,2,3,4]);},"_0===4":function (_0){return(_0===4);},"[1,2,3,4,5,6,7]":function (){return([1,2,3,4,5,6,7]);}}},
			  use: [split(), plugin()],
			  options: {
			    title: 'Decorator :: ScrollSpy',
			    resizable: true, flex: true,
			    width: '48em', height: '30em'
			  }
			}));

		}
	};
});
