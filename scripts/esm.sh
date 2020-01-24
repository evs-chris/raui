#!/bin/sh

export PATH=./node_modules/.bin:../node_modules/.bin:"$PATH"

if [ "$NODE_ENV" != "dev" ]; then
    rollup -c rollup.config.js
    
    if [ ! -d es ]; then
        mkdir es
    fi

    cd src
    ls *.ractive.html | while read cmp; do
        echo compiling $cmp ...
        cat $cmp | ractive component | buble --no modules > ../es/`basename $cmp .ractive.html`.js
        cat ../es/`basename $cmp .ractive.html`.js | terser > ../es/`basename $cmp .ractive.html`.min.js
    done

    ls *.js | while read hlp; do
        echo compiling $hlp ...
        cat $hlp | buble --no modules > ../es/`basename $hlp`
        cat ../es/`basename $hlp` | terser > ../es/`basename $hlp .js`.min.js
    done
else
  rollup -c rollup.config.js &  
fi
