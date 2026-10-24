// DECK CONTEXT: holds all decks + scores and saves them to the phone

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "cramwise_data";
const DeckContext = createContext(null);

export function DeckProvider({ children }) {
  // decks look like: { id, title, cards: [{ id, front, back }] }
  const [decks, setDecks] = useState([]);

  // scores look like: { id, title, date, score }  (filled by the quiz later)
  const [scores, setScores] = useState([]);

  // true after saved data is read (stops an empty list from overwriting it)
  const [loaded, setLoaded] = useState(false);

  // LOAD saved data once when the app starts
  useEffect(() => {
    async function load() {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const data = JSON.parse(saved);
          setDecks(data.decks || []);
          setScores(data.scores || []);
        }
      } catch (error) {
        console.warn("Could not load saved data", error);
      }
      setLoaded(true);
    }
    load();
  }, []);

  // SAVE every time decks or scores change
  useEffect(() => {
    if (loaded) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ decks, scores }));
    }
  }, [decks, scores, loaded]);

  // Creates a deck and returns its id.
  const addDeck = (title) => {
    const id = Date.now().toString();
    setDecks((current) => [...current, { id, title, cards: [] }]);
    return id;
  };

  const deleteDeck = (deckId) => {
    setDecks((current) => current.filter((deck) => deck.id !== deckId));
  };

  const addCard = (deckId, front, back) => {
    const card = { id: Date.now().toString(), front, back };
    setDecks((current) =>
      current.map((deck) =>
        deck.id === deckId ? { ...deck, cards: [...deck.cards, card] } : deck,
      ),
    );
  };

  const deleteCard = (deckId, cardId) => {
    setDecks((current) =>
      current.map((deck) =>
        deck.id === deckId
          ? { ...deck, cards: deck.cards.filter((c) => c.id !== cardId) }
          : deck,
      ),
    );
  };

  // Average of all saved scores (0 if there are none).
  const average =
    scores.length === 0
      ? 0
      : Math.round(scores.reduce((sum, s) => sum + s.score, 0) / scores.length);

  return (
    <DeckContext.Provider
      value={{
        decks,
        scores,
        average,
        addDeck,
        deleteDeck,
        addCard,
        deleteCard,
      }}
    >
      {children}
    </DeckContext.Provider>
  );
}

// Screens use:  const { decks } = useDecks();
export function useDecks() {
  return useContext(DeckContext);
}
