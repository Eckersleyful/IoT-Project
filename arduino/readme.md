# About
This folder contains a proof of concept arduino uno script that is used to detect water level and then track the temperature of that water. Currently the air temperature is measured instead of water temperature due to hardware limitations.

## Getting Started
How to get started with Aruino Uno:  
https://www.arduino.cc/en/Guide/ArduinoUno  
**Download arduino IDE**  
https://www.arduino.cc/en/software

## Hardware
Here is a list of hardware used in this project
- [Aruino Uno](https://store.arduino.cc/arduino-uno-rev3)
- [Grove Base Shield](https://www.seeedstudio.com/Base-Shield-V2.html)
- [Grove - LED](https://wiki.seeedstudio.com/Grove-LED_Socket_Kit/)
- [Grove - Water Sensor](https://wiki.seeedstudio.com/Grove-Water_Sensor/)
- [Grove - Temperature&Humidity Sensor](https://wiki.seeedstudio.com/Grove-TemptureAndHumidity_Sensor-High-Accuracy_AndMini-v1.0/)
  - Requires [external libary](https://github.com/Seeed-Studio/Grove_Temper_Humidity_TH02). Clone Grove Temper Humidity TH02 libary to folder "Program Folder Location" defined in Arduino Studio "File/Setting/". `git clone https://github.com/Seeed-Studio/Grove_Temper_Humidity_TH02.git`

### Connecting Hardware
The base shield should be connected to the arduino and the other peripherals connected to the base shield. If you are using different setup you have to modify the definitions in the script.
#### Sensortest
Device              | Port 
 ---                | :--:
 Water Sensor       | D2 
 Red Led            | D5
 Blue Led           | D6
 Temperature Sensor | I2C