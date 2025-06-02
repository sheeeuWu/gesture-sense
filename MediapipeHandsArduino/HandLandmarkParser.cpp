#include "HandLandmarkParser.h"

HandLandmarkParser::HandLandmarkParser() {}

DeserializationError HandLandmarkParser::parseJson(const String &json) {
    doc.clear(); // Clear the previous document
    return deserializeJson(doc, json);
}

float HandLandmarkParser::getX(const String &landmarkKey) {
    return doc[landmarkKey]["x"];
}

float HandLandmarkParser::getY(const String &landmarkKey) {
    return doc[landmarkKey]["y"];
}

float HandLandmarkParser::getZ(const String &landmarkKey) {
    return doc[landmarkKey]["z"];
}