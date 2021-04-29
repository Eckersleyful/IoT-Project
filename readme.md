# IoT Prototype
This repository contains a IoT prototype for inspecting tub water level and temperature.

## Backend
Project backend uses NodeJS and MongoDB.
Use `docker-compose up`

## IoT Device
After the backend is running, you should add a new device to the database by creating a post request to `/device/new`, use the `_id` of this new device to post reporst to `/report/:id`. These repors can be seen at `/device/:id`. Each report should be in the following format:
```
{
	"isFull": true,
	"temperature": 24.5
}
```