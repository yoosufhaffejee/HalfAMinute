# Case Files speaker order

Each investigation draws a speaker randomly from the active players with the fewest completed speaking turns. Everyone therefore speaks before anyone repeats. A new case or replay starts a fresh draw with turn counts reset. The investigation budget is still shared by the crew: twelve players and four turns produce four distinct speakers, rather than twelve turns.

The random state is stored with the game and advances only when assigning a new speaker. Local play and online transactions use the same rule, so refreshes and transaction retries preserve the selection. Departed players are excluded. Unscored abandoned rounds do not consume a turn; late arrivals join the least-used pool. Existing temporary-disconnection and review-recovery behavior is retained.

237 automated tests pass. Coverage includes local and online rosters, two/three-player repeated cycles, twelve players/four turns, different random orders, serialized state/retry stability, rematch resets, late arrivals and departures. Shared online protocol is now 17; clients should refresh and create a new lobby.
