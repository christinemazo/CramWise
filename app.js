import { Ionicons } from "@expo/vector-icons"; // icons for the tab bar
import { useState } from "react"; // lets screens remember values
import {
  ScrollView, // scrollable screen
  Text, // all text
  TextInput, // typing fields
  TouchableOpacity, // pressable buttons
  View, // box / container
} from "react-native";
import { colors, styles } from "./styles"; // colors and styles from styles.js

// DATA

// Placeholder scores. Replace with real data once quiz results are stored.
const SCORES = [
  { id: "1", title: "Mobile Programming", date: "Yesterday", score: 100 },
  { id: "2", title: "Programming Langauge", date: "Sept 17", score: 99 },
  { id: "3", title: "Software Engineering", date: "Sept 12", score: 99 },
];

// Only this many scores are shown on the Progress screen.
const SCORE_LIMIT = 3;

// The three buttons in the bottom tab bar.
const TABS = [
  { key: "home", label: "Home", icon: "home" },
  { key: "create", label: "Create", icon: "add-circle" },
  { key: "progress", label: "Progress", icon: "stats-chart" },
];

// HELPER FUNCTION

// Gets the average of a list of scores (returns 0 if the list is empty).
function getAverage(scores) {
  if (scores.length === 0) return 0;
  const total = scores.reduce((sum, item) => sum + item.score, 0);
  return Math.round(total / scores.length);
}

// HOME SCREEN

function Home({ goTo }) {
  const average = getAverage(SCORES);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      {/* Header: title and tagline */}
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Study less stress, cram wisely</Text>

      {/* Intro card */}
      <View style={styles.card}>
        <Text style={styles.cardIcon}>📚</Text>
        <Text style={styles.cardTitle}>Study smarter with CramWise</Text>
        <Text style={styles.cardBody}>
          Review your flashcards, take quizzes, and track your progress.
        </Text>
      </View>

      {/* Progress overview: tapping it opens the Progress tab */}
      <Text style={styles.sectionTitle}>Progress overview</Text>

      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => goTo("progress")}
      >
        {/* Label and percentage */}
        <View style={styles.progressTop}>
          <Text style={styles.cardTitle}>Average score</Text>
          <Text style={styles.progressPercent}>{average}%</Text>
        </View>

        {/* Progress bar (width follows the average) */}
        <View style={styles.barBackground}>
          <View style={[styles.barFill, { width: `${average}%` }]} />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

// CREATE SCREEN

function Create() {
  // What the user is typing right now
  const [deckTitle, setDeckTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // The flashcards already added to the deck
  const [cards, setCards] = useState([]);

  // Runs when "+ Add Flashcard" is pressed
  function addCard() {
    // Do nothing if the question or answer is empty
    if (!question.trim() || !answer.trim()) return;

    const newCard = {
      id: Date.now().toString(), // unique id
      question: question.trim(),
      answer: answer.trim(),
    };

    // Add the new card to the end of the list
    setCards((current) => [...current, newCard]);

    // Clear the fields so the next card can be typed
    setQuestion("");
    setAnswer("");
  }

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      {/* Header */}
      <Text style={styles.title}>Create New Deck</Text>
      <Text style={styles.subtitle}>Add cards to your deck</Text>

      {/* Deck title field */}
      <Text style={styles.label}>Deck Title</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Biology 101"
        placeholderTextColor={colors.subtle}
        value={deckTitle}
        onChangeText={setDeckTitle}
      />

      {/* Add flashcard form */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Add Flashcard</Text>

        {/* Front of the card */}
        <Text style={styles.label}>Front (Question / Term)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter question..."
          placeholderTextColor={colors.subtle}
          multiline
          value={question}
          onChangeText={setQuestion}
        />

        {/* Back of the card */}
        <Text style={styles.label}>Back (Answer / Definition)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter answer..."
          placeholderTextColor={colors.subtle}
          multiline
          value={answer}
          onChangeText={setAnswer}
        />

        {/* Add button */}
        <TouchableOpacity
          style={styles.button}
          onPress={addCard}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>+ Add Flashcard</Text>
        </TouchableOpacity>
      </View>

      {/* List of cards added so far */}
      <Text style={styles.sectionTitle}>
        Flashcards in Deck ({cards.length})
      </Text>

      {cards.map((card, index) => (
        <View key={card.id} style={styles.cardPreview}>
          <Text style={styles.cardText}>
            <Text style={styles.bold}>#{index + 1} Q:</Text> {card.question}
          </Text>
          <Text style={styles.cardText}>
            <Text style={styles.bold}>A:</Text> {card.answer}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

// PROGRESS SCREEN

function Progress() {
  const average = getAverage(SCORES);

  // Take only the first SCORE_LIMIT scores
  const recent = SCORES.slice(0, SCORE_LIMIT);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      {/* Header */}
      <Text style={styles.title}>Progress</Text>
      <Text style={styles.subtitle}>Track your quiz scores</Text>

      {/* Average score card with progress bar */}
      <View style={styles.card}>
        <View style={styles.progressTop}>
          <Text style={styles.cardTitle}>Average score</Text>
          <Text style={styles.progressPercent}>{average}%</Text>
        </View>

        <View style={styles.barBackground}>
          <View style={[styles.barFill, { width: `${average}%` }]} />
        </View>
      </View>

      {/* Latest scores list (limited by SCORE_LIMIT) */}
      <Text style={styles.sectionTitle}>Latest scores</Text>

      {recent.map((item) => (
        <View key={item.id} style={styles.row}>
          <View>
            <Text style={styles.rowTitle}>{item.title}</Text>
            <Text style={styles.rowDate}>{item.date}</Text>
          </View>
          <Text style={styles.rowScore}>{item.score}%</Text>
        </View>
      ))}
    </ScrollView>
  );
}

// APP (main component: shows the active screen + tab bar)

export default function App() {
  // Which tab is open right now ("home", "create" or "progress")
  const [tab, setTab] = useState("home");

  return (
    <View style={styles.app}>
      {/* Active screen */}
      <View style={styles.screen}>
        {tab === "home" && <Home goTo={setTab} />}
        {tab === "create" && <Create />}
        {tab === "progress" && <Progress />}
      </View>

      {/* Bottom tab bar */}
      <View style={styles.tabBar}>
        {TABS.map((item) => {
          const active = tab === item.key;
          // Blue when selected, gray when not
          const color = active ? colors.accent : "#9CA3AF";

          return (
            <TouchableOpacity
              key={item.key}
              style={styles.tab}
              onPress={() => setTab(item.key)}
            >
              <Ionicons name={item.icon} size={22} color={color} />
              <Text style={[styles.tabLabel, { color }]}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
