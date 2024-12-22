import Player from '../utils';

interface PlayerCardProps {
    player: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }: PlayerCardProps) => {

    

    return (
        <div className='bg-blue-200 p-4 m-4 rounded-xl w-full'>
            <h2>{player.name}</h2>
            <p>Elo: {player.elo}</p>
        </div>
    )
}

export default PlayerCard;