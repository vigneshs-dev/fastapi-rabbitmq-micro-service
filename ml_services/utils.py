import json
import base64
# import pandas as pd
import easyocr  # Change from keras_ocr to easyocr
import pika
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
RABBITMQ_URL = os.getenv("RABBITMQ_URL")

class OCRService:
    def __init__(self):
        # Initialize easyocr Reader for English
        self.reader = easyocr.Reader(['en'])

    def easy_ocr(self, image_path):
        # Read text from the image
        results = self.reader.readtext(image_path)
        
        # Extract and join text from results
        words = [detection[1] for detection in results]
        sentence = ' '.join(words)
        return sentence

    def process_request(self, message):
        message_body = json.loads(message)
        user_name = message_body['user_name']
        user_email = message_body['user_email']
        user_id = message_body['user_id']
        file_base64 = message_body['file']
        print(f" [x] user_id: {user_id} request received from gateway..")
        print(f" [x] processing request for {user_name}")

        # Decode and save the image file
        file_data = base64.b64decode(file_base64.encode())
        os.makedirs("artifacts", exist_ok=True)
        with open('artifacts/decoded_file.png', 'wb') as f:
            f.write(file_data)

        # Perform OCR
        image_path = "artifacts/decoded_file.png"
        ocr_text = self.easy_ocr(image_path)  # Updated to use easy_ocr method
        print(" [^] OCR processing done !!!")

        return {
            "user_id": user_id,
            "user_name": user_name,
            "user_email": user_email,
            "ocr_text": ocr_text
        }


def send_email_notification(email, ocr_text, channel):
    message = {
        'email': email,
        'subject': 'OCR Process Completed !!',
        'body': f'OCR processing completed. Extracted text: {ocr_text}',
        'other': 'null',
    }
    try:
        channel.basic_publish(
            exchange="",
            routing_key='email_notification',
            body=json.dumps(message),
            properties=pika.BasicProperties(
                delivery_mode=pika.spec.PERSISTENT_DELIVERY_MODE
            ),
        )
        print("Sent OCR Process Completed email notification")
    except Exception as err:
        print(f"Failed to publish message: {err}")
