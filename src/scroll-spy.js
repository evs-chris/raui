import globalRegister from './globalRegister';

const observed = [];
const targets = {};

function watch(el, id, src, opts) {
	let handle = observed.find(o => o.el === el);
	if (!handle) {
		handle = { el, ids: {} };
		observed.push(handle);
	}

	if (!handle.inited) {
		handle.inited = true;
		let lock = false;
		handle.listener = ev => {
			if (ev.target === el && !lock) {
				(window.requestAnimationFrame || setTimeout)(function() {
					updateTargets(handle);
					lock = false;
				}, 16.667);
			}
		};
		setTimeout(() => {
			handle.ready = true;
			el.addEventListener('scroll', handle.listener);
			updateTargets(handle);
		}, 5);
	}

	if (!handle.ids[id]) handle.ids[id] = [];
	handle.ids[id].push({ node: src, opts });

	return handle;
}

function unwatch(el, id, src) {
	let handle = observed.find(o => o.el === el);

	if (handle) {
		const id = handle.ids[id];
		if (id) {
			id.splice(id.indexOf(src), 1);
		}

		for (let k in handle.ids) {
			if (handle.ids[k].length) return;
		}

		handle.inited = false;
		handle.el.removeEventListener('scroll', handle.listener);
	}
}

function updateTargets(handle) {
	const root = handle.el === document ? document.body : handle.el;
	const pos = scrollTop(root);
	const height = root.scrollHeight;

	if (!handle.ready) return;

	// loop through relevant ids attached to this node
	for (let id in handle.ids) {
		// check targets for current id
		const h = handle.ids[id][0];
		let cur = h.current;
		const prev = cur;

		const range = h.opts.range === undefined ? 0 : h.opts.range;
		let spot = pos;
		if (h.opts.offset) {
			if (h.opts.offset <= 1 && h.opts.offset >= 0) spot += (root.clientHeight * h.opts.offset);
			else if (h.opts.offset > 1) spot += h.opts.offset;
		}

		let dist = root.scrollHeight;
		if (cur) {
			const t = top(cur.node, root);
			if (!range || (range > 0 && t > spot) || (range < 0 && t < spot)) dist = Math.abs(t - spot);
		}

		const ts = targets[id] || [];
		for (let i = 0; i < ts.length; i++) {
			const t = top(ts[i].node, root);
			if (range && ((range > 0 && t < spot) || (range < 0 && t > spot))) continue;
			const y = Math.abs(t - spot);
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
					if (prev.ctx.element.attributes.find(a => a.events && ~a.template.n.indexOf('firstscrollspyout'))) prev.ctx.raise('firstscrollspyout');
				}
				if (prev.ctx.element.attributes.find(a => a.events && ~a.template.n.indexOf('scrollspyout'))) prev.ctx.raise('scrollspyout');
			}
			if (!cur.hit) {
				cur.hit = true;
				if (cur.ctx.element.attributes.find(a => a.events && ~a.template.n.indexOf('firstscrollspy'))) cur.ctx.raise('firstscrollspy');
			}
			if (cur.ctx.element.attributes.find(a => a.events && ~a.template.n.indexOf('scrollspy'))) cur.ctx.raise('scrollspy');

			// TODO: fire events on spy el

			h.current = cur;
		}
	}

	if (root.scrollHeight !== height) updateTargets(handle);
}

function scrollTop(node) {
	if (node === document.body) {
		const style = window.getComputedStyle(node);
		if (style.overflowY !== 'auto' && style.overflowY !== 'scroll') {
			return window.scrollY;
		}
	}

	return node.scrollTop;
}

function top(node, from) {
	let y = node.offsetTop;
	let n = node;

	while (n.offsetParent) {
		n = n.offsetParent;
		if (n === from) break;
		y += n.offsetTop;
	}

	return y;
}

export function scrollspy(node, args, optId) {
	let opts;
	if (typeof args === 'string') opts = { path: args };
	else opts = args || {};

	const id = opts.id || optId || '';
	let root = opts.target || node;
	if (root !== document) {
		if (root) {
			const style = window.getComputedStyle(root);
			const overflow = style['overflow-y'];
			if (overflow !== 'scroll' && overflow !== 'auto') root = document;
			else if (!style.position || style.position === 'static') root.style.position = 'relative';
		} else root = document;
	}

	let handle = observed.find(o => o.ids[id]);
	if (handle) {
		console.error(`Can't to create duplicate scrollspy id '${id}'`);
		return { update() {}, teardown() {} };
	}

	handle = watch(root, id, node, opts);

	const h = handle.ids[id].find(o => o.node === node);
	if (h) h.ctx = this.getContext(node);

	return {
		update(args, optId) {
			if (h) {
				let opts;
				if (typeof args === 'string') opts = { path: args };
				else opts = args || {};
				opts.id = opts.id || optId || '';
				h.opts = opts;
			}
		},
		teardown() {
			unwatch(root, id, node);
		},
		id
	}
}

export function spytarget(node, args, optId) {
	let opts;
	if (args !== undefined && typeof args !== 'object') opts = { value: args };
	else opts = args || {};

	let id = opts.id || optId || '';

	// wait a tick to set everything up so that implicit parent ids can be found
	setTimeout(() => {
		if (!id) {
			let n = node.parentNode;
			let ctx = this.getContext(n);

			while (n && ctx) {
				if (ctx.decorators.scrollspy) {
					id = ctx.decorators.scrollspy.id;
					break;
				}
				n = n.parentNode;
				ctx = this.getContext(n);
			}
		}

		const ts = targets[id] || (targets[id] = []);
		const obj = { node, opts, ctx: this.getContext(node) };
		ts.push(obj);

		observed.filter(o => o.ids[id]).forEach(updateTargets);
	}, 0);

	return {
		update(args, optId) {
			let opts;
			if (args !== undefined && typeof args !== 'object') opts = { value: args };
			else opts = {};
			opts.id = opts.id || optId || id || '';
			obj.opts = opts;
		},
		teardown() {
			ts.splice(ts.indexOf(obj), 1);
			const handle = observed.find(o => o.ids[id]);
			updateTargets(handle);
		},
		id
	}
}

export function plugin(opts = {}) {
	return function({ instance }) {
		instance.decorators[opts.name || 'scrollspy'] = scrollspy;
		instance.decorators[opts.targetName || 'spytarget'] = spytarget;
	}
}

globalRegister('scrollspy', 'decorators', scrollspy);
globalRegister('spytarget', 'decorators', spytarget);

export default plugin;