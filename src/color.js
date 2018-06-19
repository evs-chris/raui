function clamp(v) { return Math.min(Math.max(Math.round(v), 0), 255); }
function lpad(val, pad, count) {
	if (val.length >= count) return val;
	let res = val;
	for (let i = count - val.length; i > 0; i--) {
		res = pad + res;
	}
	return res;
}
// half-even round
function round(num, count) {
	const str = `${num}`;
	const dec = str.indexOf('.');
	if (!~dec || dec + count + 1 >= str.length) return num;
	else {
		const last = +str[dec + count];
		const next = +str[dec + count + 1];
		let bit;
		if (next < 5) bit = last;
		else if (next > 5) bit = last + 1;
		else bit = last % 2 === 0 ? last : last + 1;
		
		return +(str.substring(0, dec + count) + bit);
	}
}

function dehex(str) {
	let nums;
	if (str.length === 3) nums = [str[0], str[1], str[2]];
	else if (str.length === 4) nums = [str[0], str[1], str[2], str[3]];
	else if (str.length === 6) nums = [str[0] + str[1], str[2] + str[3], str[4] + str[5]];
	else if (str.length === 8) nums = [str[0] + str[1], str[2] + str[3], str[4] + str[5], str[6] + str[7]];
	
	return nums.map((n, i) => {
		const h = n.length === 1 ? n + n : n;
		if (i === 3) return parseInt(h) / 255;
		else return parseInt(h, 16);
	});
}

function hue(p, q, t) {
	if (t < 0) t += 1;
	if (t > 1) t -= 1;
	if (t < 1/6) return p + (q - p) * 6 * t;
	if (t < 1/2) return q;
	if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
	return p;
}

