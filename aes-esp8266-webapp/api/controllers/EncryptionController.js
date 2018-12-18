/**
 * EncryptionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const randomstring = require("randomstring");

module.exports = {
  connect: function(req, res) {
    sails.config.mqtt.onConnect();
    return res.send("hiloow");
  },
  subscribe: function(req, res) {
    sails.config.mqtt.subscribe("led-controls-status");
    return res.json("ok subscribed");
  },
  message: function(req, res) {
    sails.config.mqtt.onMessage();
    return res.send("listening");
  },

  redLightOn: function(req, res) {
      let keyValue = randomstring.generate(16);
      sails.config.redis.set("key", keyValue);
      console.log(keyValue)
      const message = sails.config.aes.doAes('red-light-on-pls', keyValue);
      sails.config.mqtt.publish("led-controls", message);
      return res.json("ok");
  },

  yellowLightOn: function(req, res) {
    let keyValue = randomstring.generate(16);
    sails.config.redis.set("key", keyValue);
    console.log(keyValue)
    const message = sails.config.aes.doAes('yel-light-on-pls', keyValue);
    sails.config.mqtt.publish("led-controls", message);
    return res.json("ok");
  },

  greenLightOn: function(req, res) {
    let keyValue = randomstring.generate(16);
    sails.config.redis.set("key", keyValue);
    console.log(keyValue)
    const message = sails.config.aes.doAes('grn-light-on-pls', keyValue);
    sails.config.mqtt.publish("led-controls", message);
    return res.json("ok");
  },
};
