#include <HandLandmarkParser.h>
HandLandmarkParser parser;

String jsonData;

void setup() {
  Serial.begin(115200);
}

void loop() {
  if (Serial.available()) {
    jsonData = Serial.readStringUntil('\n');

    // Debug: Print the received raw JSON data
    // Uncomment these two lines to see what data is recieved by Arduino from webpage
    // Serial.println("Received Raw Data: ");
    // Serial.println(jsonData);

    // Attempt to parse the JSON data
    DeserializationError error = parser.parseJson(jsonData);
    if (error) {
      // Print the error code and message
      Serial.print("deserializeJson() failed: ");
      Serial.println(error.c_str());
      return;  // Exit the loop if parsing fails
    }

    // Get the coordinates
    float x = parser.getX("Hand0_Landmark4");
    float y = parser.getY("Hand0_Landmark4");
    float z = parser.getZ("Hand0_Landmark4");
    // Debug: Print the parsed coordinates
    Serial.println("x:" + String(x) + ", y:" + String(y) + ", z:" + String(z));
  }
}
