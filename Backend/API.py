from flask import Flask, request, jsonify
from flask_cors import CORS
from cvzone.HandTrackingModule import HandDetector
from cvzone.SerialModule import SerialObject
import cv2


serialObject = SerialObject("COM5", baudRate=9600, digits=1)

cap = cv2.VideoCapture(0)

detector = HandDetector(maxHands=2, detectionCon=0.8)

mode = ""
data = ""


def manual(st):
    print(serialObject.sendData(list(st.split(" "))))


def image_read():
    success, img = cap.read()
    hands, img = detector.findHands(img)

    if hands:
        hand = hands[0]
        fingers = detector.fingersUp(hand)

        print(fingers)
        print(serialObject.sendData(fingers))

    cv2.imshow("Capture", img)
    cv2.waitKey(50)


app = Flask(__name__)
CORS(app)


@app.route("/", methods=["POST"])
def base():
    global mode, data
    try:
        mode = request.form.get("mode")
        data = request.form.get("data")
        print(mode)
        print(data)
        if mode == "d":
            data = ""
        while mode:
            if mode == "d":
                image_read()
            elif data and mode == "m":
                manual(data)
                mode = ""
                data = ""

        return jsonify({
            "status": "Success",
            "code": 200
        })

    except:
        return jsonify({
            "status": "failure",
            "code": 403
        })


if __name__ == "__main__":
    app.run("127.0.0.1", debug=False, port=4100)
