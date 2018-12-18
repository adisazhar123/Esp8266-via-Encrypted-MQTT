#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <Crypto.h>
#include <AES.h>
#include <string.h>
#include <Redis.h>


#define REDIS_ADDR      "10.151.254.162"
#define REDIS_PORT      6379
#define REDIS_PASSWORD  ""


// Update these with values suitable for your network.
//kalo nodemcu gamau connect ke mqtt coba di ping dulu

const char* ssid = "Informatics_Wifi";
const char* password = "";
const char* mqtt_server = "10.151.254.162";


WiFiClient espClient;
PubSubClient client(espClient);
Redis redis(REDIS_ADDR, REDIS_PORT);



AESSmall128 aes128;
unsigned char decrypted [17] = {0};

void setup()
{



  pinMode(D7, OUTPUT);
  pinMode(D5, OUTPUT);
  pinMode(D6, OUTPUT);

  Serial.begin(9600);
  Serial.println("Starting Control Traffic Lights via encrypted MQTT by Muhaammad Adistya Azhar");


  const unsigned char key [17] = "helloareyouarehi"; // 16 characters, and 1 byte termination means 17 total bytes reserved in memory.

  aes128.setKey(key, 16);

  setup_wifi();

  while(!redis.begin(REDIS_PASSWORD)) {
        Serial.println("Connecting to Redis!");
    }

    if (redis.begin(REDIS_PASSWORD)) 
    {
        Serial.println("Connected to the Redis server!");
    } 
    else 
    {
        Serial.println("Failed to connect to the Redis server!");
        return;
    }
  
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}



