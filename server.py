from flask import Flask, jsonify
from pymongo import MongoClient
from bson import ObjectId
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

client = MongoClient('mongodb://localhost:27017/')
db = client['blindRank']
collection = db['players']

# Helper function to serialize MongoDB documents into JSON
def serialize_document(document):
    return {key: (str(value) if isinstance(value, ObjectId) else value) for key, value in document.items()}

# Route to test the API
@app.route('/api/v1/hello', methods=['GET'])
def get_data():
    data = {'message': 'Hello from Flask!'}
    return jsonify(data)

# Route to get all players
@app.route('/api/v1/players', methods=['GET'])
def get_players():
    players = collection.find()
    serialized_players = [serialize_document(player) for player in players]
    return jsonify(serialized_players)

# Route to get a player by ID
@app.route('/api/v1/player/<id>', methods=['GET'])
def get_player(id):
    try:
        player = collection.find_one({'_id': ObjectId(id)})
        if player:
            return jsonify(serialize_document(player))
        else:
            return jsonify({'error': 'Player not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Route to get two random players
@app.route('/api/v1/random', methods=['GET'])
def get_random():
    players = collection.aggregate([{ '$sample': { 'size': 2 } }])
    serialized_players = [serialize_document(player) for player in players]
    return jsonify(serialized_players)

if __name__ == '__main__':
    app.run(debug=True)
