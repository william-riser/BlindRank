import PlayerCard from './components/PlayerCard';
import Player from './utils';
import './index.css';
import { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState<string>("");
  const [elo, setelo] = useState<number | null>(null);
  const [allPlayers, setAllPlayers] = useState<string[]>([]);

  
  useEffect(() => {
    try {
      fetch("/api/v1/random")
        .then((response) => response.json())
        .then((data) => setAllPlayers(data));
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }, []);


  const getRatingOfPlayer = async (name: string) => {
    try {
      const response = await fetch("/api/v1/player/" + name);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setelo(data.elo);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <>
      <div className='bg-blue-200 min-h-screen p-2'>
        {
          allPlayers.map((player) => (
            <div key={player} className='bg-white p-4 rounded-md w-1/4'>
              <PlayerCard player={Player.fromJson(player)} />
            </div>
          ))
        }
      </div>
    </>
  );
}

export default App;
