---
layout: post
title: SIM800L tracking your IoT device
date: 2018-02-16 20:39:18.000000000 -02:00
type: post
published: true
status: publish
categories:
- posts
tags:
- web,
- arduino,
- sim800l,
- 800,
- simcom,
- iot,
- tracking,
- serial
author:
  - Matheus Marabesi
---

After a while testing the [GPS NEO6](/post/raspberry/2018/02/07/setting-up-gps-neo6-sensor.html) I ordered a new guy
to play around with GSM connection and GPS at the same time. The sensor this time is the SIM800L, which basically
is an interface between the SIM card and the Arduino Uno (could be any board, not Arduino Uno only).

The version used is the *Arduino Uno*, so everytime you see Arduino in the text I am talking about the Uno version.

For purpose of test I started using the Raspberry Pi (model B+) board but ended up with Arduino, the switch is given by the
facility of send the skecth out to the Arduino. While in the Raspberry Pi you should wait till the board is up
and running. Further tests can lead me back to the Pi, but for this post the examples will be on Arduino.

What you is going to see in this post:

* [The requirements to use SIM800L](#sim800l)
* [Setup the wiring](#wiring)
* [Test the serial connection with AT commands](#sketch-commands-at-101)
* [Locate(get lat and lnt) the SIM card with AT commands](#enabling-gsm-location)
* [References for further reading](#references)

## SIM800L

The board used is the SIM800L without any specific breakboard or something like that. Newest versions of the SIM like
SIM900 comes with a antenna and a bigger board.

Besides the board is needed to have a *micro SIM* card. In my case I had to use an adapter to transfor the nano SIM I
have into the micro.

[![Font: Mi.com](http://u01.appmifile.com/images/2016/10/30/6579cb3c-cbc0-44cb-99c5-71751fc0204f.jpeg)](http://c.mi.com/thread-46072-1-0.html)

<small>Fonte: Mi.com</small>

**IMPORTANT**: Make sure to have a SIM card with 2G, 3G or 4G anabled (you can test it plugin the SIM card on yout phone
and try to access any web page), and have in hands the APN, the APN user and APN password.

## Wiring

This sensor requires just 4 wires to start with, but there is a gap in the voltage that it operates. The following
table holds the pins where the wires should go to.

|SIM800L| Arduino Uno|
|-------|------------|
| NET | Antenna connection |
| VCC | 5v |
| RST | - |
| RX | 8 |
| TX | 9 |
| GND | GNG |

To make it easier to understand, the following image illustrates how the wiring should be done.

![SIM800L wiring](/assets/sim800l-tracking-your-iot-device/sim800.png)

<small>[SIM800L Font: Lelong.my](http://www.lelong.com.my/arduino-sim800l-gprs-gsm-tracking-module-antena-sim-slot-robotedu-183929865-2018-10-Sale-P.htm)</small>

<small>[Arduino Uno Font: Nooelec](http://www.nooelec.com/store/arduino-uno-r3.html)</small>

<!-- add here instructions to the voltage -->

## Sketch (commands AT 101)

**IMPORTANT 2**: Here I assume that you can compile and run a scketch into the Arduino,
if not, please find out how to to that and come back later.


Before we go any deeper on the libraries available out there, the proposal here is to upload a simple
sketch to interact with the serial port. The reason behind it is that the SIM800L handles AT ([instructions
to command a modem](https://www.codeproject.com/Articles/85636/Introduction-to-AT-commands-and-its-uses))
commands into the SIM card, and in order to understand what is going on we need to
understand the AT commands first. The following sketch reads and writes to the serial port.

```c
#include <SoftwareSerial.h>

SoftwareSerial gsm(9, 8);

void setup() {
   Serial.begin(9600);

   while(!Serial);

   gsm.begin(9600);
   delay(1000);

   Serial.println("Ready to receive commands");
}

void loop() {
   if(gsm.available()){
     Serial.write(gsm.read());
   }

   if(Serial.available()){
     gsm.write(Serial.read());
   }
}
```

Once we have the sketch up and running in our Arduino, is time to understand the AT commands. The first thing
to send trhough the serial interface is the command `AT`. This is the most basic command
to see if the sensor is up and running, if everything is correct an `OK` is printed back.

![AT command](/assets/sim800l-tracking-your-iot-device/arduino-serial.png)

The next step is to understand what is required to setup the GPRS mode in our SIM card. For that we are
going to rely a lot on the SIM800L official documentation
available [here](https://www.elecrow.com/download/SIM800%20Series_AT%20Command%20Manual_V1.09.pdf).

## Enabling GSM location

By default the SIM cards doesn't come with any configuration, we should setup manually for every action
we would like to do with it. To enable the tracking (that is our goal) we should do the following:

1. Enable the GSM location mode
2. Authenticate with the APN
3. Request the data regarding the SIM location

To enable the GMS location mode is a matter of sending the correct `AT` command through the serial.

```
AT+SAPBR=3,1,"CONTYPE","GPRS"
```

Next step is to authenticate the APN, we do that in four steps, first setting the APN, followed
by the username, the password and finally activate the bearer.

```
AT+SAPBR=3,1,"APN",""
```

```
AT+SAPBR=3,1,"USER",""
```

```
AT+SAPBR=3,1,"PWD",""
```

```
AT+SAPBR=1,1
```

By now the led sensor should start blinking more frequently than it used to, it indicates that
a connection has been stablished and now you can communicate freelly with the GSM network. To
guarantee that everything is working as expected, there is one command to retrieve the current
IP in use by the SIM card.

```
AT+SAPBR=2,1
```

The command response should be something similar to the figure below, other than that or only `0.0.0.0` indicates
that something went wrong.

Finally we are ready to request the latitude and longitude to know where our SIM card is in the world. As you may
have imagined it is done through an `AT` command as well.

```
AT+CIPGSMLOC=1,1
```

It should return an string containing the latitude, longitude, current date, and current time. The figure below
illustrates the response receive in the serial monitor.

![Response from SIM800L after requireing the current location](/assets/sim800l-tracking-your-iot-device/current-location.png)

## References

[Tracking with GPS NEO 6](/post/raspberry/2018/02/07/setting-up-gps-neo6-sensor.html)

[SIM (Subscriber Identity Module)](https://en.wikipedia.org/wiki/Subscriber_identity_module)

[SIM Card types](http://c.mi.com/thread-46072-1-0.html)

[Arduino Serial](https://www.arduino.cc/en/Tutorial/SoftwareSerialExample)

[AT commands](https://www.codeproject.com/Articles/85636/Introduction-to-AT-commands-and-its-uses)

[SIMCOM AT commands PDF](https://www.elecrow.com/download/SIM800%20Series_AT%20Command%20Manual_V1.09.pdf)
