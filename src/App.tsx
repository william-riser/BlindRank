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
      <div className='bg-blue-200 min-h-screen'>
        <h1 className='text-pink-600'>Tailwind Test</h1>
        <form>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              getRatingOfPlayer(name);
            }}
          >
            Submit
          </button>
        </form>
        {elo !== null && (
          <p>
            {name} has an elo rating of {elo}
          </p>
        )}
      </div>
    </>
  );
}

export default App;
