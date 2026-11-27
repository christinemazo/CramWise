// QUIZ SCREEN: pick a deck, flip cards, grade yourself, save score
// The screen has three modes: result, quiz in progress, and pick a deck

// useState lets the screen remember the quiz progress
import { useState } from "react";
// Building blocks: scrollable screen, text, pressable button, box
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
// Function that gives the styles for dark or light mode
import { getStyles } from "../../styles";
// Gives access to the shared data and actions
import { useDecks } from "../contexts/Deckcontext";

export default function QuizScreen({ isDark }) {
  // Styles that match the current mode
  const styles = getStyles(isDark);
  // The decks, saved scores, and the action that saves a new score
  const { decks, scores, addScore } = useDecks();

  // The deck being quizzed (null while the user is picking a deck)
  const [deck, setDeck] = useState(null);
  // The cards of this round, in random order
  const [cards, setCards] = useState([]);
  // Which card is on screen (0 is the first card)
  const [index, setIndex] = useState(0);
  // Is the answer side showing?
  const [showAnswer, setShowAnswer] = useState(false);
  // How many cards were marked "Got it"
  const [correct, setCorrect] = useState(0);
  // The answers given so far (saved with the score)
  const [history, setHistory] = useState([]);
  // The final result (null until the quiz ends)
  const [result, setResult] = useState(null);

  // Highest saved score for a deck (null if it was never taken)
  const getBest = (deckId) => {
    // Only the scores for this deck
    const list = scores.filter((s) => s.deckId === deckId);
    return list.length === 0 ? null : Math.max(...list.map((s) => s.score));
  };

  // Starts (or restarts) a quiz with the chosen deck
  const start = (chosen) => {
    setDeck(chosen);
    // Copy the cards and shuffle them
    setCards([...chosen.cards].sort(() => Math.random() - 0.5));
    // Reset everything for a fresh round
    setIndex(0);
    setCorrect(0);
    setHistory([]);
    setShowAnswer(false);
    setResult(null);
  };

  // Called when the user taps "Got it" (true) or "Missed it" (false)
  const answer = (gotIt) => {
    // The card that was just answered
    const currentCard = cards[index];
    // New correct count (calculated here because state updates are not instant)
    const total = correct + (gotIt ? 1 : 0);
    // Add this answer to the history
    const updatedHistory = [
      ...history,
      {
        id: currentCard.id,
        front: currentCard.front,
        back: currentCard.back,
        gotIt,
      },
    ];

    setCorrect(total);
    setHistory(updatedHistory);

    // More cards left: go to the next card and hide the answer
    if (index + 1 < cards.length) {
      setIndex(index + 1);
      setShowAnswer(false);
      return;
    }

    // Last card: work out the percent and check for a new high score
    const percent = Math.round((total / cards.length) * 100);
    const best = getBest(deck.id);
    // The first quiz of a deck, or a better score, is a high score
    setResult({ percent, isBest: best === null || percent > best });
    // Save the score together with the answers
    addScore(deck.id, deck.title, percent, updatedHistory);
  };

  // MODE 1: result screen (a deck is chosen and the quiz is finished)
  if (deck && result) {
    return (
      <ScrollView contentContainerStyle={styles.content}>
        {/* Title and deck name */}
        <Text style={styles.title}>Quiz complete</Text>
        <Text style={styles.subtitle}>{deck.title}</Text>

        {/* Result card */}
        <View style={styles.card}>
          {/* Big percent */}
          <Text style={styles.resultScore}>{result.percent}%</Text>
          {/* How many were correct */}
          <Text style={[styles.cardBody, styles.centerText]}>
            {correct} of {cards.length} correct
          </Text>
          {/* Trophy message only for a new high score */}
          {result.isBest && (
            <Text
              style={[styles.cardTitle, styles.centerText, { marginTop: 12 }]}
            >
              🏆 New high score!
            </Text>
          )}
        </View>

        {/* Try the same deck again */}
        <TouchableOpacity
          style={[styles.button, styles.buttonSpaced]}
          onPress={() => start(deck)}
        >
          <Text style={styles.buttonText}>Try again</Text>
        </TouchableOpacity>
        {/* Go back to the deck list */}
        <TouchableOpacity
          style={[styles.button, styles.buttonGray]}
          onPress={() => setDeck(null)}
        >
          <Text style={styles.buttonText}>Back to decks</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // MODE 2: quiz screen (a deck is chosen and the quiz is running)
  if (deck) {
    // The card on screen
    const card = cards[index];
    // Percent of cards already finished (for the bar)
    const progress = Math.round((index / cards.length) * 100);

    return (
      <ScrollView contentContainerStyle={styles.content}>
        {/* Deck name and card counter */}
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.subtitle}>
          Card {index + 1} of {cards.length}
        </Text>

        {/* Progress bar */}
        <View
          style={[styles.barBackground, { marginTop: 0, marginBottom: 20 }]}
        >
          <View style={[styles.barFill, { width: `${progress}%` }]} />
        </View>

        {/* The card: tap it to reveal the answer */}
        <TouchableOpacity
          style={[styles.flashCard, showAnswer && styles.flashCardBack]}
          activeOpacity={0.9}
          onPress={() => setShowAnswer(true)}
        >
          {/* Which side is showing */}
          <Text style={styles.flashSide}>
            {showAnswer ? "ANSWER" : "QUESTION"}
          </Text>
          {/* The question or the answer */}
          <Text style={styles.flashText}>
            {showAnswer ? card.back : card.front}
          </Text>
          {/* Hint */}
          <Text style={styles.flashHint}>
            {showAnswer ? "How did you do?" : "Tap to see the answer"}
          </Text>
        </TouchableOpacity>

        {/* Grade buttons appear only after the answer is shown */}
        {showAnswer && (
          <View style={styles.buttonRow}>
            {/* Red: the user did not know it */}
            <TouchableOpacity
              style={[styles.button, styles.buttonFlex, styles.buttonBad]}
              onPress={() => answer(false)}
            >
              <Text style={styles.buttonText}>Missed it</Text>
            </TouchableOpacity>
            {/* Green: the user knew it */}
            <TouchableOpacity
              style={[styles.button, styles.buttonFlex, styles.buttonGood]}
              onPress={() => answer(true)}
            >
              <Text style={styles.buttonText}>Got it</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Quit without saving a score */}
        <TouchableOpacity
          style={[styles.button, styles.buttonGray, { marginTop: 20 }]}
          onPress={() => setDeck(null)}
        >
          <Text style={styles.buttonText}>Quit quiz</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // MODE 3: pick a deck (nothing chosen yet)
  // Only decks with at least one card can be quizzed
  const playable = decks.filter((d) => d.cards.length > 0);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      {/* Title and instruction */}
      <Text style={styles.title}>Quiz</Text>
      <Text style={styles.subtitle}>Pick a deck to test yourself</Text>

      {/* Message shown when no deck can be quizzed */}
      {playable.length === 0 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>No decks to quiz yet</Text>
          <Text style={styles.cardBody}>
            Create a deck and add at least one card in the Create tab.
          </Text>
        </View>
      )}

      {/* One row for each deck that can be quizzed */}
      {playable.map((d) => {
        // Best saved score for this deck (null if none)
        const best = getBest(d.id);
        return (
          // Pressing the row starts the quiz
          <TouchableOpacity
            key={d.id}
            style={styles.deckRow}
            onPress={() => start(d)}
          >
            {/* Deck name, number of cards, and best score if there is one */}
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
