# post2mqtt

A easy help to convert http posts to mqtt events. This is how it works.

- The system listens to post events.
- The url in the post is used as the mqtt-topic.
- The bodu in the post is used as the mqtt-message

## Usages

I use this in my home assistant automation. Especially for webhooks from iftt. This saves me from giving out the home assistant api token and also I get to use mqtt

## Configuration variables

Environment variables:

| Name            | Descripttion                                      | Default value      |
| --------------- | ------------------------------------------------- | ------------------ |
| `PORT`          | The port to listen on for the http requests       | `8080`             |
| `MQTT_URL`      | The url to the mqtt server                        | `mqtt://localhost` |
| `MQTT_USERNAME` | Username for the MQTT server                      | `''`               |
| `MQTT_PASSWORD` | Password for the MQTT                             | `''`               |
| `MQTT_RETAIN`   | MQTT retain flag for messages.                    | `true`             |
| `TOKEN`         | Token that caller should use to authenticate with | `''`               |

## Examples

### From source

The server is started with `TOKEN=theauthtoken yarn start` then

```bash
curl -d '{"key1":"value1", "key2":"value2"}' \
 -H "Content-Type: application/json" \
 -H "Authorization: theauthtoken" \
 -X POST http://localhost:8080/a/b
```

Whould post

```json
{ "key1": "value1", "key2": "value2" }
```

to the `a/b` mqtt topic to the localhost mqtt

If you cant use Authorization header thefollowing does the same thing

```bash
curl -d '{"key1":"value1", "key2":"value2"}' \
 -H "Content-Type: application/json" \
 -X POST http://localhost:8080/a/b?token=theauthtoken
```

### Docker

The server can be started from docker

```bash
docker run --rm -e TOKEN=theauthtoken \
           -e MQTT_URL="mqtt://192.168.0.3" \
           -p 8080:8080 mtand/post2mqtt
```