function hsl2rgb(h, s, l) {
	let r, g, b;
	
	if (s === 0) {
		r = g = b = l;
	} else {
		const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;
		r = hue(p, q, h + 1/3);
		g = hue(p, q, h);
		b = hue(p, q, h - 1/3);
	}
	
	return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function rgb2hsl(ir, ig, ib) {
	const r = ir / 255;
	const g = ig / 255;
	const b = ib / 255;
	const max = Math.max(r, g, b), min = Math.min(r, g, b);
	const l = (max + min) / 2;
	let h, s;
	
	if (max === min) {
		h = s = 0;
	} else {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		h = max === r ?
			(g - b) / d + (g < b ? 6 : 0) :
			max === g ? (b - r) / d + 2 :
				(r - g) / d + 4;
	}
	
	h = h / 6;
	
	return [h, s, l];
}

const hex = /^\s*#([a-f0-9]{3,8})\s*$/i;
const rgb = /^\s*rgba?\s*\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*(?:,\s*((?:[0-9]?\.[0-9]+)|(?:[0-9](?:\.[0-9]+)?))\s*)?\)\s*$/i;
const rgbHex = /^\s*rgba?\s*\(\s*#([a-f0-9]{4,8})\s*,\s*((?:[0-9]?\.[0-9]+)|(?:[0-9](?:\.[0-9]+)?))\s*\)\s*$/i;
const hsl = /^\s*hsla?\(\s*([0-9]+(?:\.[0-9]+)?)\s*,\s*([0-9]{1,3}(?:\.[0-9]+)?)%\s*,\s*([0-9]{1,3}(?:\.[0-9]+)?)%\s*(?:,\s*((?:[0-9]?\.[0-9]+)|(?:[0-9](?:\.[0-9]+)?))\s*)?\)\s*$/i;

export class Color {
	constructor(color) {
		const val = Array.isArray(color) ? color : Color.parse(color);
		this.r = clamp(val[0]);
		this.g = clamp(val[1]);
		this.b = clamp(val[2]);
		if (3 in val && !isNaN(val[3])) this.a = val[3];
		else this.a = 1;
	}
	
	get isLight() { return this.luminance > 0.5; }
	get isDark() { return this.luminance <= 0.5; }
	
	get hue() {
		return rgb2hsl(this.r, this.g, this.b)[0] * 360;
	}
	
	get saturation() {
		return rgb2hsl(this.r, this.g, this.b)[1];
	}
	
	get luminance() {
		const r = this.r <= 10 ? this.r / 3294 : Math.pow(this.r / 269 + 0.0513, 2.4);
		const g = this.g <= 10 ? this.g / 3294 : Math.pow(this.g / 269 + 0.0513, 2.4);
		const b = this.b <= 10 ? this.b / 3294 : Math.pow(this.b / 269 + 0.0513, 2.4);
		return 0.2126 * r + 0.7152 * g + 0.0722 * b;
	}
	
	get complement() { return this.rotate(180); }
	
	get hex() { return `#${lpad(this.r.toString(16), 0, 2)}${lpad(this.g.toString(16), 0, 2)}${lpad(this.b.toString(16), 0, 2)}`; }
	get hexa() { return `#${lpad(this.r.toString(16), 0, 2)}${lpad(this.g.toString(16), 0, 2)}${lpad(this.b.toString(16), 0, 2)}${lpad(this.a.toString(16), 0, 2)}`; }
	get rgb() { return `rgb(${this.r}, ${this.g}, ${this.b})`; }
	get rgba() { return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`; }
	get hsl() {
		const hsl = rgb2hsl(this.r, this.g, this.b);
		return `hsl(${round(hsl[0] * 360, 2)}, ${round(hsl[1] * 100, 2)}%, ${round(hsl[2] * 100, 2)}%)`;
	}
	get hsla() {
		const hsl = rgb2hsl(this.r, this.g, this.b);
		return `hsla(${round(hsl[0] * 360, 2)}, ${round(hsl[1] * 100, 2)}%, ${round(hsl[2] * 100, 2)}%, ${this.a})`;
	}
	
	contrast(color) {
		const other = Color.from(color);
		if (!other) return;
		
		const here = this.luminance + 0.05;
		const there = other.luminance + 0.05;
		const ratio = '' + (Math.max(here, there) / Math.min(here, there));
		
		return ratio.substring(0, ratio.indexOf('.') + 3);
	}
	
	lighten(percent) {
		const hsl = rgb2hsl(this.r, this.g, this.b);
		hsl[2] += percent / 100;
		hsl[2] = Math.min(hsl[2], 1.0);
		const rgb = hsl2rgb(hsl[0], hsl[1], hsl[2]);
		rgb.push(this.a);
		return new Color(rgb);
	}
	
	darken(percent) { return this.lighten(percent * -1); }
	
	saturate(percent) {
		const hsl = rgb2hsl(this.r, this.g, this.b);
		hsl[1] += percent / 100;
		hsl[1] = Math.max(0, Math.min(hsl[1], 1.0));
		const rgb = hsl2rgb(hsl[0], hsl[1], hsl[2]);
		rgb.push(this.a);
		return new Color(rgb);
	}
	
	desaturate(percent) { return this.saturate(percent * -1); }
	
	rotate(angle) {
		const hsl = rgb2hsl(this.r, this.g, this.b);
		hsl[0] = (((hsl[0] * 360) + angle) % 360) / 360;
		const rgb = hsl2rgb.apply(null, hsl);
		rgb.push(this.a);
		return new Color(rgb);
	}
	
	toString() {
		return `rgb${this.a !== 1 ? 'a' : ''}(${this.r}, ${this.g}, ${this.b}${this.a !== 1 ? `, ${this.a}` : ''})`;
  }
  
  static parse(val) {
    let match;
    if (match = rgb.exec(val)) return match.slice(1).map(v => +v);
    else if (match = hex.exec(val)) {
      return dehex(match[1]);
    }	else if (match = rgbHex.exec(val)) {
      return match.slice(1).map((h, i) => i === 3 ? +h : parseInt(h.length === 1 ? h + h : h, 16));
    } else if (match = hsl.exec(val)) {
      const rgb = hsl2rgb(match[1] / 360, match[2] / 100, match[3] / 100);
      if (match[4] && !isNaN(+match[4])) rgb.push(+match[4]);
      return rgb;
    }
  }

  static from(val) {
    if (val instanceof Color) return val;
    else if (typeof val === 'string') {
      const color = Color.parse(val);
      if (color) return new Color(color);
    } else if (Array.isArray(val) && (val.length === 3 || val.length === 4)) {
      return new Color(val);
    }
  }
}

export function interpolator(from, to) {
  const c1 = new Color.from(from);
	const c2 = new Color.from(to);
	if (!c1 || !c2) return null;
	const r = c2.r - c1.r, g = c2.g - c1.g, b = c2.b - c1.b, a = c2.a - c1.a;
	return function(t) {
		return new Color([c1.r + t * r, c1.g + t * g, c1.b + t * b, c1.a + t * a]).toString();
	};
}

export default function plugin(opts = {}) {
  return function({ instance }) {
    instance.interpolators[opts.name || 'color'] = interpolator;
  };
}