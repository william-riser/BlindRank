import React from "react";
import Player from "../utils";
import PlayerCard from "../components/PlayerCard";

const VotePage: React.FC = () => {
  const [player1, setPlayer1] = React.useState<Player | null>();
  const [player2, setPlayer2] = React.useState<Player | null>();

  const getTwoRandomPlayers = async () => {
    try {
      const response = await fetch("/api/v1/random");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setPlayer1(Player.fromJson(data[0]));
      setPlayer2(Player.fromJson(data[1]));
      console.log(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center mx-auto">
      <h1 className="text-xl font-bold">Vote</h1>
      <button
        className="bg-gray-300 rounded-md p-2"
        onClick={getTwoRandomPlayers}
      >
        Get two random players
      </button>
      <div className="flex w-full">
        {player1 && <PlayerCard player={player1} />}
        {player2 && <PlayerCard player={player2} />}
      </div>
    </div>
  );
};

export default VotePage;
