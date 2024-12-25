import RPi.GPIO as GPIO
import time
import subprocess

TRIG_PIN = 12
ECHO_PIN = 16

TRIG_WIDTH_S = 0.00001
SOUND_SPEED_M_S = 343

DISTANCE_THRESHOLD_M = 0.3

REPEAT_INTERVAL_S = 3
TURN_OFF_TIME_S = 90

TURN_DISPLAY_ON_SCRIPT = "/home/pi/mirror/scripts/turn-on.bash"
TURN_DISPLAY_OFF_SCRIPT = "/home/pi/mirror/scripts/turn-off.bash"


def trigger():
  # Send trigger
  GPIO.output(TRIG_PIN, GPIO.HIGH)
  time.sleep(TRIG_WIDTH_S)
  GPIO.output(TRIG_PIN, GPIO.LOW)

  # Read echo
  start_time = time.time()
  while GPIO.input(ECHO_PIN) == GPIO.LOW:
    start_time = time.time()

  end_time = time.time()
  while GPIO.input(ECHO_PIN) == GPIO.HIGH:
    end_time = time.time()

  echo_duration = end_time - start_time
  distance = echo_duration * SOUND_SPEED_M_S / 2

  return distance


def main():
  GPIO.setmode(GPIO.BOARD)
  GPIO.setup(TRIG_PIN, GPIO.OUT)
  GPIO.setup(ECHO_PIN, GPIO.IN)

  GPIO.output(TRIG_PIN, GPIO.LOW)
  time.sleep(2)

  # Loop
  last_turned_on = time.time()

  try:
    while True:
      distance = trigger()
      print(f"Distance: {distance} m")
      if distance < DISTANCE_THRESHOLD_M:
        last_turned_on = time.time()
        print("Turning display on")
        subprocess.run(["bash", TURN_DISPLAY_ON_SCRIPT])
      elif time.time() > last_turned_on + TURN_OFF_TIME_S:
        print("Turning display off")
        subprocess.run(["bash", TURN_DISPLAY_OFF_SCRIPT])
      
      time.sleep(REPEAT_INTERVAL_S)

  except:
    print('Stopping echo.py')

  GPIO.cleanup()


if __name__ == "__main__":
  main()
