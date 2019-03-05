from smbus2 import SMBusWrapper
from sgp30 import Sgp30
import time
with SMBusWrapper(1) as bus:
    sgp=Sgp30(bus, baseline_filename="/tmp/mySGP30_baseline")
    sgp.i2c_geral_call()
    sgp.init_sgp()
    while True:
        co2level=str(sgp.read_measurements())[18:25].split(",")[0]
        print co2level
        time.sleep(1)
