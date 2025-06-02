var port = null;
var encoder = new TextEncoder();
var writer = null, reader = null;

class LineBreakTransformer {
  constructor() {
    this.container = '';
  }

  transform(chunk, controller) {
    this.container += chunk;
    const lines = this.container.split('\r\n');
    this.container = lines.pop();
    lines.forEach(line => controller.enqueue(line));
  }

  flush(controller) {
    controller.enqueue(this.container);
  }
}

async function connectSerial() {
  if ("serial" in navigator) {
    try {
      port = await navigator.serial.requestPort();
      await port.open({ baudRate: 115200 });
      writer = port.writable.getWriter()
      reader = port.readable.pipeThrough(new TextDecoderStream()).pipeThrough(new TransformStream(new LineBreakTransformer())).getReader();
    } catch (error) {
      console.error("Error connecting to serial port:", error);
      alert(
        "Failed to connect to the serial port. Make sure your device is connected."
      );
    }
  } else {
    alert(
      "Web Serial API is not supported in this browser. Please try with Chrome."
    );
  }
}

async function disconnectSerial() {
  if (!port) return;
  try {
    if (reader) {
      await reader.cancel();
    }
    if (writer) {
      await writer.close();
      await writer.releaseLock();
      writer = null;
    }
    await port.close();
    port = null;
  } catch (error) {
    console.error(error);
  } finally {
    if (port) {
      await port.close();
      port = null;
    }
  }

}

async function readSerial() {
  try {
    while (port && reader) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }
      console.log(value);
    }
  } catch (error) {
    console.error('READ DATA ERROR: ', error);
  } finally {
    reader.releaseLock();
    reader = null;
  }
}

async function writeSerial(data) {
  if (port && writer) {
    let toWrite = encoder.encode(data);
    await writer.write(toWrite);
  }
}

export { port, connectSerial, disconnectSerial, readSerial, writeSerial }