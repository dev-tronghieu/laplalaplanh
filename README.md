# Lap la lap lanh - Smart light 💡

## Terms

### MQTT

`topic` = `laplalaplanh/{channel}/{device-id}` (e.g. `laplalaplanh/status/dv1`)

- Available channels:
  - `status`: Device status
  - `action`: User actions

### Action list

- Turn on/off
- Change the operating mode
- Change effect
- Change color

### Effect

- Single color: Set the light to a specific color the user chooses
- Flashing: Make the light flash on and off at regular intervals
- Rainbow: Cycle through a spectrum of colors similar to a rainbow

## Data flow

### From `ESP32` to `Server` to `Cloud`

`topic` = `laplalaplanh/status/{device-id}` (e.g. `laplalaplanh/status/dv1`)

- Light temperature
- Environment brightness
- Operating mode (automatic, manual, etc.)
- Effect
- Color
- Timestamp

### From `Client` to `ESP32`

`topic` = `laplalaplanh/action/action-id/{device-id}` (e.g. `laplalaplanh/action/color/dv1`)
