var win = typeof window !== 'undefined' ? window : null;

function globalRegister(name, registry, constructor) {
  if (win && win.Ractive && typeof win.Ractive[registry] === 'object') {
    var script = document.currentScript;
    if (!script) {
      script = document.querySelectorAll('script');
      script = script[script.length - 1];
    }

    if (script) {
      var aliases = script.getAttribute('data-alias');
      if (aliases) {
        aliases = aliases.split('&');
        aliases = aliases.reduce(function (a, c) {
          var ref = c.split('=');
          var k = ref[0];
          var v = ref[1];
          a[k] = v;
          return a;
        }, {});
      }

      Ractive[registry][(aliases && aliases[name]) || name] = constructor;
    }
  }
}

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

globalRegister('scrollspy', 'decorators', scrollspy);
globalRegister('spytarget', 'decorators', spytarget);

export { scrollspy, spytarget };
