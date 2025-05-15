
<script>
  import { onMount } from 'svelte';

  // Persistent player pool (localStorage)
  let playerName = '';
  let players = [];
  let selectedPlayers = new Set();
  let teamSize = 4;
  let teams = [];
  let error = '';

  // Load from localStorage
  onMount(() => {
    const saved = localStorage.getItem('game-players');
    if (saved) players = JSON.parse(saved);
  });

  function savePlayers() {
    localStorage.setItem('game-players', JSON.stringify(players));
  }

  function addPlayer() {
    if (playerName.trim() && !players.includes(playerName.trim())) {
      players = [...players, playerName.trim()];
      playerName = '';
      savePlayers();
    }
  }

  function removePlayer(name) {
    players = players.filter(p => p !== name);
    selectedPlayers.delete(name);
    savePlayers();
  }

  function toggleSelect(name) {
    if (selectedPlayers.has(name)) selectedPlayers.delete(name);
    else selectedPlayers.add(name);
  }

  function selectAll() {
    selectedPlayers = new Set(players);
  }
  function deselectAll() {
    selectedPlayers = new Set();
  }

  function generateTeams() {
    error = '';
    const selected = Array.from(selectedPlayers);
    if (selected.length < 2) {
      error = 'Select at least 2 players.';
      teams = [];
      return;
    }
    if (teamSize < 1) {
      error = 'Team size must be at least 1.';
      return;
    }
    // Shuffle
    const shuffled = [...selected].sort(() => Math.random() - 0.5);
    // Split into teams
    teams = [];
    for (let i = 0; i < shuffled.length; i += teamSize) {
      teams.push(shuffled.slice(i, i + teamSize));
    }
  }
</script>

