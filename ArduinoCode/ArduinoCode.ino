#include <Servo.h>

#define numofvalrec 5
#define digitsperval 1

Servo servothumb;          
Servo servoindex;          
Servo servomiddle;
Servo servoring;
Servo servopinky;

char number[50];
char c;
String myStringRec;
int stringCounter = 0;
bool stringCounterStart = false;
String myRevivedString;
int stringLength = 6;

int servoPinky, servoMiddle, servoIndex, servoThumb, servoRing;
int myVals[] = { 0, 0, 0, 0, 0 };
int x=0, y=180;




void setup() {
  // Only executed once
  Serial.begin(9600);
  servothumb.attach(9);
  servoindex.attach(10);  
  servopinky.attach(11);
  servoring.attach(12);
  servomiddle.attach(13);
}

void receiveData() {
  int i = 0;
  while (Serial.available()) {
    char c = Serial.read();

    if (c == '$') {
      stringCounterStart = true;
    }
    if (stringCounterStart == true) {
      if (stringCounter < stringLength) {
        myRevivedString = String(myRevivedString + c);
        stringCounter++;
      }
      if (stringCounter >= stringLength) {
        stringCounter = 0;
        stringCounterStart = false;
        servoPinky = myRevivedString.substring(5, 6).toInt();
        servoRing = myRevivedString.substring(4, 5).toInt();
        servoMiddle = myRevivedString.substring(3, 4).toInt();
        servoIndex = myRevivedString.substring(2, 3).toInt();
        servoThumb = myRevivedString.substring(1, 2).toInt();
        
        
        
        
        Serial.print(servoPinky);
        Serial.print(" ");
        Serial.print(servoRing);
        Serial.print(" ");
        Serial.print(servoMiddle);
        Serial.print(" ");
        Serial.print(servoIndex);
        Serial.print(" ");
        Serial.println(servoThumb);
        myRevivedString = "";
      }
    }
  }
}



void loop() {
  // This code will be executed multiple times
  receiveData();
  if (servoPinky ==1){  servopinky.write(x);}else{servopinky.write(y);}
if (servoIndex ==1){  servoindex.write(y);}else{servoindex.write(x);}
if (servoMiddle ==1){  servomiddle.write(x);}else{servomiddle.write(y);}
if (servoThumb ==1){  servothumb.write(x);}else{servothumb.write(y);}
if (servoRing ==1){  servoring.write(x);}else{servoring.write(y);}

  delay(15);
}