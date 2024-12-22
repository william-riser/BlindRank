import Player from '../utils';

interface PlayerCardProps {
    player: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }: PlayerCardProps) => {

    

    return (
        <div>
            <h2>{player.name}</h2>
            <p>Elo: {player.elo}</p>
        </div>
    )
}

export default PlayerCard;