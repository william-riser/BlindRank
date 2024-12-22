import Player from '../utils';

interface PlayerCardProps {
    player: Player;
    opponent?: Player | null | undefined;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, opponent }: PlayerCardProps) => {

    const handleClicked = async () => {
        if (opponent === undefined) {
            return;
        }
        if (!opponent) {
            console.error('No opponent to vote against');
            return;
        }
        try {
            const response = await fetch('/api/v1/vote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    winnerId: player._id,
                    loserId: opponent?._id ?? '',
                }),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            console.log('Voted');
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    return (
        <div className='bg-blue-200 p-4 m-4 rounded-xl w-full cursor-pointer' onClick={handleClicked}>
            <h2>{player.name}</h2>
            <p>Elo: {player.elo}</p>
            <p>ID: {player._id}</p>
        </div>
    )
}

export default PlayerCard;