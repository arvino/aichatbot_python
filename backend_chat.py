import grpc
from concurrent import futures
import chat_pb2
import chat_pb2_grpc
import requests
import os
from dotenv import load_dotenv

load_dotenv()

DEEPSEEK_API_KEY = os.getenv('DEEPSEEK_API_KEY')
DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions"

class ChatServicer(chat_pb2_grpc.ChatServiceServicer):
    def SendMessage(self, request, context):
        try:
            headers = {
                "Authorization": f"Bearer {DEEPSEEK_API_KEY}",
                "Content-Type": "application/json"
            }
            
            data = {
                "model": "deepseek-chat",
                "messages": [{"role": "user", "content": request.message}]
            }
            
            response = requests.post(DEEPSEEK_API_URL, headers=headers, json=data)
            response.raise_for_status()
            
            ai_response = response.json()['choices'][0]['message']['content']
            
            return chat_pb2.ChatResponse(response=ai_response)
            
        except Exception as e:
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details(str(e))
            return chat_pb2.ChatResponse()

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    chat_pb2_grpc.add_ChatServiceServicer_to_server(ChatServicer(), server)
    server.add_insecure_port(f'[::]:{os.getenv("GRPC_PORT", "50053")}')
    server.start()
    print(f"Server started on port {os.getenv('GRPC_PORT', '50053')}")
    server.wait_for_termination()

if __name__ == '__main__':
    serve() 