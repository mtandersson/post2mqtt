# post2mqtt

A easy help to convert http posts to mqtt events. This is how it works.

* The system listens to post events.
* The url in the post is used as the mqtt-topic.
* The bodu in the post is used as the mqtt-message

## Usages

I use this in my home assistant automation. Especially for webhooks from iftt. This saves me from giving out the home assistant api token and also I get to use mqtt

## Configuration variables

Environment variables:

Name | Descripttion | Default value
---|---|---
`PORT` | The port to listen on for the http requests | `8080`
`MQTT_URL` | The url to the mqtt server | `mqtt://localhost`
`MQTT_USERNAME` | Username for the MQTT server | `''`
`MQTT_PASSWORD` | Password for the MQTT | `''`
`TOKEN` | Token that caller should use to authenticate with | `''`

## Examples

The server is started with `TOKEN=theauthtoken yarn start` then 

```bash
curl -d '{"key1":"value1", "key2":"value2"}' \
 -H "Content-Type: application/json" \
 -H "Authorization: theauthtoken" \
 -X POST http://localhost:8080/a/b
```

Whould post 

```json
{"key1":"value1", "key2":"value2"}
```

to the `a/b` mqtt topic

If you cant use Authorization header thefollowing does the same thing

```bash
curl -d '{"key1":"value1", "key2":"value2"}' \
 -H "Content-Type: application/json" \
 -X POST http://localhost:8080/a/b?token=theauthtoken
```

