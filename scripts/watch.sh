export PATH=./node_modules/.bin:../node_modules/.bin:$PATH

if [[ -z $PORT ]]; then
  PORT=3000
fi

nodemon -e js,ractive.html,ractive.md --watch src --watch demo-src --exec "sh" ./scripts/esm.sh &
PID=$!
http-server -p $PORT -c-1 demo
kill $PID