# backend/app.py
from flask import Flask, request, jsonify
from your_ai_model import process_query  # Import your AI model logic

app = Flask(__name__)

# API endpoint to handle queries
@app.route('/query', methods=['POST'])
def handle_query():
    data = request.get_json()
    query = data['query']
    
    # Process the query using your AI model
    result = process_query(query)
    
    # Return the result to the frontend
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
