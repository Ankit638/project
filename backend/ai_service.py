from flask import Flask, request, jsonify
import spacy

app = Flask(__name__)

# Load Spacy model (replace with your model)
nlp = spacy.load("en_core_web_sm")

@app.route('/process_query', methods=['POST'])
def process_query():
    data = request.get_json()
    query = data.get('query', '')
    doc = nlp(query)
    response = f"Processed query: {query}"
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Ensure this port doesn't conflict with Express
