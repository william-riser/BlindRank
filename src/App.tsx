import { useState } from "react";

function App() {
  const [name, setName] = useState<string>("");
  const [overall, setOverall] = useState<number | null>(null);

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
      <div>
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