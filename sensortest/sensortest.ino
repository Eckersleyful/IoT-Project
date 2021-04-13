#include <TH02_dev.h>
#include "Arduino.h"
#include "Wire.h"

#define WATER 2
#define RED 5
#define BLUE 6

void setup() {
  // Set the data rate in bits per second for serial data transmission.
  Serial.begin (9600);
  
  // Use the WATER pin as an input.
  pinMode(WATER, INPUT);
  // USE RED and BLUE pins as outpus.
  pinMode(RED, OUTPUT);
  pinMode(BLUE, OUTPUT);
  
  // Turn off both leds
  digitalWrite(RED, LOW);
  digitalWrite(BLUE, LOW);

  // Temperature sensor requires power up delay.
  delay(150);
  TH02.begin();
  delay(100);
}

void loop() {
  if(digitalRead(WATER)) {
    digitalWrite(RED, HIGH);
    digitalWrite(BLUE, LOW);
  } else {
    digitalWrite(RED, LOW);
    digitalWrite(BLUE, HIGH);
    // Print temperature and humidity while the water sensor is touching water.
    float temper = TH02.ReadTemperature();
    float humidity = TH02.ReadHumidity();
    String printTemper = String("Temperature: ");
    printTemper.concat(temper);
    printTemper.concat(" C");
    String printHumid = String("Humidity: ");
    printHumid.concat(humidity);
    printHumid.concat(" %");
    Serial.println(printTemper);
    Serial.println(printHumid);
  }
  delay(5000);
}
