# IoT Project Backend
This folders contains a simple backend made with node and mongoose.

## API
Path        | Method | Description
---         | ---    | ---
/device     | GET    | Get all devices and their reports
/device/new | POST   | Add new device
/device/:id | GET    | Get device with the given id
/report/:id | POST   | Add new report for a device

### Report
Post request to `/report/:id` should contain the following body 
```
{
	"isFull": false,
	"temperature": 24.5
}
```
where the :id is a valid device _id and the body is a report added for the device. 