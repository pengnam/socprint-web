# SOCprint server

An express server is used to process the requests from the front-end. We make use of an ssh-tunnel to connect the cloud instance to sunfire, and the tunnel is to be executed on sunfire.

## Set-up

### General Details

Both development and production uses port `8080` as the tunneling port. Development uses `8000` as the api port but `80` in production.

### Local Development

Dependencies: Install [sshpass](https://gist.github.com/arunoda/7790979)

1. Run `yarn tunnel` in one window to set-up a local tunnel to sunfire
2. Run `yarn start` to start a local development server with nodemon

### Production

Dependencies: `nginx` needs to be configured to handle ssl queries and traffic directed to port `8000`

#### Set-up on cloud instance

1. In `./scripts/` ensure that `start_prod_server.sh` and `socprint.service` have the right directories
2. Run `systemctl link /root/socprint-web/server/scripts/socprint.service` to link the service to systemctl
3. Run `systemctl status socprint` to check the status of the service

#### Set-up on Sunfire

1. Copy and run `tunnel.sh`
