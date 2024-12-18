from flask import Flask, jsonify
from pymongo import MongoClient
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

client = MongoClient('mongodb://localhost:27017/')
db = client['blindRank']
collection = db['players']

# Route to test the API
@app.route('/api/v1/hello', methods=['GET'])
def get_data():
       data = {'message': 'Hello from Flask!'}
       return jsonify(data)

# Route to get play by name
@app.route('/api/v1/player/<name>', methods=['GET'])
def get_player(name):
    filter = {'name': name}
    player = collection.find_one(filter)
    p = { 'name': player['name'], 'overall': player['overall'] }
    return jsonify(p)


if __name__ == '__main__':
    app.run(debug=True)