---
layout: post
title: Setting up GPS NEO 6 sensor
date: 2018-02-07 17:30:18.000000000 -02:00
type: post
published: true
status: publish
categories:
- Thoughts
tags:
- gps
- neo 6
- raspberry
- pi
- gpsd
- serial
author:
  - Matheus Marabesi
---

Recently I have had the chance to set up a basic IoT project which consists of localization by GPS.
The decision was to work with the Raspberry board over the arduino based on the number os shields
that arduino would use.

To get start with we would need a Wi-Fi(or GSM) shield, which on raspberry is just an adapter. The
second point was the MQTT protocol and the code maintenability. Whereas on arduino is just plain C
with Raspberry we have more options. One could argue that we can use the standard firmata
to avoid using C, but just for clarity this wasn't the crucial point.

After deciding which board to use the time was to gather the GPS. As you might have guesses the GPS
NEO 6 was the chose one (most of NEO6 comes with an external antena, but here I used one
with a internal antena).

## Wiring up

*IMPORTANT*: Before we start, the version of Raspberry Pi that I used is the model 2 B+, but it should
be really simple to adapt for any Pi version.

The first thing to be in mind is the wiring, be careful while seeting up the wires RX and TX. I just made
a mistake that was plugin TX on TX and RX to RX. To avoid any further erros, the table below
show the pin name (from the GPS NEO 6) and where it should go on the Raspberry Pi.

|GPS NEO 6|Raspberry Pi|
|---------|------------|
| `RX   ->` | TX - GPIO 8 |
| `TX   ->` | RX - GPIO 10 |
| `VCC  ->` | 3.3v or 5v |
| `GND  ->` | GND |

The table below was build looking at the [pi4j](http://pi4j.com/pins/model-b-plus.html) project, which has an
image to better illustrate the pins. For now the figure below should do the work.

![test](/assets/setting-up-gps-neo6-sensor/wires.png)

If you follow everything as described in the table and in the figure, you should see a green light on
the GPS NEO 6. This means that at least the power was plugged correctly. THe next step
is to check the RX and TX connections which will send to use the data through the serial port.

The first test doesn't need any special software, we are going to connect using the cat command
directly to the serial port.

Access your Raspberry Pi through SSH or plugin an keyboard and monitor to get to the shell. Once
you are in, type the following command:

```shell
sudo cat /dev/serial0
```

If everything is correct you should see the following response:

[![Font: Waveshare.com](https://www.waveshare.com/w/upload/b/bb/UART-GPS-NEO-6M-User-Manual-2.png)](https://www.waveshare.com/wiki/UART_GPS_NEO-6M)

<small>Font: Waveshare.com</small>

## Gotchas

In my experience the GPS NEO 6 takes a long time to start receiving signal from the satellites accross the earth.
It takes from 30 minutes to 2 hours, when it suposed to be less than 1 minute. Keep in mind that it can happen
to you as well but don't worry, just wait and keep an eye in the logs.
