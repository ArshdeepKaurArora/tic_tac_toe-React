import { useState } from "react";

export default function Player({ initialName, playerSymbol, activePlayer, changePlayerName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName)

  let nameElement = <span className="player-name">{playerName}</span>;

  function editingCondition() {
    setIsEditing((editing) => !editing)

    if (isEditing) {
        changePlayerName(playerSymbol, playerName)
    }
  }

  function handleChangeName(event) {
    setPlayerName(event.target.value)
  }

  if (isEditing) {
    nameElement = <input type="text" required value={playerName} onChange={handleChangeName}/>
  }

  return (
    <li className={(activePlayer) ? "active": undefined}>
      <span className="player">
        {nameElement}
        <span className="player-symbol">{playerSymbol}</span>
      </span>
      <button onClick={editingCondition}>{(isEditing) ? 'Save' : 'Edit'}</button>
    </li>
  );
}
