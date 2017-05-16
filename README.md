RapidFab
--------

Getting set up
==============

Rapidfab uses npm and webpack to run the dev system. You can start it fairly simply as follows:

1. npm install .
2. add '127.0.0.1 rf.dev-auth.com' to your /etc/hosts file. You need this before starting the server or node will freak out like a spaz
3. create a script called 'start.sh' in the root of the project. Put the following contents in it

```
#!/bin/sh
sudo HOST=rf.dev-auth.com HOSTNAME=http://rf.dev-auth.com/ PORT=80 npm start
```
4. Run the script `./start.sh`

You'll need to make sure another web server is not bound to port 80, such as nginx, or you'll error out