void setup_wifi() {

  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  char buf[12];
 
  Serial.print("Key from redis: ");


  String keyFromRedis = redis.get("key");

  
  int lengthOfKey = keyFromRedis.length();
  
  if (lengthOfKey == 0) {
    Serial.println("Unable to get from redis.");
    return;
  }
    
  char newKey[lengthOfKey + 2];

  keyFromRedis.toCharArray(newKey, lengthOfKey+1);
  
  Serial.println((char*)newKey);

  unsigned char newKey2 [17] = {0};
  Serial.println((char*)newKey);

  for(int i=0; i<=lengthOfKey; i++) {
    newKey2[i] = newKey[i];  
  }

  Serial.println((char*)newKey2);

  aes128.setKey(newKey2, 16);

  Serial.println((char*)payload);

//  unsigned char output [17] = {0};/
//    char currentChar [] = {payload[0]};
//    char newNumUnexpectedBehavior [4] = {0};


    
//    /error srtarts from here
//    strcpy(newNumUnexpectedBehavior,/ currentChar);
//
//


    char newNum [5] = {0};

        
    char temp [] = {payload[0]};

    strcpy(newNum, temp);


/////prevent unexpected behavior
/////check if first hex has 3 characters
  if(payload[3] == 32){
      temp[0] = payload[1];
      strcat(newNum, temp);
      temp[0] = payload[2];
      strcat(newNum, temp); 
  }
  ///check if first hex has 2 characters
  else if (payload[2] == 32) {
    temp[0] = payload[1];
    strcat(newNum, temp);
  } 

  ///check if first hex has 1 character
  else {
//    /already done in start
  }

      Serial.println("newNumUnexpectedBehavior ") ;
    Serial.println(newNum);
  
  
    uint8_t newNumUnexpectedBehaviorUint = atoi(newNum);
    
      Serial.println("newNumUnexpectedBehaviorUint ");
    Serial.println(newNumUnexpectedBehaviorUint);
    
//    temp[0] = payload[0];/
    
    uint8_t decNum [5] = {0};
    uint8_t decNum2 [4] = {0};
    uint8_t decNum3 [5] = {0};
    uint8_t decNum4 [5] = {0};

//    char newNum [4] = {0};

        
 //   char temp [] = {payload[0]};
    
//    strcpy(newNum, temp);/
    
    
    int idx = 0;
    int idx21 = 0;
    int idx22 = 0;
    int idx23 = 0;
    int idx24 = 0;
    
    uint8_t simpan1, simpan2;
//  set encrypted values to array of unsigned int
    for (int i=0; i< length; i++) {
        if (i == 0) continue;
        if (payload[i] == 32) {
            uint8_t numTemp = atoi(newNum);
            if (idx < 4) {
                if (idx == 0) simpan1 = numTemp;
//                Serial.println("numTemp " + numTemp);/
//                Serial.println("simpan1 " + simpan1);/
                decNum[idx21] = numTemp;
                idx21++;
            } else if (idx < 8) {
                if (idx == 4) simpan2 = numTemp;
                decNum2[idx22] = numTemp;   
                idx22++;
            } else if (idx < 12) {
                decNum3[idx23] = numTemp;               
                idx23++;
            }  else if (idx < 16) {                
                decNum4[idx24] = numTemp;                
                idx24++;
            }
            newNum[0] = 0;
            idx++;
        } else {
            temp[0] = payload[i]; //get current char in iteration
            temp[1] = 0; //null terminator
            strcat(newNum, temp); 
            
        }

    }
    
    
//    decNum[0] = simpan/1;
    decNum[0] = newNumUnexpectedBehaviorUint;
    decNum2[0] = simpan2;
    decNum4[3] = atoi(newNum);
    
      
    
    
    unsigned char encryptedMessage[17] = {0};
      Serial.println("Encrypted msg");

    idx21 = 0;
    idx22 = 0;
    idx23 = 0;
    idx24 = 0;
//    set encrypted message from unsignedd int
    for (int i=0; i<16; i++) {
        if (i < 4) {
            encryptedMessage[i] = decNum[idx21];
            idx21++;
        }
        else if (i < 8) {
            encryptedMessage[i] = decNum2[idx22];
            idx22++;
        }
        else if (i < 12) {
            encryptedMessage[i] = decNum3[idx23];
            idx23++;
        }
        else {
            encryptedMessage[i] = decNum4[idx24];
            idx24++;
        }
        Serial.println(encryptedMessage[i]);
      }



  unsigned char decryptedMessage [17] = {0};
  aes128.decryptBlock(decryptedMessage, encryptedMessage);

  Serial.print((char*) decryptedMessage );

  if (strcmp(topic, "led-controls") == 0){
    if(strcmp((char*)decryptedMessage, "red-light-on-pls") == 0){
        Serial.println(" - in red");
        digitalWrite(D7, HIGH); //digital pin 7 == red led
        digitalWrite(D6, LOW);
        digitalWrite(D5, LOW);
//        client.publish("led-controls-status", "Red is on.");/
    }
    else if(strcmp((char*) decryptedMessage, "yel-light-on-pls") == 0){
        Serial.println(" - in blue");
        digitalWrite(D6, HIGH); //digital pin 6 == yellow led
        digitalWrite(D7, LOW);
        digitalWrite(D5, LOW);
//        client.publish("led-controls-status", "Blue is on.");/
    }
    else if(strcmp((char*) decryptedMessage, "grn-light-on-pls") == 0){
        Serial.println(" - in green");
        digitalWrite(D5, HIGH); //digital pin 5 == green led
        digitalWrite(D7, LOW);
        digitalWrite(D6, LOW);
//        client.publish("led-controls-status", "Green is on.");/
    }else {
      Serial.println("Warning... attacker is trying to get into system!");
      for(int i=0; i<10; i++) {
        digitalWrite(D5, HIGH);
        digitalWrite(D7, HIGH);
        digitalWrite(D6, HIGH);
        delay(100);
        digitalWrite(D5, LOW);
        digitalWrite(D7, LOW);
        digitalWrite(D6, LOW);
        delay(100);
      }
    }          
  }
//  /set key again so aes cannot decrypt when hackers push in value
  redis.set("key", "DEFAULTKEYADIS18");

}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect("nodemcu")) {
      Serial.println("connected");
      client.subscribe("led-controls");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again...");
    }
  }
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
}
