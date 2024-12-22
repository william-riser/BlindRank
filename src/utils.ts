
class Player {
    id: string;
    name: string;
    elo: number;
    constructor(id: string, name: string, elo: number) {
        this.id = id;
        this.name = name;
        this.elo = elo;
    }


    static fromJson(json: unknown): Player {
        if (typeof json !== 'object' || json === null) {
            throw new Error('Invalid JSON');
        }
        const playerJson = json as { id: string; name: string; elo: number };
        return new Player(playerJson.id, playerJson.name, playerJson.elo);
    }
}

export default Player;