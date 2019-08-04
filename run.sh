#!/bin/sh
cd /home/ec2-user/VirtualWaiterWeb
npm run buildprod
#pm2 start npm --name VirtualWaiter -- start --watch