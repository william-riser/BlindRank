
class Player {
    _id: string;
    name: string;
    elo: number;
    constructor(_id: string, name: string, elo: number) {
        this._id = _id;
        this.name = name;
        this.elo = elo;
    }

    static fromJson(json: unknown): Player {
        if (typeof json !== 'object' || json === null) {
            throw new Error('Invalid JSON: Not an object');
        }
    
        const { _id, name, elo } = json as { _id: string; name: string; elo: number };
    
        if (typeof _id !== 'string' || typeof name !== 'string' || typeof elo !== 'number') {
            throw new Error('Invalid JSON: Missing or incorrect fields');
        }
    
        return new Player(_id, name, elo);
    }
    
}

export default Player;