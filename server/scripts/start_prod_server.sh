#To be executed from the ..../socprint-web/server directory
echo "Executing start-up script"
cd /root/socprint-web/server/
yarn build
/usr/bin/node ./build/index.js

