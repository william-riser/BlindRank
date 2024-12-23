from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson import ObjectId
from flask_cors import CORS
from utils.elo import Player, expectedScore, updateElo

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

# Route to record a vote
@app.route('/api/v1/vote', methods=['POST'])
def vote():
    try:
        data = request.get_json()
        winner_id = data.get('winnerId')
        loser_id = data.get('loserId')

        if not winner_id or not loser_id:
            return jsonify({'error': 'Missing winnerId or loserId'}), 400

        try:
            winner = collection.find_one({'_id': ObjectId(winner_id)})
            loser = collection.find_one({'_id': ObjectId(loser_id)})
        except Exception as e:
            print(f"Error in ObjectId conversion: {e}")
            return jsonify({'error': 'Invalid ID format'}), 400

        if not winner or not loser:
            return jsonify({'error': 'Players not found'}), 404

        print(f"Winner: {winner}, Loser: {loser}")

        winner_player = Player(winner['name'], winner['elo'])
        loser_player = Player(loser['name'], loser['elo'])
        
        updateElo(winner_player, loser_player)

        winnerNewElo = winner_player.getElo()
        loserNewElo = loser_player.getElo()

        print(f"New elo scores: {winnerNewElo}, {loserNewElo}")
        collection.update_one({'_id': ObjectId(winner_id)}, {'$set': {'elo': winnerNewElo}})
        collection.update_one({'_id': ObjectId(loser_id)}, {'$set': {'elo': loserNewElo}})

        return jsonify({'message': 'Vote recorded successfully'}), 200
    except Exception as e:
        print(f"Unexpected error: {e}")
        return jsonify({'error': 'Internal server error'}), 500



if __name__ == '__main__':
    app.run(debug=True)
