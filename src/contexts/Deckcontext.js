// DECK CONTEXT: holds all decks + scores and saves them to the phone

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "cramwise_data";
const DeckContext = createContext(null);

export function DeckProvider({ children }) {
  const [decks, setDecks] = useState([]);
  const [scores, setScores] = useState([]);
  const [loaded, setLoaded] = useState(false);

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

  useEffect(() => {
    if (loaded) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ decks, scores }));
    }
  }, [decks, scores, loaded]);

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

  const addScore = (deckId, title, score, items = []) => {
    const entry = {
      id: Date.now().toString(),
      deckId,
      title,
      date: new Date().toLocaleDateString(),
      score,
      items,
    };
    setScores((current) => [entry, ...current]);
  };

  const deleteScore = (scoreId) => {
    setScores((current) => current.filter((entry) => entry.id !== scoreId));
  };

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
        addScore,
        deleteScore,
      }}
    >
      {children}
    </DeckContext.Provider>
  );
}

export function useDecks() {
  return useContext(DeckContext);
}