---
layout: post
title: Raspberry Pi + PHP socket
date: 2015-05-09 13:58:04.000000000 -03:00
image: /images/posts/2015-05-09-raspberry-pi-php-socket/cover.jpg
type: article
published: true
status: publish
categories:
- IoT
tags:
- apache,
- codepen,
- html5,
- keyboard,
- monitor,
- nginx,
- php,
- raspberry,
- ratchet,
- sockets,
- web,
- wipi,
- html,
- w3c,
- codepen
---

Recently I did a post about [HTML5 WebSockets]({{ site.baseurl }}{% post_url 2015-03-22-websocket-html5 %})
and it had a purpose. I was preparing the material of my
[talk at Samsung Ocean](http://www.meetup.com/THT-Things-Hacker-Team/events/221699738){:target="_blank"} and my goal was create a RC car
with an Hybrid application to control it and not use java as a server-side language.

The final result you can check on my [github](https://github.com/marabesi/brasilino4){:target="_blank"} and play around with the code.
The following steps are to getting the socket working in your raspberry, here I'm going to use 
the [model B+](https://www.raspberrypi.org/products/model-b-plus){:target="_blank"}.

## First of all

We need to to access our Pi trough the SSH, for this example I'm going to use the WiPi
(wireless adapter for raspberry Pi).

[![WiPi]({{ site.baseurl }}/images/posts/2015-05-09-raspberry-pi-php-socket/wipidongle.jpg)]({{ site.baseurl }}/images/posts/2015-05-09-raspberry-pi-php-socket/wipidongle.jpg){:target="_blank"}

But you can use the RJ-45 to access it or use a little monitor with a keyboard on the Pi, fell free to choose your
option just make sure you will have this access.
obs: In this tutorial I don't cover how to set up wireless on your pi, refer to
[wireless documentation](https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md){:target="_blank"}
to get it done.

##  Getting started

For this example we are going to use only the php without any web server, it is interesting isn't it? Let's update our Pi and install the php

```bash
sudo rpi-update
```

After a few minutes the pi will be up to date and then we can finally install PHP

```bash
sudo apt-get install php5
```

##  Setting up the socket

Choose a directory and create a **socket.php** file with the content below,
I'm going to use my own directory called **/home/marabesi**

```php
<?php

$host = 'localhost';
$port = '9002';
$null = NULL;

$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);

socket_set_option($socket, SOL_SOCKET, SO_REUSEADDR, 1);

socket_bind($socket, 0, $port);

socket_listen($socket);

$clients = array($socket);

echo 'Socket listening on host: ' . $host . ' port: ' . $port . PHP_EOL;

while (true)
{
	$changed = $clients;

	socket_select($changed, $null, $null, 0, 10);

	if (in_array($socket, $changed))
    {
		$socket_new = socket_accept($socket);
		$clients[] = $socket_new;

		$header = socket_read($socket_new, 1024);
		perform_handshaking($header, $socket_new, $host, $port);

		socket_getpeername($socket_new, $ip);
		$response = mask(json_encode(array('server' => $ip . ' connected')));
		send_message($response);

		$found_socket = array_search($socket, $changed);
		unset($changed[$found_socket]);
	}

	foreach ($changed as $changed_socket)
    {
		while(socket_recv($changed_socket, $buf, 1024, 0) >= 1)
		{
			$received_text = unmask($buf);
			$jsonObject = json_decode($received_text);

                        $createResponse = json_encode(array('server' => $ip . ' : ' . utf8_encode($received_text)));

                        echo $received_text . PHP_EOL;

			$response_text = mask($createResponse);
			send_message($response_text);

			break 2;
		}

		$buf = @socket_read($changed_socket, 1024, PHP_NORMAL_READ);

		if ($buf === false)
        {
			$found_socket = array_search($changed_socket, $clients);
			socket_getpeername($changed_socket, $ip);
			unset($clients[$found_socket]);

			$response = mask(json_encode(array('server' => $ip . ' disconnected')));
			send_message($response);
		}
	}
}

socket_close($sock);

function send_message($msg)
{
	global $clients;
	foreach($clients as $changed_socket)
	{
		@socket_write($changed_socket,$msg,strlen($msg));
	}
	return true;
}

function unmask($text)
{
	$length = ord($text[1]) & 127;
	if($length == 126) {
		$masks = substr($text, 4, 4);
		$data = substr($text, 8);
	}
	elseif($length == 127) {
		$masks = substr($text, 10, 4);
		$data = substr($text, 14);
	}
	else {
		$masks = substr($text, 2, 4);
		$data = substr($text, 6);
	}
	$text = "";
	for ($i = 0; $i < strlen($data); ++$i) {
		$text .= $data[$i] ^ $masks[$i%4];
	}
	return $text;
}

function mask($text)
{
	$b1 = 0x80 | (0x1 & 0x0f);
	$length = strlen($text);

	if($length <= 125)
		$header = pack('CC', $b1, $length);
	elseif($length > 125 && $length < 65536)
		$header = pack('CCn', $b1, 126, $length);
	elseif($length >= 65536)
		$header = pack('CCNN', $b1, 127, $length);
	return $header.$text;
}

function perform_handshaking($receved_header,$client_conn, $host, $port)
{
	$headers = array();
	$lines = preg_split("/\r\n/", $receved_header);
	foreach($lines as $line)
	{
		$line = chop($line);
		if(preg_match('/\A(\S+): (.*)\z/', $line, $matches))
		{
			$headers[$matches[1]] = $matches[2];
		}
	}

	$secKey = $headers['Sec-WebSocket-Key'];
	$secAccept = base64_encode(pack('H*', sha1($secKey . '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')));
	$upgrade  = "HTTP/1.1 101 Web Socket Protocol Handshake\r\n" .
	"Upgrade: websocket\r\n" .
	"Connection: Upgrade\r\n" .
	"WebSocket-Origin: $host\r\n" .
	"WebSocket-Location: ws://$host:$port/demo/shout.php\r\n".
	"Sec-WebSocket-Accept:$secAccept\r\n\r\n";
	socket_write($client_conn,$upgrade,strlen($upgrade));
}
```

Now we have to create a simple HTML file to interact with our socket and see it
working, from now on we have two path to take the first is to create an HTML
file on the Pi and then access it, and the second is to create a simple HTML
in our own PC and just make the connection to our socket into the Pi.

Just make sure you execute the **socket.php** file in the Pi to be able to
listen on port 9000

```bash
php /home/marabesi/socket.php
```

If everything goes well you'll see the following message

```bash
Socket listening on host: localhost port: 9000
```

IMPORTANT : You must keep the **socket.php** executing otherwise it won't let
you connect through the socket. To simplify this post I'm going to go with the
second option, but you can install a web server such as nginx in your pi and
try it yourself!

As a alternative you can use the [Ratchet](https://github.com/ratchetphp/Ratchet){:target="_blank"}
to create you socket in a much easier way and with a amazing use of
Object Oriented Programming you should check it out.

## Creating the HTML page to interact with

Now we can save the following code in a file called **index.html**

```html
<!DOCTYPE html>
<html>
    <head>
        <title>WebSocket - Raspberry Pi</title>
        <meta charset="UTF-8">
    </head>
    <body>
        ## Test your websocket connection!
        <h3>Just type and press enter ;)</h3>
        <div id="container"></div>
        <input type="text" placeholder="Write your message to the WebSocket!" id="message" />
        <script>
            (function () {
                var url = 'ws://raspberryIp:raspberryPort';
                var mySocket = new WebSocket(url);
                var container = document.getElementById('container');

                var key = document.onkeypress = function (event) {
                    event = event || window.event;

                    if (event.which == 13) {
                        var message = document.getElementById('message');

                        container.innerHTML += '<div><span>Me :</span><span>' + message.value + '</span></div>';
                        console.log('me: ' + message.value);
                        mySocket.send(message.value);
                        message.value = '';
                    }

                    return event.which;
                };

                mySocket.onopen = function () {
                    console.log('opened !');
                    container.innerHTML += '<h2>Connection established : ' + url + '</h2>';
                };

                mySocket.onmessage = function (e) {
                    console.log('server: ' + e.data);
                    container.innerHTML += '<div><span>Server: </span><span>' + e.data + '</span></div>';
                };

                mySocket.onclose = function () {
                    console.log('closed !');
                    container.innerHTML += '<h2>Connection closed</h2>';
                };
            }());
        </script>
    </body>
</html>
```

Here we have to modify two thing to get the things done.

1. Where you see **raspberryIp** you should change to you raspberry IP
2. And where you see **raspberryPort** you should also change to the port
where the socket is running and in this example the port is 9002

The HTML code was originally made on codepen.io and you can see the working
example above, with the bootstrap style.

<iframe width="300" height="300" style="width: 100%;" scrolling="no" src="//codepen.io/marabesi/embed/OPrBPO/?height=300&theme-id=0&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="allowfullscreen">See the Pen <a href="http://codepen.io/marabesi/pen/OPrBPO" target="_blank">WebSocket !</a> by Matheus Marabesi (<a href="http://codepen.io/marabesi">@marabesi</a>) on <a href="http://codepen.io" target="_blank">CodePen</a>.<br />
</iframe>

Suggestions? please let me know!

## Edit: 17/03/2016 - Setting up Apache virtual host

If you don't have apache installed just type

```bash
sudo apt-get install apache2
```

You can install it on raspberry pi or anywhere you want to.
After that we need create a virtual host.

```bash
touch /etc/apache2/sites-available/websocket.conf
```

and with the file created just copy and paste the following code

```apache
<VirtualHost *:80>
        ServerName websocket

        DocumentRoot /var/www/websocket

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

As you can see our root directory is **/var/www/websocket** and is the place
where you should save the HTML we created to manipulate our socket connection.
