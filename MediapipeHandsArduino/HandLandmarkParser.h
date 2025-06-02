#ifndef HANDLANDMARKPARSER_H
#define HANDLANDMARKPARSER_H

#include <Arduino.h>
#include <ArduinoJson.h>

class HandLandmarkParser {
public:
    HandLandmarkParser();
    DeserializationError parseJson(const String &json);
    float getX(const String &landmarkKey);
    float getY(const String &landmarkKey);
    float getZ(const String &landmarkKey);

private:
    StaticJsonDocument<2048> doc;
};

#endif