<main>
  <h1>Game Team Randomizer</h1>
  <div class="card">
    <h2>Player Management</h2>
    <div class="player-input">
      <input
        type="text"
        placeholder="Add player name"
        bind:value={playerName}
        on:keydown={(e) => e.key === 'Enter' && addPlayer()}
        aria-label="Add player name"
      />
      <button on:click={addPlayer}>Add</button>
    </div>
    <div class="player-list">
      {#if players.length === 0}
        <p class="empty">No players yet.</p>
      {:else}
        <ul>
          {#each players as name}
            <li class:selected={selectedPlayers.has(name)}>
              <label>
                <input type="checkbox" checked={selectedPlayers.has(name)} on:change={() => toggleSelect(name)} />
                <span class="player-name">{name}</span>
              </label>
              <button class="remove" on:click={() => removePlayer(name)} title="Remove">×</button>
            </li>
          {/each}
        </ul>
        <div class="select-actions">
          <button on:click={selectAll}>Select All</button>
          <button on:click={deselectAll}>Deselect All</button>
        </div>
      {/if}
    </div>
  </div>

  <div class="card">
    <h2>Team Generation</h2>
    <div class="team-controls">
      <label for="team-size">Team size:</label>
      <input id="team-size" type="number" min="1" bind:value={teamSize} />
      <button on:click={generateTeams}>Generate Teams</button>
    </div>
    {#if error}
      <p class="error">{error}</p>
    {/if}
    {#if teams.length > 0}
      <div class="teams">
        {#each teams as team, i}
          <div class="team-card">
            <h3>Team {i + 1}</h3>
            <ul>
              {#each team as member}
                <li>{member}</li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</main>


<style>
  :global(body) {
    background: linear-gradient(135deg, #2d0036 0%, #1a0022 100%);
    color: #fff;
    min-height: 100vh;
    font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
    margin: 0;
  }
  main {
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
    background: linear-gradient(135deg, rgba(44,0,66,0.98) 0%, rgba(26,0,34,0.98) 100%);
    border-radius: 1.5em;
    box-shadow: 0 4px 32px 0 rgba(164, 80, 139, 0.18);
    border: 2px solid #a4508b;
  }
  h1 {
    color: #ff6fb5;
    text-align: center;
    font-size: 2.1em;
    letter-spacing: 0.04em;
    margin-bottom: 0.7em;
    text-shadow: 0 2px 8px #a4508b55;
  }
  h2 {
    margin-top: 0;
    color: #d726ff;
    font-size: 1.5em;
    letter-spacing: 0.02em;
    text-align: center;
    text-shadow: 0 1px 4px #ff6fb555;
  }
  .card {
    background: linear-gradient(135deg, rgba(44,0,66,0.85) 0%, rgba(26,0,34,0.85) 100%);
    border-radius: 1.2em;
    box-shadow: 0 2px 16px 0 rgba(164, 80, 139, 0.18);
    padding: 1.5em 1.5em 1.2em 1.5em;
    margin-bottom: 2em;
    border: 1.5px solid #a4508b;
  }
  .player-input {
    display: flex;
    gap: 0.5em;
    margin-bottom: 1em;
  }
  .player-input input {
    flex: 1;
    padding: 0.6em 1em;
    border-radius: 6px;
    border: 1.5px solid #d726ff;
    font-size: 1em;
    background: #2d0036;
    color: #ff6fb5;
    font-weight: 500;
    box-shadow: 0 1px 4px 0 rgba(164, 80, 139, 0.10);
    outline: none;
    transition: border 0.2s, box-shadow 0.2s;
  }
  .player-input input:focus {
    border: 1.5px solid #ff6fb5;
    box-shadow: 0 0 0 2px #d726ff44;
  }
  .player-input button {
    background: linear-gradient(90deg, #d726ff 0%, #ff6fb5 100%);
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 1px 4px 0 #a4508b33;
    transition: background 0.2s, box-shadow 0.2s;
  }
  .player-input button:hover {
    background: linear-gradient(90deg, #ff6fb5 0%, #d726ff 100%);
    box-shadow: 0 2px 8px 0 #d726ff33;
  }
  .player-list ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .player-list li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.4em 0.7em;
    border-bottom: 1px solid #a4508b55;
    border-radius: 0.5em;
    margin-bottom: 0.2em;
    transition: background 0.2s;
    background: transparent;
  }
  .player-list li.selected {
    background: linear-gradient(90deg, #a4508b33 0%, #ff6fb522 100%);
  }
  .player-list label {
    flex: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.7em;
  }
  .player-list .player-name {
    font-weight: 600;
    color: #ff6fb5;
    letter-spacing: 0.01em;
    font-size: 1.08em;
    text-shadow: 0 1px 2px #a4508b44;
  }
  .player-list .remove {
    background: none;
    border: none;
    color: #d726ff;
    font-size: 1.3em;
    cursor: pointer;
    margin-left: 0.5em;
    transition: color 0.2s;
    padding: 0 0.3em;
  }
  .player-list .remove:hover {
    color: #ff6fb5;
  }
  .select-actions {
    margin-top: 0.7em;
    display: flex;
    gap: 0.7em;
    justify-content: flex-end;
  }
  .select-actions button {
    min-width: 110px;
    font-size: 1em;
    font-weight: 600;
    background: linear-gradient(90deg, #d726ff 0%, #ff6fb5 100%);
    color: #fff;
    border: none;
    border-radius: 6px;
    box-shadow: 0 1px 4px 0 #a4508b33;
    cursor: pointer;
    transition: background 0.2s, box-shadow 0.2s;
  }
  .select-actions button:hover {
    background: linear-gradient(90deg, #ff6fb5 0%, #d726ff 100%);
    box-shadow: 0 2px 8px 0 #d726ff33;
  }
  .empty {
    color: #fff;
    opacity: 0.7;
    text-align: center;
    margin: 1em 0;
  }
  .team-controls {
    display: flex;
    align-items: center;
    gap: 1em;
    justify-content: center;
    margin-bottom: 1em;
  }
  .team-controls label {
    color: #ff6fb5;
    font-weight: 500;
    font-size: 1.1em;
    text-shadow: 0 1px 2px #a4508b44;
  }
  .team-controls input[type="number"] {
    width: 3.5em;
    padding: 0.4em 0.6em;
    border-radius: 6px;
    border: 1.5px solid #d726ff;
    font-size: 1em;
    background: #2d0036;
    color: #ff6fb5;
    font-weight: 600;
    margin-left: 0.3em;
    margin-right: 0.3em;
    outline: none;
    transition: border 0.2s, box-shadow 0.2s;
  }
  .team-controls input[type="number"]:focus {
    border: 1.5px solid #ff6fb5;
    box-shadow: 0 0 0 2px #d726ff44;
  }
  .team-controls button {
    background: linear-gradient(90deg, #d726ff 0%, #ff6fb5 100%);
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 1px 4px 0 #a4508b33;
    transition: background 0.2s, box-shadow 0.2s;
  }
  .team-controls button:hover {
    background: linear-gradient(90deg, #ff6fb5 0%, #d726ff 100%);
    box-shadow: 0 2px 8px 0 #d726ff33;
  }
  .teams {
    display: flex;
    flex-wrap: wrap;
    gap: 2em;
    margin-top: 2em;
    justify-content: center;
  }
  .team-card {
    background: linear-gradient(135deg, rgba(44,0,66,0.85) 0%, rgba(26,0,34,0.85) 100%);
    border-radius: 1em;
    padding: 1.2em 2em 1em 2em;
    min-width: 150px;
    box-shadow: 0 2px 12px 0 rgba(164, 80, 139, 0.18);
    border: 2px solid #d726ff;
    text-align: center;
    transition: border 0.2s, box-shadow 0.2s;
  }
  .team-card h3 {
    margin: 0 0 0.7em 0;
    color: #ff6fb5;
    font-size: 1.2em;
    letter-spacing: 0.02em;
    font-weight: 700;
    text-shadow: 0 1px 2px #a4508b33;
  }
  .team-card ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .team-card li {
    padding: 0.3em 0;
    color: #fff;
    font-size: 1.08em;
    font-weight: 500;
    letter-spacing: 0.01em;
    text-shadow: 0 1px 2px #a4508b44;
  }
  .error {
    color: #ff6fb5;
    font-weight: bold;
    text-align: center;
    margin-top: 1em;
    text-shadow: 0 1px 2px #a4508b44;
  }
</style>
