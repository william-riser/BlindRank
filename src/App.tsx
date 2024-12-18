import './index.css';
import { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState<string>("");
  const [overall, setOverall] = useState<number | null>(null);
  const [allPlayers, setAllPlayers] = useState<string[]>([]);

  
  useEffect(() => {
    const getAllPlayers = async () => {
      try {
        const response = await fetch("/api/v1/players");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setAllPlayers(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    getAllPlayers();
  }, []);


  const getRatingOfPlayer = async (name: string) => {
    try {
      const response = await fetch("/api/v1/player/" + name);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setOverall(data.overall);
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
        {overall !== null && (
          <p>
            {name} has an overall rating of {overall}
          </p>
        )}
      </div>
    </>
  );
}

export default App;
