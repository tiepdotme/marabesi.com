---
layout: post
title: Bringing PHP and IoT together
date: 2016-05-31 18:42:15.000000000 -03:00
type: post
image: /images/posts/2016-05-31-bringing-php-iot-together/cover.jpg
published: true
status: publish
categories:
- IoT
- php
tags:
- arduino,
- blink,
- iot,
- led,
- nano,
- php,
- protoboard,
- serial,
- stream,
- usb,
- hardware
---

Recently I've been around IoT with PHP and I made some small projects such as LED blink,
sensor management and so on. Therefore I chose PHP to be my main language to dig into IoT's world,
for my surprise it was a tough decision.

Unfortunately we have few libraries written in PHP to deal with I/O and this kind of components,
at first it is normal the lack of content because PHP was built to be used in the web, therefore we can make it better.
Here I'm going to use PHP to connect with Arduino and turn on a LED.

So let's have a look in our sketch (the code goes into Arduino board)

```c
int led = 13;
String input = "";

void setup() {
  pinMode(led, OUTPUT);

  Serial.begin(9600);
}

void loop() {

  if (Serial.available() &gt; 0) { 
   
    input = Serial.readString();
    
    if (input == "ON") {
      digitalWrite(led, HIGH);
    } else {
      digitalWrite(led, LOW);
    }

    Serial.println(input);
  }
}
```

I uploaded the same code on Autodesk 123D Circuits and you can try it yourself, just click on "Start Simulation".

# Simulation

Probably if you are trying to simulate you will see nothing happening in the simulation and it looks a bit strange,
but it is exactly what it should do, nothing.
If we take a look inside the sketch we'll see a lot of interaction with Serial port and there is a reason why the
Arduino does nothing. The Serial port is the way out of Arduino and the path to communicate with another devices
or programming languages, we can see a few tutorials at Arduino
<a href="http://playground.arduino.cc/" target="_blank">playground</a> to get a better idea.
Go ahead and after you click on "Start Simulation" click on "Code Editor", the console will show up with the core running on Arduino. In the right side there is a tab named "Serial Monitor", click on that as well. 
On the right panel that will show up you can type any command to interact with.

If you have any idea what our sketch does, you see we must type "**ON**" to turn the LED on, and "**OFF**" to turn it off.

<iframe width="100%" height="448" frameborder="0" marginheight="0" marginwidth="0" scrolling="no" src="https://123d.circuits.io/circuits/497523-devmedia-php-iot/embed#breadboard"></iframe>

The PHP world will interact with Serial port on Arduino and send exactly the same command (ON, OFF) to turn the LED **ON** and **OFF**.

# Finally, the PHP

Ok, now we understand how to run code in our simulator and we need to interact with PHP. To achieve that we are going to use PHP streams.
The functions used here are known to C developers and might be for PHP as well, let's see some code and after that a explanation

```php
<?php
$resource = fopen('/dev/ttyUSB0', '+r');

fwrite($resource, 'ON');
```

The first thing we do is use the **fopen** function in a old known entry in linux, the **ttyUSB0** under **/dev** directory. It means that a USB device is connected in one port in your computer/laptop.
If you have more than one USB device connected the number 0 at the end will increase to USB1, USB2 and so on.
If no one USB were connected PHP will through an error like the following (so make sure your USB is connected both on Arduino and on your computer)

```php
<?php
PHP Warning:  fopen(/dev/ttyUSB0): failed to open stream:
Inappropriate ioctl for device in /home/marabesi/fopen.php on line 3
```

<img title="Arduino connected to the laptop" src="{{ site.baseurl }}/images/posts/2016-05-31-bringing-php-iot-together/connected-arduino-uno.jpg" alt="Image from Safari books - https://www.safaribooksonline.com/blog/2013/07/16/javascript-powered-arduino-with-johnny-five/" width="650" height="366" />

Then just be happy, if your Arduino is connected and you run the script in PHP the LED should turn on, to turn it off just change ON in the PHP script to OFF.
