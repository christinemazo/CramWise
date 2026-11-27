// DECK CONTEXT: holds all decks + scores and saves them to the phone

// AsyncStorage saves small data on the phone (it stays after the app closes)
import AsyncStorage from "@react-native-async-storage/async-storage";
// React tools: createContext (shared box), useContext (open the box),
// useEffect (run code at certain moments), useState (remember values)
import { createContext, useContext, useEffect, useState } from "react";

// The name of the "drawer" where the data is saved on the phone
const STORAGE_KEY = "cramwise_data";

// The shared box (the real data is put in by DeckProvider below)
const DeckContext = createContext(null);

// Wraps the app and gives every screen the data and the actions
export function DeckProvider({ children }) {
  // All decks: { id, title, cards: [{ id, front, back }] }
  const [decks, setDecks] = useState([]);

  // All quiz scores: { id, deckId, title, date, score, items }
  const [scores, setScores] = useState([]);

  // true after the saved data has been read (protects the saved data)
  const [loaded, setLoaded] = useState(false);

  // LOAD: runs once when the app starts and reads the saved data
  useEffect(() => {
    async function load() {
      try {
        // Read the saved text from the phone
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          // Turn the text back into decks and scores
          const data = JSON.parse(saved);
          setDecks(data.decks || []);
          setScores(data.scores || []);
        }
      } catch (error) {
        // If reading fails, show a warning instead of crashing
        console.warn("Could not load saved data", error);
      }
      // Loading is finished, so saving is allowed now
      setLoaded(true);
    }
    load();
  }, []);

  // SAVE: runs every time decks or scores change
  useEffect(() => {
    // Only save after loading, or the empty lists would erase saved data
    if (loaded) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ decks, scores }));
    }
  }, [decks, scores, loaded]);

  // Creates a new empty deck and returns its id
  const addDeck = (title) => {
    // The current time in milliseconds works as a unique id
    const id = Date.now().toString();
    // Copy the old list and add the new deck at the end
    setDecks((current) => [...current, { id, title, cards: [] }]);
    return id;
  };

  // Removes a deck (keeps every deck except the one with this id)
  const deleteDeck = (deckId) => {
    setDecks((current) => current.filter((deck) => deck.id !== deckId));
  };

  // Adds a card to one deck
  const addCard = (deckId, front, back) => {
    // The new card
    const card = { id: Date.now().toString(), front, back };
    setDecks((current) =>
      current.map((deck) =>
        // Only the matching deck gets the new card, the others stay the same
        deck.id === deckId ? { ...deck, cards: [...deck.cards, card] } : deck,
      ),
    );
  };

  // Removes one card from one deck
  const deleteCard = (deckId, cardId) => {
    setDecks((current) =>
      current.map((deck) =>
        deck.id === deckId
          ? // Keep every card except the deleted one
            { ...deck, cards: deck.cards.filter((c) => c.id !== cardId) }
          : deck,
      ),
    );
  };

  // Saves a quiz result (items = the card-by-card answers)
  const addScore = (deckId, title, score, items = []) => {
    const entry = {
      id: Date.now().toString(),
      deckId,
      title,
      // Today's date
      date: new Date().toLocaleDateString(),
      score,
      items,
    };
    // Put the newest score at the front of the list
    setScores((current) => [entry, ...current]);
  };

  // Removes one saved score
  const deleteScore = (scoreId) => {
    setScores((current) => current.filter((entry) => entry.id !== scoreId));
  };

  // Average of all saved scores (0 if there are none)
  const average =
    scores.length === 0
      ? 0
      : Math.round(scores.reduce((sum, s) => sum + s.score, 0) / scores.length);

  return (
    // Share the data and the actions with everything inside the provider
    <DeckContext.Provider
      value={{
        decks,
        scores,
        average,
        addDeck,
        deleteDeck,
        addCard,
        deleteCard,
        addScore,
        deleteScore,
      }}
    >
      {children}
    </DeckContext.Provider>
  );
}

// Shortcut for screens: const { decks } = useDecks();
export function useDecks() {
  return useContext(DeckContext);
}
