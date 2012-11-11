There are so many different ways to deploy a node app around the internet. Here’s my way.

1.  Use [git][1]. Git is becoming the standard for version control and for good reason
2.  Install [forever][2] – this allows handling of the node process. It’s better than running it in a screen session like most people do!


	sudo npm install -g forever


3.  Allow the git user account (which should be unprivileged) to host on port 80. After following [this guide][3] I decided to use setcap:


	sudo apt-get install libcap2-bin
	sudo setcap 'cap_net_bind_service=%2Bep' /usr/local/bin/node


4.  Add a post-receive hook on the remote (bare) repositiory to check out and restart the node process using forever. For example:


	#!/bin/bash
        export GIT_WORK_TREE=/home/naggie/dspa/
        git checkout -f

        cd $GIT_WORK_TREE

        forever stop dspa-server.js
        forever start dspa-server.js


That's it! Simply push to the server to update and restart the node instance.

Also a convention is to use an environment variable to define the port. This is most useful when a proxy is used (for example, to use apache). This is used, for example, to work with the [cloud9 ide][4].


 [1]: http://git-scm.com
 [2]: https://github.com/nodejitsu/forever/
 [3]: http://serverfault.com/questions/112795/how-can-i-run-a-server-on-linux-on-port-80-as-a-normal-user
 [4]: http://c9.io

