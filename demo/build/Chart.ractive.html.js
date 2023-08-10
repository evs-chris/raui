System.register(['./chunk2.js', 'ractive'], function (exports, module) {
  'use strict';
  var globalRegister, Window, Ractive$1;
  return {
    setters: [function (module) {
      globalRegister = module.default;
      Window = module.Window;
    }, function (module) {
      Ractive$1 = module.default;
    }],
    execute: function () {

      function chonk(r1, r2, startPct, pct) {
        var t1 = ((startPct > 1 ? startPct / 100 : startPct) * 360) * (Math.PI / 180);
        var cos1 = Math.cos(t1);
        var sin1 = Math.sin(t1);
        if (pct > 1) { pct /= 100; }
        if (pct >= 1) { pct = 0.99995; }
        var t2 = (pct * 360) * (Math.PI / 180);
        var cos2 = Math.cos(t2);
        var sin2 = Math.sin(t2);
        var pt1 = [0 * cos1 - r1 * sin1, 0 * sin1 + r1 * cos1];
        var pt2 = [0 * cos1 - r2 * sin1, 0 * sin1 + r2 * cos1];
        var pt3 = [pt1[0] * cos2 - pt1[1] * sin2, pt1[0] * sin2 + pt1[1] * cos2];
        var pt4 = [pt2[0] * cos2 - pt2[1] * sin2, pt2[0] * sin2 + pt2[1] * cos2];
        
        var bits = pct < 0.5 ? ['0 0 1', '0 0 0'] : ['0 1 1', '0 1 0'];

        return ("M " + (pt1[0]) + "," + (pt1[1]) + " " + (pt2[0]) + "," + (pt2[1]) + " A " + (Math.abs(r2)) + "," + (Math.abs(r2)) + " " + (bits[0]) + " " + (pt4[0]) + "," + (pt4[1]) + " L " + (pt3[0]) + "," + (pt3[1]) + " A " + (Math.abs(r1)) + "," + (Math.abs(r1)) + " " + (bits[1]) + " " + (pt1[0]) + "," + (pt1[1]) + " Z");
      }

      function bezierControl(start, cur, prev, next, smooth) {
        var p = prev || cur;
        var n = next || cur;
        
        var len, a;
        {
          var lenX = n.x - p.x;
          var lenY = n.y2 - p.y2;
          len = Math.sqrt(Math.pow(lenX, 2) + Math.pow(lenY, 2));
          a = Math.atan2(lenY, lenX);
        }
        
        if (!start) { a += Math.PI; }
        len *= smooth;
        
        return [
          cur.x + Math.cos(a) * len,
          cur.y2 + Math.sin(a) * len
        ];
      }

      var Chart = /*@__PURE__*/(function (Ractive) {
        function Chart(opts) { Ractive.call(this, opts); }

        if ( Ractive ) Chart.__proto__ = Ractive;
        Chart.prototype = Object.create( Ractive && Ractive.prototype );
        Chart.prototype.constructor = Chart;

        return Chart;
      }(Ractive$1));

      /**
       * data: { value, label, color}[] || { values: { value, label }[], label, color }[]
       * type: line|bar|pie|donut|tire|hoop
       * horizontal: boolean (for bars - default false)
       * colors: string[] (list of colors to assign to uncolored data points)
       * point: number (width of data points - default 30)
       * space: number (distance between bars bar graph - default 5)
       * flip: boolean (invert graph - line, bar - default false)
       * dot: number (radius of line graph points - default 3)
       * smooth: number (apply smoothing rate (0.2 recommended) to line chart beziers - default none)
       * project: boolean (allow line chart to project when smoothed - default false)
       * span: number (target height of the viewbox for line, bar - default 200)
       * sub: cluster|stack (sub type for bar graphs - default cluster)
       */

      Ractive$1.extendWith(Chart, {
        template: {v:4,t:[{t:7,e:"div",m:[{n:"class",f:["rg-graph rg-graph-",{t:2,r:".type"}],t:13},{t:4,f:[{n:"class-rg-graph-h",t:13,f:[{t:2,r:"graph.horiz"}]},{n:"class-rg-graph-v",t:13,f:[{t:2,x:{r:["graph.horiz"],s:"!_0"}}]}],n:50,x:{r:[".type"],s:"_0===\"bar\""}},{t:16,r:"extra-attributes"}],f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rg-graph-circular",g:1}],f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rg-graph-middle",g:1}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rg-content",g:1}],f:[{t:16,z:[{n:"selected",x:{r:"~/selected"}},{n:"hovered",x:{r:"~/hovered"}}]}]}]}],n:50,x:{r:[".type","@this.partials.content"],s:"(_0===\"donut\"||_0===\"tire\"||_0===\"hoop\")&&_1"}}," ",{t:7,e:"svg",m:[{n:"width",f:"100%",t:13,g:1},{n:"height",f:"100%",t:13,g:1},{n:"viewBox",f:"-55 -55 110 110",t:13,g:1},{t:4,f:[{t:16,r:"svgA"}],n:50,r:"~/svgA"}],f:[{t:4,f:[{t:7,e:"path",m:[{n:"d",f:[{t:2,r:".d"}],t:13},{n:"class",f:["rg-chonk rg-chonk-",{t:2,r:"@index"}],t:13},{t:4,f:[{n:["click"],t:70,f:{r:[".","@context",".value",".label",".point"],s:"[_0.click((_1),_2,_3,_4)]"}}],n:50,r:".click"},{n:["click"],t:70,f:{r:[".value",".label",".point"],s:"[[\"select\",_0,_1,_2]]"}},{n:"style-fill",f:[{t:2,r:".color"}],t:13},{n:["mouseenter"],t:70,f:{r:[".value",".label",".point"],s:"[[\"hover\",_0,_1,_2]]"}}],f:[{t:4,f:[{t:7,e:"title",f:[{t:2,r:".label"}," ",{t:4,f:["(",{t:2,r:".value"},")"],n:51,r:"~/nolabelvalue"},{t:4,f:[{t:2,x:{r:[".sublabel"],s:"\"\\n\"+_0"}}],n:50,r:".sublabel"}]}],n:50,r:".label"}]}],n:52,r:"chonks"}]}]}],n:50,x:{r:[".type"],s:"_0===\"pie\"||_0===\"donut\"||_0===\"tire\"||_0===\"hoop\""}},{t:4,f:[{t:7,e:"svg",m:[{n:"viewBox",f:["0 0 ",{t:2,x:{r:["graph.horiz","~/span","graph.span"],s:"_0?_1:_2"}}," ",{t:2,x:{r:["graph.horiz","graph.span","~/span"],s:"_0?_1:_2"}}],t:13},{t:4,f:[{n:"style-min-height",f:[{t:2,r:"graph.span"},"px"],t:13}],n:50,r:"graph.horiz"},{t:4,f:[{n:"style-min-width",f:[{t:2,r:"graph.span"},"px"],t:13}],n:51,l:1},{t:4,f:[{t:16,r:"svgA"}],n:50,r:"~/svgA"}],f:[{t:4,f:[{t:4,f:[{t:4,f:[{t:7,e:"path",m:[{n:"d",f:["M ",{t:2,r:".y"},",",{t:2,r:".x"}," ",{t:2,r:".y"},",",{t:2,r:".x2"},", ",{t:2,r:".y2"},",",{t:2,r:".x2"}," ",{t:2,r:".y2"},",",{t:2,r:".x"}," Z"],t:13},{n:"style-fill",f:[{t:2,r:".color"}],t:13},{t:4,f:[{n:["click"],t:70,f:{r:[".","@context",".value",".label",".point"],s:"[_0.click((_1),_2,_3,_4)]"}}],n:50,r:".click"},{n:["click"],t:70,f:{r:[".value",".label",".point"],s:"[[\"select\",_0,_1,_2]]"}},{n:["mouseenter"],t:70,f:{r:[".value",".label",".point"],s:"[[\"hover\",_0,_1,_2]]"}}],f:[{t:7,e:"title",f:[{t:4,f:[{t:2,r:".label"},{t:4,f:[" (",{t:2,r:".value"},")"],n:51,r:"~/nolabelvalue"},{t:4,f:[{t:2,x:{r:[".sublabel"],s:"\"\\n\"+_0"}}],n:50,r:".sublabel"}],n:50,r:".label"},{t:4,f:[{t:2,r:".value"}],n:51,l:1}]}]}],n:52,i:"idx",r:".points"}],n:52,i:"grp",r:"graph.groups"}," ",{t:7,e:"path",m:[{n:"d",f:["M ",{t:2,r:"graph.bottom"},",0 ",{t:2,r:"graph.bottom"},",",{t:2,r:"graph.span"}," Z"],t:13},{n:"stroke",f:"#000",t:13,g:1},{n:"stroke-width",f:"1",t:13,g:1}]}],n:50,r:"graph.horiz"},{t:4,f:[{t:4,f:[{t:4,f:[{t:7,e:"path",m:[{n:"d",f:["M ",{t:2,r:".x"},",",{t:2,r:".y"}," ",{t:2,r:".x"},",",{t:2,r:".y2"},", ",{t:2,r:".x2"},",",{t:2,r:".y2"}," ",{t:2,r:".x2"},",",{t:2,r:".y"}," Z"],t:13},{n:"style-fill",f:[{t:2,r:".color"}],t:13},{t:4,f:[{n:["click"],t:70,f:{r:[".","@context",".value",".label",".point"],s:"[_0.click((_1),_2,_3,_4)]"}}],n:50,r:".click"},{n:["click"],t:70,f:{r:[".value",".label",".point"],s:"[[\"select\",_0,_1,_2]]"}},{n:["mouseenter"],t:70,f:{r:[".value",".label",".point"],s:"[[\"hover\",_0,_1,_2]]"}}],f:[{t:7,e:"title",f:[{t:4,f:[{t:2,r:".label"},{t:4,f:[" (",{t:2,r:".value"},")"],n:51,r:"~/nolabelvalue"},{t:4,f:[{t:2,x:{r:[".sublabel"],s:"\"\\n\"+_0"}}],n:50,r:".sublabel"}],n:50,r:".label"},{t:4,f:[{t:2,r:".value"}],n:51,l:1}]}]}],n:52,r:".points"}],n:52,r:"graph.groups"}," ",{t:7,e:"path",m:[{n:"d",f:["M 0,",{t:2,r:"graph.bottom"}," ",{t:2,r:"graph.span"},",",{t:2,r:"graph.bottom"}," Z"],t:13},{n:"stroke",f:"#000",t:13,g:1},{n:"stroke-width",f:"1",t:13,g:1}]}],n:51,l:1}]}," "],n:50,x:{r:[".type"],s:"_0===\"bar\""},l:1},{t:4,f:[" ",{t:7,e:"svg",m:[{n:"viewBox",f:[{t:2,x:{r:["~/dot"],s:"-_0"}}," ",{t:2,x:{r:["~/span","graph.maxY","~/dot"],s:"Math.min(_2*-2,((_0+(2*_2))-_1)-(2*_2))"}}," ",{t:2,x:{r:["graph.span","~/dot"],s:"_0+(2*_1)"}}," ",{t:2,x:{r:["~/span","graph.maxY","graph.minY","~/dot"],s:"Math.max(_0+(4*_3),_1+(-1*Math.min(_2,0))+(4*_3))"}}],t:13},{n:"style-min-width",f:[{t:2,r:"graph.span"},"px"],t:13},{t:4,f:[{t:16,r:"svgA"}],n:50,r:"~/svgA"}],f:[{t:7,e:"path",m:[{n:"d",f:["M 0,",{t:2,r:"graph.bottom"}," ",{t:2,r:"graph.span"},",",{t:2,r:"graph.bottom"}," Z"],t:13},{n:"stroke",f:"#000",t:13,g:1},{n:"stroke-width",f:"1",t:13,g:1}]}," ",{t:4,f:[{t:7,e:"path",m:[{n:"d",f:["M ",{t:2,x:{r:["graph.minX","~/dot"],s:"_0+_1"}},",",{t:2,r:"graph.bottom"}," ",{t:4,f:[{t:4,f:[{t:4,f:["S ",{t:2,r:".sx"},",",{t:2,r:".sy"}," ",{t:2,r:".x"},",",{t:2,r:".y2"}],n:50,r:"~/project"},{t:4,f:["C ",{t:2,r:".sx"},",",{t:2,r:".sy"}," ",{t:2,r:".ex"},",",{t:2,r:".ey"}," ",{t:2,r:".x"},",",{t:2,r:".y2"}],n:51,l:1}],n:50,x:{r:["."],s:"\"sx\" in _0"}},{t:4,f:["L ",{t:2,r:".x"},",",{t:2,r:".y2"}],n:51,l:1},{t:2,x:{r:[],s:"\" \""}}],n:52,r:".points"}," L ",{t:2,r:"~/graph.maxX"},",",{t:2,r:"~/graph.bottom"}," Z"],t:13},{n:"fill",f:[{t:2,r:".color"}],t:13},{t:4,f:[{n:"opacity",f:"0.6",t:13}],n:50,x:{r:["~/graph.groups.length"],s:"_0>1"}},{t:4,f:[{n:"opacity",f:"0.8",t:13}],n:51,l:1},{n:"stroke",f:"#000",t:13,g:1},{n:"stroke-width",f:"1",t:13,g:1}]}],n:52,r:"graph.groups"}," ",{t:4,f:[{t:4,f:[{t:7,e:"circle",m:[{n:"r",f:[{t:2,r:"~/dot"}],t:13},{n:"cx",f:[{t:2,r:".x"}],t:13},{n:"cy",f:[{t:2,r:".y2"}],t:13},{n:"fill",f:[{t:4,f:[{t:2,r:".color"}],n:50,x:{r:["~/graph.groups.length"],s:"_0===1"}},{t:4,f:[{t:2,r:"^^/color"}],n:51,l:1}],t:13},{t:4,f:[{n:["click"],t:70,f:{r:[".","@context",".value",".label",".point"],s:"[_0.click((_1),_2,_3,_4)]"}}],n:50,r:".click"},{n:["click"],t:70,f:{r:[".value",".label",".point"],s:"[[\"select\",_0,_1,_2]]"}},{n:"stroke-width",f:"1",t:13,g:1},{n:"stroke",f:"#000",t:13,g:1},{n:["mouseenter"],t:70,f:{r:[".value",".label",".point"],s:"[[\"hover\",_0,_1,_2]]"}}],f:[{t:7,e:"title",f:[{t:4,f:[{t:2,r:".label"},{t:4,f:[" (",{t:2,r:".value"},")"],n:51,r:"~/nolabelvalue"},{t:4,f:[{t:2,x:{r:[".sublabel"],s:"\"\\n\"+_0"}}],n:50,r:".sublabel"}],n:50,r:".label"},{t:4,f:[{t:2,r:".value"}],n:51,l:1}]}]}],n:52,r:".points"}],n:52,r:"graph.groups"}]}],n:50,x:{r:[".type"],s:"_0===\"line\""},l:1}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rg-legend",g:1}],f:[{t:4,f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rg-legend-entry",g:1}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rg-legend-color",g:1},{n:"style",f:["background-color: ",{t:2,r:".color"},";"],t:13}]}," ",{t:2,r:".label"}]}],n:52,r:"chonks"}],n:50,x:{r:[".type"],s:"_0!==\"bar\"&&_0!==\"line\""}},{t:4,f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rg-legend-entry",g:1}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rg-legend-color",g:1},{n:"style",f:["background-color: ",{t:2,r:".color"},";"],t:13}]}," ",{t:2,r:".label"}]}],n:52,r:"graph.groups.0.points"}," "],n:50,x:{r:[".type","graph.groups.length"],s:"_0===\"line\"&&_1===1"},l:1},{t:4,f:[" ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rg-legend-entry",g:1}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rg-legend-color",g:1},{n:"style",f:["background-color: ",{t:2,r:".color"},";"],t:13}]}," ",{t:2,r:".label"}]}],n:52,r:"graph.groups"}],n:51,l:1}]}],n:50,r:"~/legend"}]}],e:{"!_0":function (_0){return(!_0);},"_0===\"bar\"":function (_0){return(_0==="bar");},"(_0===\"donut\"||_0===\"tire\"||_0===\"hoop\")&&_1":function (_0,_1){return((_0==="donut"||_0==="tire"||_0==="hoop")&&_1);},"[_0.click((_1),_2,_3,_4)]":function (_0,_1,_2,_3,_4){return([_0.click((_1),_2,_3,_4)]);},"[[\"select\",_0,_1,_2]]":function (_0,_1,_2){return([["select",_0,_1,_2]]);},"[[\"hover\",_0,_1,_2]]":function (_0,_1,_2){return([["hover",_0,_1,_2]]);},"\"\\n\"+_0":function (_0){return("\n"+_0);},"_0===\"pie\"||_0===\"donut\"||_0===\"tire\"||_0===\"hoop\"":function (_0){return(_0==="pie"||_0==="donut"||_0==="tire"||_0==="hoop");},"_0?_1:_2":function (_0,_1,_2){return(_0?_1:_2);},"-_0":function (_0){return(-_0);},"Math.min(_2*-2,((_0+(2*_2))-_1)-(2*_2))":function (_0,_1,_2){return(Math.min(_2*-2,((_0+(2*_2))-_1)-(2*_2)));},"_0+(2*_1)":function (_0,_1){return(_0+(2*_1));},"Math.max(_0+(4*_3),_1+(-1*Math.min(_2,0))+(4*_3))":function (_0,_1,_2,_3){return(Math.max(_0+(4*_3),_1+(-1*Math.min(_2,0))+(4*_3)));},"_0+_1":function (_0,_1){return(_0+_1);},"\"sx\" in _0":function (_0){return("sx" in _0);},"\" \"":function (){return(" ");},"_0>1":function (_0){return(_0>1);},"_0===1":function (_0){return(_0===1);},"_0===\"line\"":function (_0){return(_0==="line");},"_0!==\"bar\"&&_0!==\"line\"":function (_0){return(_0!=="bar"&&_0!=="line");},"_0===\"line\"&&_1===1":function (_0,_1){return(_0==="line"&&_1===1);}}},
        css: " .rg-graph { position: relative; display: flex; flex-direction: row; justify-content: center; width: 100%; height: 100%; box-sizing: border-box; } .rg-graph-circular { position: relative; width: 100%; height: 0; padding-bottom: 100%; } .rg-graph-circular svg { position: absolute; left: 0; top: 0; } .rg-graph svg { box-sizing: border-box; } .rg-graph-pie .rg-chonk, .rg-graph-donut .rg-chonk, .rg-graph-tire .rg-chonk { transition: transform 0.3s ease, opacity 0.3s ease; } .rg-chonk { opacity: 0.8; user-select: none; } .rg-chonk.clicky { cursor: pointer; } .rg-graph-pie .rg-chonk:hover, .rg-graph-donut .rg-chonk:hover, .rg-graph-tire .rg-chonk:hover { transform: scale(1.1); opacity: 1; } .rg-graph-pie .rg-chonk:active, .rg-graph-donut .rg-chonk:active, .rg-graph-tire .rg-chonk:active { transform: none; } .rg-graph-hoop .rg-chonk:hover { opacity: 1; } .rg-graph-middle { position: absolute; display: flex; align-items: center; justify-content: space-around; text-align: center; } .rg-graph-middle .rg-content { display: inline-block; } .rg-graph-donut .rg-graph-middle { top: 36%; left: 36%; width: 28%; height: 28%; } .rg-graph-tire .rg-graph-middle { left: 28%; top: 28%; height: 43%; width: 43%; } .rg-graph-hoop .rg-graph-middle { left: 14%; top: 14%; width: 72%; height: 72%; } /* bar */ .rg-graph-bar.rg-graph-h { overflow-y: auto; } .rg-graph-bar.rg-graph-h svg { width: 100%; } .rg-graph-bar.rg-graph-v, .rg-graph-line { overflow-x: auto; } .rg-graph-bar.rg-graph-v svg, .rg-graph-line svg { height: 100%; } .rg-legend { display: flex; flex-direction: column; padding-left: 0.5em; justify-content: center; } .rg-legend-entry { padding: 0.25em 0 0.25em 0; line-height: 0.9em; } .rg-legend-color { display: inline-block; width: 1em; height: 1em; }",
        cssId: 'rchart',
        noCssTransform: true,
        attributes: ['data', 'type', 'horizontal', 'colors', 'point', 'space', 'flip', 'dot', 'smooth', 'project', 'span', 'sub', 'legend', 'hole', 'clustergap', 'nolabelvalue'],
        computed: {
          chonks: function chonks() {
            var data = this.get('data');
            if (!Array.isArray(data)) { data = []; }
            else if (Array.isArray(data[0])) { data = data[0]; }
            var total = data.reduce(function (a, c) { return a + Math.abs(c.value); }, 0);
            var type = this.get('type');
            var colors = this.get('colors');
            var inner = this.get('hole') || (type === 'pie' ? 0 : type === 'donut' ? 15 : type === 'tire' ? 25 : 40);
            var agg = 0;
            return data.map(function (d, i) {
              var percent = Math.abs(d.value) / total;
              var datum = Object.assign({
                idx: i,
                percent: percent,
                d: chonk(inner, 50, agg, percent),
                point: d,
              }, d);
              if (!datum.color) { datum.color = colors[i % colors.length]; }
              agg += percent;
              return datum;
            });
          },
          graph: function graph() {
            var this$1 = this;

            var data = this.get('data');
            if (!Array.isArray(data)) { data = [[]]; }
            if (!Array.isArray(data[0])) { data = [data]; }

            var type = this.get('type');
            var ref = data.reduce(function (a, c) {
              return c.reduce(function (aa, cc) {
                if (cc.value < a[0]) { a[0] = cc.value; }
                if (cc.value > a[1]) { a[1] = cc.value; }
                return a;
              }, 0);
            }, [0, 0]);
            var min = ref[0];
            var max = ref[1];
            var dot = this.get('dot') || 1;
            var range = max - min;
            var bottom = min < 0 ? min * -1 : -min;
            var colors = this.get('colors');
            var point = this.get('point');
            var space = type === 'line' ? 0 : this.get('space');
            
            var horiz = this.get('horizontal');
            var flip = horiz ? this.get('flip') : !this.get('flip');
            
            var bar = this.get('span');
            var smooth = type === 'line' && this.get('smooth');
            var project = this.get('project');
            
            var points;
            if (type === 'line') {
              points = data.map(function (ps) {
                return ps.map(function (d, i) {
                  var p = Object.assign({
                    x: i * point + i * space + space,
                    y: (bottom / range) * bar,
                    y2: ((d.value + bottom) / range) * bar,
                    idx: i,
                    point: d,
                  }, d);
                  p.x2 = p.x + point;
                  p.comp = p.y2;
                  p.x += dot;
                  p.x2 += dot;
                  if (smooth && project && i > 0 && i + 1 < ps.length) {
                    var prev = ((ps[i - 1].value + bottom) / range) * bar;
                    var next = ((ps[i + 1].value + bottom) / range) * bar;
                    var off = (prev + next + p.comp) / 6;
                    if (prev > p.comp) { p.comp = p.comp - off; }
                    else { p.comp = p.comp + off; }
                  }
                  if (flip) {
                    p.y = bar - p.y;
                    p.y2 = bar - p.y2;
                  }
                  if (!p.color) { p.color = colors[i % colors.length]; }
                  return p;
                });
              });
              
              if (smooth) {
                points.forEach(function (points, i) {
                  points.forEach(function (p, i) {
                    var assign, assign$1;

                    if (i === 0) { return; }
                    (assign = bezierControl(true, points[i - 1], points[i - 2], p, smooth), p.sx = assign[0], p.sy = assign[1]);
                    (assign$1 = bezierControl(false, p, points[i - 1], points[i + 1], smooth), p.ex = assign$1[0], p.ey = assign$1[1]);
                  });
                });
              }
            } else {
              var single = false;
              var orig = data;
              if (data.length === 1 && Array.isArray(data[0])) {
                single = true;
                data = data[0].map(function (d) { return data[0]; });
              }
              var off = point / data.length;
              var sub$1 = this.get('sub') || 'cluster';
              var gap = this.get('clustergap') || 0;
              points = data.map(function (ds, i) {
                var ps = ds.map(function (_, ii) { return data[ii] && data[ii][i] || { value: 0 }; });
                var res = ps.map(function (d, ii) {
                  var p = Object.assign({
                    x: i * point + i * space + space,
                    y: (bottom / range) * bar,
                    y2: ((d.value + bottom) / range) * bar,
                    idx: i,
                    point: d,
                    }, d, { label: single ? orig[0][i].label : d.label });
                  p.x2 = p.x + point;
                  p.comp = p.y2;
                  if (!single && sub$1 === 'cluster') {
                    p.x += off * ii;
                    p.x2 = p.x + off - gap;
                  }
                  if (flip) {
                    p.y = bar - p.y;
                    p.y2 = bar - p.y2;
                  }
                  if (!p.color) { p.color = colors[(single ? i : ii) % colors.length]; }
                  return p;
                });
                if (sub$1 === 'stack') { res.sort(function (l, r) { return l.value > r.value ? -1 : l.value < r.value ? 1 : 0; }); }
                return res;
              });
            }

            var groups = points.map(function (points, i) {
              var g = { points: points, color: colors[i % colors.length] };
              var base = type === 'bar' && this$1.get('sub') === 'stack' ? data[i] : points;
              if (base && base[i] && base[i].label) { g.label = base[i].label; }
              return g;
            });
            if (type === 'line') {
              groups.sort(function (l, r) {
                var avgl = l.points.reduce(function (a, c) { return a + c.value; }, 0) / l.points.length;
                var avgr = r.points.reduce(function (a, c) { return a + c.value; }, 0) / r.points.length;
                return (avgl < avgr ? 1 : avgl > avgr ? -1 : 0);
              });
              groups.forEach(function (g, i) { return g.color = colors[i % colors.length]; });
            }

            var len = data.reduce(function (a, c) { return c.length > a ? c.length : a; }, 0);

            return {
              bottom: flip ? bar - (bottom / range) * bar : (bottom / range) * bar,
              min: min, max: max,
              horiz: type === 'line' ? false : horiz, flip: flip,
              span: (type === 'line' ? len - 1 : len) * point + (len + 2) * space + (type === 'line' ? dot * 2 : 0),
              minX: points.reduce(function (a, ps) { return ps.reduce(function (aa, c) { return c.x < aa ? c.x : aa; }, a); }, 0),
              maxX: points.reduce(function (a, ps) { return ps.reduce(function (aa, c) { return c.x > aa ? c.x : aa; }, a); }, 0),
              minY: points.reduce(function (a, ps) { return ps.reduce(function (aa, c) { return c.comp < aa ? c.comp : aa; }, a); }, 0),
              maxY: points.reduce(function (a, ps) { return ps.reduce(function (aa, c) { return c.comp > aa ? c.comp : aa; }, a); }, 0),
              groups: groups
            };
          }
        },
        data: function data() {
          return {
            colors: ['#1f5b93', '#F8D306', '#03aa0f', '#d21a1a', '#2DD3C7', '#633294', '#FB4700'],
            point: 30,
            space: 5,
            dot: 3,
            span: 200,
            color: '#1f5b93'
          }
        },
        on: {
          construct: function construct() {
            var cmp = this.component;
            if (!cmp) { return; }

            var tpl = cmp.template.f || [];
            var svg = tpl.find(function (e) { return e.e === 'svg'; });
            if (svg) { this._svgA = svg.m; }
          },
          config: function config() {
            if (this._svgA) { this.set('svgA', this._svgA); }
          },
        }
      });

      function plugin(opts) {
        if ( opts === void 0 ) opts = {};

        return function(ref) {
          var instance = ref.instance;

          instance.components[opts.name || 'chart'] = Chart;
        };
      }

      globalRegister('RauiChart', 'components', Chart);

      var Chart_ractive = exports('default', Window.extend({
        template: {v:4,t:[{t:7,e:"tabs",m:[{t:13,n:"class",f:"alt",g:1},{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13,g:1}],f:[{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13,g:1}],f:[{t:7,e:"marked",f:["    The `chart` component allows displaying specially formatted data as a configurable `svg` chart, optionally\n    with a legend. Data points are required to have a `value` property, and may optionally specify a `label`, `sublabel`, and `color`. \n\n    Pie, donut, tire, and hoop charts can display single-dimension data, and bar and line charts can display both\n    single- and two-dimension data. Bar charts displaying two-dimension data can display as stacks or as\n    clustered mini bars.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13,g:1}],f:[{t:7,e:"marked",f:["    ### Plugin Options\n\n    * `name: string = 'chart'` - the name to use when registering the plugin as a component\n\n    ### Attributes\n\n    All attributes are optional.\n\n    * `data: { value, label, color, sublabel, ... }[] | { value, label, color, sublabel, ... }[][]` - The base data for the chart to display\n    * `type: pie|donut|tire|hoop|line|bar` - The type of chart to render\n    * `horizontal: booean = false` - For bar charts, switch from vertical bars to horizontal bars\n    * `colors: string[]` - A list of colors to assign to uncolored data points\n    * `point: number = 30` - The with of data points on bar charts\n    * `space: number = 5` - The distance between bars on bar charts\n    * `flip: boolean = false` - Invert line or bar graphs such that the negative y-axis is at the top\n    * `nolabelvalue: boolean = false` - Leave the value out of the label title on data points\n    * `dot: number = 3` - The radius of points on line charts\n    * `smooth: number` - Apply smoothing to line charts using a bezier (0.2 is recommended if you want smoothing)\n    * `project: boolean = false` - Allow line charts to project when smoothed\n    * `span: number = 200` - Target height of the viewbox for line and bar charts\n    * `sub: cluster|stack = cluster` - Sub-type for bar charts, where cluster groups bars from parallel data points and stack overlays them\n    * `legend: boolean = false` - Include a legend\n    * `hole: number` - For circular charts, override the size of the central hole (defaults are pie: 0, donut: 15, tire: 25, and hoop: 40)\n    * `clustergap: number` - The gap between individual bars in a clustered bar chart\n\n    ### Events\n\n    * `select` - Fires when a value (segment, bar, or line point) is clicked with the value and label as the two arguments\n    * `hover` - Fires when a value (segment, bar, or line point) receives a mouseover event with the value and label as the two arguments\n\n    ### Children\n\n    * `<svg>` - Attributes added to an option svg child element are passed through to the internal svg element.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"grid",t:71},{n:"title",f:"Example",t:13,g:1}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"row row-s1-2 row-m1-4",g:1}],f:[{t:7,e:"label",m:[{n:"field",t:71}],f:["Type",{t:7,e:"select",m:[{n:"value",f:[{t:2,r:".type"}],t:13}],f:[" ",{t:7,e:"option",f:["pie"]},{t:7,e:"option",f:["donut"]},{t:7,e:"option",f:["tire"]},{t:7,e:"option",f:["hoop"]}," ",{t:7,e:"option",f:["bar"]}," ",{t:7,e:"option",f:["line"]}]}]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".legend"}],t:13}]}," Legend?"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".nolabelvalue"}],t:13}]}," No label value?"]}," ",{t:4,f:[{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".flip"}],t:13}]}," Flip?"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["Span",{t:7,e:"input",m:[{n:"type",f:"number",t:13},{n:"value",f:[{t:2,r:".span"}],t:13},{n:"step",f:"1",t:13}]}]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["Point",{t:7,e:"input",m:[{n:"type",f:"number",t:13},{n:"value",f:[{t:2,r:".point"}],t:13},{n:"step",f:"1",t:13}]}]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["Space",{t:7,e:"input",m:[{n:"type",f:"number",t:13},{n:"value",f:[{t:2,r:".space"}],t:13},{n:"step",f:"1",t:13}]}]}],n:50,x:{r:[".type"],s:"_0===\"bar\"||_0===\"line\""}}," ",{t:4,f:[{t:7,e:"label",m:[{n:"field",t:71}],f:["Smooth",{t:7,e:"input",m:[{n:"type",f:"number",t:13},{n:"value",f:[{t:2,r:".smooth"}],t:13},{n:"step",f:"0.1",t:13}]}]}," ",{t:4,f:[{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".project"}],t:13}]}," Project?"]}],n:50,x:{r:[".smooth"],s:"+_0"}}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["Dot",{t:7,e:"input",m:[{n:"type",f:"number",t:13},{n:"value",f:[{t:2,r:".dot"}],t:13},{n:"step",f:"1",t:13}]}]}],n:50,x:{r:[".type"],s:"_0===\"line\""}}," ",{t:4,f:[{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".horizontal"}],t:13}]}," Horizontal?"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["Sub",{t:7,e:"select",m:[{n:"value",f:[{t:2,r:".sub"}],t:13}],f:[{t:7,e:"option",f:["cluster"]},{t:7,e:"option",f:["stack"]}]}]}," ",{t:4,f:[{t:7,e:"label",m:[{n:"field",t:71}],f:["Cluster Gap",{t:7,e:"input",m:[{n:"type",f:"number",t:13},{n:"value",f:[{t:2,r:".clustergap"}],t:13},{n:"step",f:"1",t:13}]}]}],n:50,x:{r:[".sub"],s:"_0===\"cluster\""}}],n:50,x:{r:[".type"],s:"_0===\"bar\""}}," ",{t:4,f:[{t:7,e:"label",m:[{n:"field",t:71}],f:["Hole",{t:7,e:"input",m:[{n:"type",f:"number",t:13},{n:"value",f:[{t:2,r:".hole"}],t:13},{n:"step",f:"1",t:13}]}]}],n:50,x:{r:[".type"],s:"_0!==\"bar\"&&_0!==\"line\""}}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["Source",{t:7,e:"select",m:[{n:"value",f:[{t:2,r:".source"}],t:13}],f:[" ",{t:7,e:"option",f:["cars"]}," ",{t:7,e:"option",m:[{n:"value",f:"temps",t:13}],f:["temperatures"]}]}]}]}," ",{t:7,e:"marked",f:["      ### Template:\n      ```handlebars\n        <chart type=\"{{.type}}\" data=\"{{sources[.source]}}\" bind-horizontal bind-flip bind-smooth bind-project bind-sub bind-legend bind-hole bind-clustergap bind-point bind-space bind-span bind-nolabelvalue bind-dot on-select=\"@.set('selected', `${$1} ${$2}`)\" on-hover=\"@.set('hovered', `${$1} ${$2} ${JSON.stringify($3)}`)\" />\n      ```\n      ### Result:\n    "]}," ",{t:7,e:"div",m:[{t:13,n:"style",f:"min-width: 20em; width: 50vw; height: 20em; margin: 2em auto;",g:1}],f:[{t:7,e:"chart",m:[{n:"type",f:[{t:2,r:".type"}],t:13},{n:"data",f:[{t:2,rx:{r:"sources",m:[{t:30,n:".source"}]}}],t:13},{n:"horizontal",t:13,f:[{t:2,r:"horizontal"}]},{n:"flip",t:13,f:[{t:2,r:"flip"}]},{n:"smooth",t:13,f:[{t:2,r:"smooth"}]},{n:"project",t:13,f:[{t:2,r:"project"}]},{n:"sub",t:13,f:[{t:2,r:"sub"}]},{n:"legend",t:13,f:[{t:2,r:"legend"}]},{n:"hole",t:13,f:[{t:2,r:"hole"}]},{n:"clustergap",t:13,f:[{t:2,r:"clustergap"}]},{n:"point",t:13,f:[{t:2,r:"point"}]},{n:"space",t:13,f:[{t:2,r:"space"}]},{n:"span",t:13,f:[{t:2,r:"span"}]},{n:"nolabelvalue",t:13,f:[{t:2,r:"nolabelvalue"}]},{n:"dot",t:13,f:[{t:2,r:"dot"}]},{n:["select"],t:70,f:{r:["@this","$1","$2"],s:"[_0.set(\"selected\",(\"\"+(_1)+\" \"+(_2)))]"}},{n:["hover"],t:70,f:{r:["@this","$1","$2","$3"],s:"[_0.set(\"hovered\",(\"\"+(_1)+\" \"+(_2)+\" \"+(JSON.stringify(_3))+\")\"))]"}}]}," ",{t:7,e:"div",m:[{t:13,n:"style",f:"margin-top: 8em;",g:1}],f:["Selected: ",{t:2,x:{r:[".selected"],s:"_0||\"(none)\""}},{t:7,e:"br"}," Hovered: ",{t:2,x:{r:[".hovered"],s:"_0||\"(none)\""}}]}]}]}]}],e:{"_0===\"bar\"||_0===\"line\"":function (_0){return(_0==="bar"||_0==="line");},"+_0":function (_0){return(+_0);},"_0===\"line\"":function (_0){return(_0==="line");},"_0===\"cluster\"":function (_0){return(_0==="cluster");},"_0===\"bar\"":function (_0){return(_0==="bar");},"_0!==\"bar\"&&_0!==\"line\"":function (_0){return(_0!=="bar"&&_0!=="line");},"[_0.set(\"selected\",(\"\"+(_1)+\" \"+(_2)))]":function (_0,_1,_2){return([_0.set("selected",(""+(_1)+" "+(_2)))]);},"[_0.set(\"hovered\",(\"\"+(_1)+\" \"+(_2)+\" \"+(JSON.stringify(_3))+\")\"))]":function (_0,_1,_2,_3){return([_0.set("hovered",(""+(_1)+" "+(_2)+" "+(JSON.stringify(_3))+")"))]);},"_0||\"(none)\"":function (_0){return(_0||"(none)");}}},
        use: [plugin()],
        options: {
          title: 'Component :: Chart',
          resizable: true, flex: true,
          width: '48em', height: '30em'
        },
        data: function data() {
          return {
            sources: {
              cars: [{ value: 23, label: 'Chevrolet' }, { value: 12, label: 'Ford' }, { value: 29, label: 'Honda' }, { value: 2, label: 'Lexus' }],
              temps: [
                [{ value: 97, label: 'Atlanta', sublabel: 'Jun 2022' }, { value: 91, label: 'Atlanta' }, { value: 65, label: 'Atlanta' }, { value: -5, label: 'Atlanta' }],
                [{ value: 45, label: 'Toronto' }, { value: 33, label: 'Toronto' }, { value: 12, label: 'Toronto' }, { value: 67, label: 'Toronto' }],
                [{ value: 44, label: 'Phoenix' }, { value: 112, label: 'Phoenix' }, { value: 88, label: 'Phoenix' }, { value: 102, label: 'Phoenix' }],
                [{ value: 39, label: 'New York' }, { value: 77, label: 'New York' }, { value: 79, label: 'New York' }, { value: 68, label: 'New York' }] ],
            },
            point: 30, space: 5, span: 200,
          };
        }
      }));

    }
  };
});
