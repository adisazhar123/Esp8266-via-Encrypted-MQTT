# ESP8266 and NodeJs - Control LED Lights via Encrypted MQTT

[![Powered by Sails JS]()](https://sailsjs.com/)
[![Powered by Esp8266 Arduino Port]()](https://github.com/esp8266/Arduino)
[![Powered by Emq]()](http://emqtt.io/)

By [**Adis Azhar**](https://github.com/adisazhar123)

### Introduction
This project is to demonstrate sending **encrypted** (AES 128 bit) data  from a Node server via MQTT protocol to a ESP device connected through wifi. On the ESP there are 3 LED lights connected on D5, D6 and D7. One of the lights will turn on if the message passed though gets **decrypted** correctly and compared against a fixed plaintext only the Node server and ESP device know (a contract beforehand).

Each key generated will be different - where it's stored in a Redis datastore. Everytime the ESP receives an MQTT message, it will request the key (where it's regenerated from Node) stored in Redis.

So if an irresponsible entity tries to publish a random message or even a duplicated encrypted message from previous rounds through an MQTT topic, the ESP will not recognise it (behavior causes all three lights to flash, a sign that a hacker is trying to get in) as it will have a different key.

### MQTT
  - Topic: led-controls

### Redis
  - Stored in key "key"


### Installation
```sh
1. Start Redis server with allowed remote connections to true.
2. Start MQTT broker.
3. Set Wifi, Redis, and MQTT credentials in .ino file in folder "aes128-esp8266" so that ESP can connect.
4. Upload and compile .ino file with ESP connected to laptop/ computer. Make sure you have ESP8266 board configs in Arduino IDE.
===================================================================================================
$ cd aes-esp8266-webapp
$ npm install 
$ sails lift

5. Access "localhost:1337" in browser. Test the different buttons out. Test with MQTT box for custom messages and see how it behaves.
```
### Development

Want to contribute? Great!

Currently source code for .ino file is untidy and buggy. Fetching key from Redis sometimes returns a blank string - might be from buggy [library](https://github.com/remicaumette/esp8266-redis). Any contributions to tidying the code will be appreciated. Just do a pull request.


### Todos

 - Add more features - encrypting sensor data
 - Add different encryption algorithms e.g. AES 192, DES etc.
 
### Libraries used
- https://rweather.github.io/arduinolibs/classAES128.html
- https://github.com/knolleary/pubsubclient
- https://github.com/remicaumette/esp8266-redis

License
----

MIT

