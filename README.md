# Lap la lap lanh - Smart light 💡

## Terms

### MQTT

`topic` = `laplalaplanh/{channel}/{device-id}` (e.g. `laplalaplanh/status/dv1`)

- Available channels:
  - `hello`: For testing purposes
  - `status`: Device status
  - `action`: User actions

### Action list

- Turn on/off
- Change the operating mode
- Change light mode
  - Effect
  - Color
- Change report interval (3min, 5min, etc.)

### Light mode

```json
"topic": "laplalaplanh/action/light-mode/dv1",
"payload": {
  "mode": "single-color",
  "color": "#ff0000"
}
```

- Single color: Set the light to a specific color the user chooses
- Flashing: Make the light flash on and off at regular intervals
- Rainbow: Cycle through a spectrum of colors similar to a rainbow

## Data flow

### From `ESP32` to `Server` to `Cloud`

#### Device status (sent after every report interval) (`channel/device-id`)

- Battery level
- Light temperature
- Environment brightness
- Operating mode (automatic, manual, etc.)
- Light mode
- Timestamp

#### User Actions (sent after executing an action from the server)

- Action Id
- Success or failure

### From `Client` to `ESP32`

#### User Actions

- User Id
- Action Id
- Action
- Timestamp
