const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1883');

module.exports.mqtt= {
  onConnect: function() {
    // client.on('connect', function() {
    //   console.log("connected");
    client.publish("topic", "okok");
      // publish("topic", "message");
    // });
  },

  subscribe: function(channel) {
    client.subscribe(channel, function(err) {
      if (!err) {
        console.log("No error");
      } else {
        console.log("Error");
      }
    });
  },

  onMessage: function() {
    client.on('message', function(topic, message) {
      console.log(message.toString());
      client.end();
    });

  },

  publish: function(topic, message) {    
    client.publish(topic, message);
  }

};
