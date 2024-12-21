const PlayerCard = ({ player }) => {
  const [elo, setElo] = useState(null);

  const getRatingOfPlayer = async (name) => {
    try {
      const response = await fetch("/api/v1/player/" + name);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setElo(data.elo);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="bg-blue-200 p-4 m-4">
      <h2 className="text-pink-600">{player}</h2>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          getRatingOfPlayer(player);
        }}
      >
        Get Rating
      </button>
      {elo !== null && (
        <p>
          {player} has an elo rating of {elo}
        </p>
      )}
    </div>
  );
};

export default PlayerCard;
