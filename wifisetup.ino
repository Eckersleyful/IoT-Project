#include <SPI.h>
#include <WiFi101.h>
#include <WifiClient.h>


IPAddress server();
char ssid[] = "";       
char pass[] = "";  
int status = WL_IDLE_STATUS;     

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

  Serial.print("You're connected to the network");
  printCurrentNet();

}
void loop() {
  // check the network connection once every 10 seconds:
  delay(5000);
  printCurrentNet();
  sendSensorData();
}
void printCurrentNet() {
  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());
}
void sendSensorData(){
  /*HttpClient client; 
  client.setHeader("Content-Type: application/text");
  Serial.println("Trying to send data");
  Serial.println(client.post("http://192.168.10.49:3000/palju", "cat"));*/
  WiFiClient client;
  String data = "{\"message\": \"rip\"}";
  if(!client.connected()){
    if(client.connect(server, 3000)) {
      Serial.println("Connected");
      client.println("POST /palju HTTP/1.1");

      client.println("User-Agent: Arduino/1.0");
      client.println("Connection: close");
      client.println("Content-Type: application/x-www-form-urlencoded");
      client.print("Content-Length: ");
      client.println(data.length());
      client.println(); 
      client.println(data);

    }
  }
  client.stop();
}


