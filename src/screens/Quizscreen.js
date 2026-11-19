// QUIZ SCREEN: pick a deck, flip cards, grade yourself, save score

import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { getStyles } from "../../styles";
import { useDecks } from "../contexts/Deckcontext";

export default function QuizScreen({ isDark }) {
  const styles = getStyles(isDark);
  const { decks, scores, addScore } = useDecks();

  const [deck, setDeck] = useState(null); // deck being quizzed (null = picking)
  const [cards, setCards] = useState([]); // shuffled cards for this round
  const [index, setIndex] = useState(0); // which card we are on
  const [showAnswer, setShowAnswer] = useState(false);
  const [correct, setCorrect] = useState(0); // how many "Got it"
  const [result, setResult] = useState(null); // { percent, isBest } when done

  // Highest saved score for a deck (null if never taken).
  const getBest = (deckId) => {
    const list = scores.filter((s) => s.deckId === deckId);
    return list.length === 0 ? null : Math.max(...list.map((s) => s.score));
  };

  // Start (or restart) a quiz with a deck.
  const start = (chosen) => {
    setDeck(chosen);
    setCards([...chosen.cards].sort(() => Math.random() - 0.5));
    setIndex(0);
    setCorrect(0);
    setShowAnswer(false);
    setResult(null);
  };

  // Called when the user taps "Got it" or "Missed it".
  const answer = (gotIt) => {
    const total = correct + (gotIt ? 1 : 0);
    setCorrect(total);

    // More cards left: go to the next one
    if (index + 1 < cards.length) {
      setIndex(index + 1);
      setShowAnswer(false);
      return;
    }

    // Last card: work out the score, check the high score, and save it
    const percent = Math.round((total / cards.length) * 100);
    const best = getBest(deck.id);
    setResult({ percent, isBest: best === null || percent > best });
    addScore(deck.id, deck.title, percent);
  };

  // ---------- RESULT ----------
  if (deck && result) {
    return (
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Quiz complete</Text>
        <Text style={styles.subtitle}>{deck.title}</Text>

        <View style={styles.card}>
          <Text style={styles.resultScore}>{result.percent}%</Text>
          <Text style={[styles.cardBody, styles.centerText]}>
            {correct} of {cards.length} correct
          </Text>
          {result.isBest && (
            <Text
              style={[styles.cardTitle, styles.centerText, { marginTop: 12 }]}
            >
              🏆 New high score!
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={[styles.button, styles.buttonSpaced]}
          onPress={() => start(deck)}
        >
          <Text style={styles.buttonText}>Try again</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonGray]}
          onPress={() => setDeck(null)}
        >
          <Text style={styles.buttonText}>Back to decks</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // ---------- QUIZ ----------
  if (deck) {
    const card = cards[index];
    const progress = Math.round((index / cards.length) * 100);

    return (
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.subtitle}>
          Card {index + 1} of {cards.length}
        </Text>

        <View
          style={[styles.barBackground, { marginTop: 0, marginBottom: 20 }]}
        >
          <View style={[styles.barFill, { width: `${progress}%` }]} />
        </View>

        {/* Tap the card to reveal the answer */}
        <TouchableOpacity
          style={[styles.flashCard, showAnswer && styles.flashCardBack]}
          activeOpacity={0.9}
          onPress={() => setShowAnswer(true)}
        >
          <Text style={styles.flashSide}>
            {showAnswer ? "ANSWER" : "QUESTION"}
          </Text>
          <Text style={styles.flashText}>
            {showAnswer ? card.back : card.front}
          </Text>
          <Text style={styles.flashHint}>
            {showAnswer ? "How did you do?" : "Tap to see the answer"}
          </Text>
        </TouchableOpacity>

        {/* Grade buttons appear after the answer is shown */}
        {showAnswer && (
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.buttonFlex, styles.buttonBad]}
              onPress={() => answer(false)}
            >
              <Text style={styles.buttonText}>Missed it</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonFlex, styles.buttonGood]}
              onPress={() => answer(true)}
            >
              <Text style={styles.buttonText}>Got it</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style={[styles.button, styles.buttonGray, { marginTop: 20 }]}
          onPress={() => setDeck(null)}
        >
          <Text style={styles.buttonText}>Quit quiz</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // ---------- PICK A DECK ----------
  const playable = decks.filter((d) => d.cards.length > 0);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>Quiz</Text>
      <Text style={styles.subtitle}>Pick a deck to test yourself</Text>

      {playable.length === 0 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>No decks to quiz yet</Text>
          <Text style={styles.cardBody}>
            Create a deck and add at least one card in the Create tab.
          </Text>
        </View>
      )}

      {playable.map((d) => {
        const best = getBest(d.id);
        return (
          <TouchableOpacity
            key={d.id}
            style={styles.deckRow}
            onPress={() => start(d)}
          >
            <Text style={styles.deckRowTitle}>{d.title}</Text>
            <Text style={styles.deckRowCount}>
              {d.cards.length} cards{best !== null ? ` · Best ${best}%` : ""}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
