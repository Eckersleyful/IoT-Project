#include <SPI.h>
#include <WiFi101.h>
#include <WifiClient.h>
#include <TH02_dev.h>
#include "Arduino.h"
#include "Wire.h"

/**
 * Wifi settings.
 */
IPAddress server(192,168,10,49);
int port = 3000;
char ssid[] = "";       
char pass[] = "";  
int status = WL_IDLE_STATUS;

// Device ID used when sending a report.
// Receive new id by sending a post reuest to backends '/device/new/'.
String deviceId = String("");

// Request header created during setup().
String requestHeader = String("");

void setup() {
  Serial.begin(9600);
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("WiFi shield not present");
    while (true);
  }
  while ( status != WL_CONNECTED) {
    Serial.print("Attempting to connect to WPA SSID: ");
    Serial.println(ssid);
    status = WiFi.begin(ssid, pass);
    delay(10000);
  }

  // Concat the header for the post requests.
  requestHeader = String("POST /report/");
  requestHeader.concat(deviceId);
  requestHeader.concat(" HTTP/1.1");

  Serial.print("You're connected to the network");
  printCurrentNet();
}

void loop() {
  // check the network connection once every 10 seconds:
  delay(5000);
  printCurrentNet();
  sendSensorData();
}

/**
 * Print out connection information.
 */
void printCurrentNet() {
  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());
}

/**
 * Send out the current sensor data.
 */
void sendSensorData() {
  WiFiClient client;
  // Placeholder request.
  String data = "{\"temperature\": 45, \"isFull\": true}";
  if(!client.connected()){
    if(client.connect(server, port)) {
      Serial.println("Connected");
      // Write a HTTP POST request. 
      client.println(requestHeader);
      client.println("User-Agent: Arduino/1.0");
      client.println("Connection: close");
      client.println("Content-Type: application/json");
      client.print("Content-Length: ");
      client.println(data.length());
      client.println(); 
      client.println(data);
    }
  }
  client.stop();
}
