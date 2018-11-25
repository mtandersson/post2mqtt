const express = require('express')
const app = express()
const mqtt = require('mqtt')
var bodyParser = require('body-parser')

const port = process.env.PORT || 8080
const mqtt_url = process.env.MQTT_URL || 'mqtt://localhost'
const username = process.env.MQTT_USERNAME || ''
const password = process.env.MQTT_PASSWORD || ''

const mqttOptions = {
  username,
  password
}
const mqttClient = mqtt.connect(
  mqtt_url,
  mqttOptions
)

mqttClient.on('connect', () => {
  console.log('Mqtt connected to', mqtt_url, mqttOptions)
})

mqttClient.on('reconnect', () => console.log('Mqtt reconnecting'))

mqttClient.on('message', function(topic, message) {
  console.log('topic:', topic, message.toString())
})

app.use(bodyParser.json()) // for parsing application/json
app.listen(port, () => console.log(`Listning on port ${port}!`))

app.post('*', (req, res) => {
  console.log('Recived', req.body, req.path)
  mqttClient.publish(req.path, JSON.stringify(req.body), { qos: 2 }, err => {
    if (!err) {
      return res.sendStatus(204)
    }
    console.log('error sending', err)
    return res.status(500).send('error')
  })
})
