#!/bin/sh

export PATH=./node_modules/.bin:../node_modules/.bin:$PATH

if [ "$NODE_ENV" != "dev" ]; then
    rollup -c rollup.config.js
    
    if [ ! -d es ]; then
        mkdir es
    fi

    ls src/*.ractive.html | while read cmp; do
        echo compiling $cmp ...
        cat $cmp | ractive component | buble --no modules > es/`basename $cmp .ractive.html`.js
    done

    ls src/*.js | while read hlp; do
        echo compiling $hlp ...
        cat $hlp | buble --no modules > es/`basename $hlp`
    done
else
  rollup -c rollup.config.js &  
fi
