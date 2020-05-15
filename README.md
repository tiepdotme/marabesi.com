# Hello welcome to my personal website : )

This is the source code of my personal website where you can find
at [marabesi.com](http://marabesi.com). This is a Jekyll based website so if
you find any bug or want to improve the site please, don't think twice just
send a PR.

# Serving with docker

Disclaimer: [docker](https://docs.docker.com/install) must be installed as well
as [docker-compode](https://docs.docker.com/compose/install).

As a pre-configuration step (in linux), the number of watchers must be increased, as explained
[here](https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers)

This repository provides a docker compose file to serve the website with docker
using a single command:

```
docker-compose up
```

Once the command has been finished, the website will be available on localhost
port 4000.