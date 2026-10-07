import { Ionicons } from "@expo/vector-icons"; // icons for the tab bar
import { useState } from "react"; // lets screens remember values
import {
  ScrollView, // scrollable screen
  Text, // all text
  TouchableOpacity, // pressable buttons
  View, // box / container
} from "react-native";
import { colors, styles } from "./styles"; // colors and styles from styles.js

// DATA: sample values shown in the app

// Placeholder scores. Replace with real data once quiz results are stored.
const SCORES = [
  { id: "1", title: "Mobile Programming", date: "Yesterday", score: 100 },
  { id: "2", title: "Programming Language", date: "Two days ago", score: 99 },
  { id: "3", title: "Software Engineering", date: "Sept 30", score: 99 },
];

// Only this many scores are shown on the Progress screen.
const SCORE_LIMIT = 3;

// The three buttons in the bottom tab bar.
const TABS = [
  { key: "home", label: "Home", icon: "home" },
  { key: "create", label: "Create", icon: "add-circle" },
  { key: "progress", label: "Progress", icon: "stats-chart" },
];

// Sample flashcards shown at the bottom of the Create screen.
const FLASHCARDS = [
  {
    id: "1",
    question: "What is React Native used for?",
    answer: "Building mobile apps with JavaScript",
  },
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
      <View style={{ width: '100%', alignItems: 'flex-end' }}>
        <Ionicons name="settings-outline" size={22} color={colors.text} />
      </View>
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

// FLASH CARD

// One flashcard. Tap it to flip between the question and the answer.
function FlashCard({ question, answer }) {
  // false = showing the question, true = showing the answer
  const [flashed, setFlashed] = useState(false);

  return (
    <TouchableOpacity
      style={[styles.flashCard, flashed && styles.flashCardBack]}
      activeOpacity={0.9}
      onPress={() => setFlashed(!flashed)}
    >
      {/* Small label: which side is showing */}
      <Text style={styles.flashSide}>{flashed ? "ANSWER" : "QUESTION"}</Text>
      {/* The question or the answer */}
      <Text style={styles.flashText}>{flashed ? answer : question}</Text>
      {/* Hint for the user */}
      <Text style={styles.flashHint}>Tap to see the answer</Text>
    </TouchableOpacity>
  );
}

// CREATE SCREEN (the form is static: nothing to type or save)

function Create() {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      {/* Header */}
      <Text style={styles.title}>Create New Deck</Text>
      <Text style={styles.subtitle}>Add cards to your deck</Text>

      {/* Deck title field (display only) */}
      <Text style={styles.label}>Deck Title</Text>
      <View style={styles.input}>
        <Text style={styles.fieldText}>e.g., Mobile Programming</Text>
      </View>

      {/* Add flashcard form (display only) */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Add Flashcard</Text>

        {/* Front of the card */}
        <Text style={styles.label}>Front (Question / Term)</Text>
        <View style={[styles.input, styles.textArea]}>
          <Text style={styles.fieldText}>Enter question...</Text>
        </View>

        {/* Back of the card */}
        <Text style={styles.label}>Back (Answer / Definition)</Text>
        <View style={[styles.input, styles.textArea]}>
          <Text style={styles.fieldText}>Enter answer...</Text>
        </View>

        {/* Add button (does nothing, just a design) */}
        <View style={styles.button}>
          <Text style={styles.buttonText}>+ Add Flashcard</Text>
        </View>
      </View>

      {/* Sample flash cards (tap a card to flip it) */}
      <Text style={styles.sectionTitle}>Flash Cards</Text>

      {/* One FlashCard for each item in FLASHCARDS */}
      {FLASHCARDS.map((card) => (
        <FlashCard
          key={card.id}
          question={card.question}
          answer={card.answer}
        />
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
        {/* Label and percentage */}
        <View style={styles.progressTop}>
          <Text style={styles.cardTitle}>Average score</Text>
          <Text style={styles.progressPercent}>{average}%</Text>
        </View>

        {/* Progress bar (width follows the average) */}
        <View style={styles.barBackground}>
          <View style={[styles.barFill, { width: `${average}%` }]} />
        </View>
      </View>

      {/* Latest scores list (limited by SCORE_LIMIT) */}
      <Text style={styles.sectionTitle}>Latest scores</Text>

      {recent.map((item) => (
        <View key={item.id} style={styles.row}>
          {/* Subject name and date */}
          <View>
            <Text style={styles.rowTitle}>{item.title}</Text>
            <Text style={styles.rowDate}>{item.date}</Text>
          </View>
          {/* Score on the right */}
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
        {/* Only the screen that matches the open tab is shown */}
        {tab === "home" && <Home goTo={setTab} />}
        {tab === "create" && <Create />}
        {tab === "progress" && <Progress />}
      </View>

      {/* Bottom tab bar */}
      <View style={styles.tabBar}>
        {/* One button for each item in TABS */}
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
              {/* Icon and label (tapping opens that tab) */}
              <Ionicons name={item.icon} size={30} color={color} />
              <Text style={[styles.tabLabel, { color }]}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
