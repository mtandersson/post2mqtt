const express = require('express')
const app = express()
const mqtt = require('mqtt')
const bodyParser = require('body-parser')
const url = require('url')

const port = process.env.PORT || 8080
const mqtt_url = process.env.MQTT_URL || 'mqtt://localhost'
const username = process.env.MQTT_USERNAME || ''
const password = process.env.MQTT_PASSWORD || ''
const token = process.env.TOKEN || ''
const mqttOptions = {
  username,
  password
}

console.log('Connecting to mqtt ', mqtt_url)
const mqttClient = mqtt.connect(
  mqtt_url,
  mqttOptions
)

mqttClient.on('connect', () => {
  console.log('Mqtt connected to', mqtt_url)
})

mqttClient.on('reconnect', () => console.log('Mqtt reconnecting'))
mqttClient.on('message', (topic, message) =>
  console.log('topic:', topic, message.toString())
)

app.use(bodyParser.json()) // for parsing application/json
const server = app.listen(port, () => console.log(`Listning on port ${port}!`))

// Check autnh in authorization header or token querystring
const checkAuth = (req, res, next) => {
  if (req.get('authorization') === token) {
    return next()
  }
  const url_token = url.parse(req.url, true).query.token
  if (url_token === token) {
    return next()
  }

  console.log('Unauthorized request - dropping')
  return res.sendStatus(401)
}

const publish = (req, res) =>
  mqttClient.publish(req.path, JSON.stringify(req.body), { qos: 2 }, err => {
    if (!err) {
      return res.sendStatus(204)
    }
    console.log('error sending', err)
    return res.status(500).send('error')
  })

process.on('SIGTERM', () => {
  console.log('sigterm')
  server.close(function() {
    process.exit(0)
  })
})

if (token) {
  app.post('*', checkAuth, publish)
} else {
  // dont check auth
  app.post('*', publish)
}
