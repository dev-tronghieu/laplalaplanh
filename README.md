# Lap la lap lanh - Smart light

## Data flow

### From `ESP32` to `Server` (via `MQ Broker`)

#### Device status
- Battery level
- Light temperature
- Environment brightness
- Operating mode (automatic, manual, etc.)
- Brightness level (low, medium, high, etc.)
- Light mode:
  - Single color: Set the light to a specific color the user chooses.
  - Flashing: Make the light flash on and off at regular intervals.
  - Pulse: Create a pulsating effect by smoothly varying the brightness.
  - Rainbow: Cycle through a spectrum of colors similar to a rainbow.
  - Party: Randomly change colors and brightness levels for a dynamic and lively effect.
- Timestamp

#### User Actions
- By (user)
- Action:
  - Turn on/off
  - Change the operating mode
  - Adjust brightness
  - Change light mode
    - Change the color of the single-color mode
    - Change flashing speed
    - Change the fade duration of the pulse mode
  - Change data report interval (3min, 5min, etc.)
  - Reset to default settings
- Timestamp

### From `Server` to `ESP32` (via `MQ Broker`)
