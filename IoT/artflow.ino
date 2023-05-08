#include <DHT.h>
#include <SPI.h>
#include <MFRC522.h>
#include <Wire.h>
#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

#define PHOTORESISTOR_PIN A0
#define DHT11_PIN D2
#define RST_PIN D3
#define SDA_PIN D4

const char* ssid = "Yuriy";
const char* password = "18052002";

WiFiClientSecure client;
HTTPClient http;

const char* host = "https://artflow20230504154052.azurewebsites.net/api/";

MFRC522 mfrc522(SDA_PIN, RST_PIN);
char tagId[32] = "";
char str[32] = "";

DHT dht(DHT11_PIN, DHT11);
double temperature;
double humidity;
double luminosity;

String orderId;

void setup() {
  Serial.begin(9600);  // Initialize serial communications with the PC
  while (!Serial)
    ;  // Do nothing if no serial port is opened (added for Arduinos based on ATMEGA32U4)
  setup_wifi();

  dht.begin();

  SPI.begin();                        // Init SPI bus
  mfrc522.PCD_Init();                 // Init MFRC522
  delay(4);                           // Optional delay. Some board do need more time after init to be ready, see Readme
  mfrc522.PCD_DumpVersionToSerial();  // Show details of PCD - MFRC522 Card Reader details
  Serial.println(F("Scan PICC to see UID, SAK, type, and data blocks..."));
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    if (mfrc522.PICC_IsNewCardPresent()) {
      if (mfrc522.PICC_ReadCardSerial()) {
        array_to_string(mfrc522.uid.uidByte, 4, str);  //Insert (byte array, length, char array for output)
        if (strcmp(str, tagId) != 0) {
          strncpy(tagId, str, sizeof(tagId));
          get_orderId();
          Serial.println("Started reading state of order №" + orderId + ".\n");
        }
        else {
          Serial.println("Stopped reading state of order №" + orderId + ".\n");
          strncpy(tagId, "", sizeof(tagId));
        }
      }
    }

    if (strcmp("", tagId) != 0) {
      Serial.print("Artpiece Id = ");
      Serial.println(tagId);
      Serial.print("Order Id = ");
      Serial.println(orderId);

      luminosity = analogRead(PHOTORESISTOR_PIN);
      luminosity = luminosity / 1023 * 100;
      Serial.print("Luminosity = ");
      Serial.println(luminosity);

      delay(100);

      temperature = dht.readTemperature();
      Serial.print("Temperature = ");
      Serial.print(temperature);
      Serial.println(" °C");

      delay(100);

      humidity = dht.readHumidity();
      Serial.print("Humidity = ");
      Serial.print(humidity);
      Serial.println(" %");
      Serial.println();

      send_state();
    }
  } else {
    Serial.println("WiFi Disconnected");
  }
  delay(5000);
}

void setup_wifi() {
  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void send_state() {
  // HTTP Details
  String requestUrl = String(host) + "States";
  Serial.println(requestUrl);
  client.setInsecure();
  http.begin(client, requestUrl);
  http.addHeader("Content-Type", "application/json");

  String body = "{\"stateId\": 0," + String(" \"temperature\": ") + temperature + String(", \"humidity\": ") + humidity + String(", \"light\": ") + luminosity + String(", \"orderId\": ") + orderId + String(" }");
  Serial.println("POST body: " + body);

  // Send HTTP POST request
  int httpResponseCode = http.POST(body);
  Serial.print("HTTP Response code: ");
  Serial.println(httpResponseCode);

  if (httpResponseCode == 200) {
    String payload = http.getString();
    Serial.println("Is state valid: " + payload);
  } else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
  // Free resources
  http.end();
  Serial.println();
}

void get_orderId() {
  Serial.println();
  // HTTP Details
  String requestUrl = String(host) + "Orders/artpiece/" + String(tagId);
  Serial.println(requestUrl);
  client.setInsecure();
  http.begin(client, requestUrl);

  // Send HTTP GET request
  int httpResponseCode = http.GET();
  Serial.print("HTTP Response code: ");
  Serial.println(httpResponseCode);

  if (httpResponseCode == HTTP_CODE_OK) {
    orderId = http.getString();
    Serial.println("Order Id: " + orderId);
  } else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
  // Free resources
  http.end();

  Serial.println();
}

void array_to_string(byte array[], unsigned int len, char buffer[]) {
  for (unsigned int i = 0; i < len; i++) {
    byte nib1 = (array[i] >> 4) & 0x0F;
    byte nib2 = (array[i] >> 0) & 0x0F;
    buffer[i * 2 + 0] = nib1 < 0xA ? '0' + nib1 : 'A' + nib1 - 0xA;
    buffer[i * 2 + 1] = nib2 < 0xA ? '0' + nib2 : 'A' + nib2 - 0xA;
  }
  buffer[len * 2] = '\0';
}
