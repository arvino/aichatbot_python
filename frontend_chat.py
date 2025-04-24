import grpc
import chat_pb2
import chat_pb2_grpc
import os
from dotenv import load_dotenv

load_dotenv()

def run():
    channel = grpc.insecure_channel(f'localhost:{os.getenv("GRPC_PORT", "50053")}')
    stub = chat_pb2_grpc.ChatServiceStub(channel)
    
    print("Chatbot siap! Ketik 'exit' untuk keluar.")
    
    while True:
        message = input("Anda: ")
        if message.lower() == 'exit':
            break
            
        try:
            response = stub.SendMessage(chat_pb2.ChatRequest(message=message))
            print(f"Bot: {response.response}")
        except grpc.RpcError as e:
            print(f"Error: {e.details()}")

if __name__ == '__main__':
    run() 