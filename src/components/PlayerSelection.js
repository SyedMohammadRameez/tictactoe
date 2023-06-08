import React from 'react';


const PlayerSelectionScreen = ({ handlePlayerSelection }) => {
    return (
      <div>
        <h2>Choose Player</h2>
        <div>
          <button onClick={() => handlePlayerSelection("🟡")}>🟡</button>
          <button onClick={() => handlePlayerSelection("❌")}>❌</button>
        </div>
      </div>
    );
  };
  
  export const PlayerInput = ({
    label = "Player Name: {player}",
    value,
    onChange,
    handleUsername,
  }) => {
    return (
      <div>
        <h2>{label}</h2>
        <div>
          <input type="text" value={value} onChange={onChange} />
          <button onClick={handleUsername}>Create</button>
        </div>
      </div>
    );
  };
  
  export const GameHistory = ({ gameHistory, handleGameHistory }) => {
    return (
      <div>
        <h2>Game history</h2>
        <div style={{ 
          display: 'flex',
          flexDirection: 'column'
         }}>
          {gameHistory.map((gHistory, i) => {
            return (
              <button
                style={{
                  background: "#fff",
                  color: "#000",
                  border: "1px solid #000",
                  padding: "5px 10px",
                  margin: "5px",
                  cursor: "pointer",
                }}
                onClick={() => handleGameHistory(gHistory, i)}
                className="hisotry"
                key={i}
              >
                {gHistory.player}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  export default PlayerSelectionScreen;