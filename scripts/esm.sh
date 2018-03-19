#!/bin/sh

export PATH=./node_modules/.bin:../node_modules/.bin:$PATH

rollup -c rollup.config.js &

if [ "$NODE_ENV" != "dev" ]; then
    ls src/*.ractive.html | while read cmp; do
        echo compiling $cmp ...
        cat $cmp | ractive component | buble --no modules > es/`basename $cmp .ractive.html`.js
    done

    ls src/*.js | while read hlp; do
        echo compiling $hlp ...
        cat $hlp | buble --no modules > es/`basename $hlp`
    done
fi
