# post2mqtt

A easy help to convert http posts to mqtt events. This is how it works.

* The system listens to post events.
* The url in the post is used as the mqtt-topic.
* The bodu in the post is used as the mqtt-message

## Usages

I use this in my home assistant automation. This is especially usefull when you don't to give out your home assistant api key, and you can use your own token. 

For example when setting up iftt webhooks to the local home assistant installation

## Configuration variables

Environment variables:

Name | Descripttion | Default value
---|---|---
`PORT` | The port to listen on for the http requests | `8080`
`MQTT_URL` | The url to the mqtt server | `mqtt://localhost`
`MQTT_USERNAME` | Username for the MQTT server | `''`
`MQTT_PASSWORD` | Password for the MQTT | `''`
