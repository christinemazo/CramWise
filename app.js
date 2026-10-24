import { Ionicons } from "@expo/vector-icons"; // icons
import { useState } from "react"; // lets screens remember values
import {
  Modal, // pop-up window
  ScrollView, // scrollable screen
  Switch, // on/off switch
  Text, // all text
  TouchableOpacity, // pressable buttons
  View, // box / container
} from "react-native";
import { getColors, getStyles } from "./styles"; // colors and styles from styles.js

// DATA: sample values shown in the app

// Placeholder scores. Replace with real data once quiz results are stored.
const SCORES = [
  { id: "1", title: "Mobile Programming", date: "Yesterday", score: 85 },
  { id: "2", title: "Programming Language", date: "Two days ago", score: 75 },
  { id: "3", title: "Software Engineering", date: "Sept 30", score: 80 },
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

// ============================================================
// HELPER FUNCTION
// ============================================================

// Gets the average of a list of scores (returns 0 if the list is empty).
function getAverage(scores) {
  if (scores.length === 0) return 0;
  const total = scores.reduce((sum, item) => sum + item.score, 0);
  return Math.round(total / scores.length);
}

// HOME SCREEN

function Home({ goTo, onOpenSettings, isDark }) {
  const styles = getStyles(isDark);
  const colors = getColors(isDark);
  const average = getAverage(SCORES);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      {/* Settings icon: opens the settings pop-up */}
      <View style={styles.settingsRow}>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={onOpenSettings}
        >
          <Ionicons name="settings-outline" size={22} color={colors.text} />
        </TouchableOpacity>
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
function FlashCard({ question, answer, isDark }) {
  const styles = getStyles(isDark);

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
      <Text style={styles.flashHint}>
        {flashed ? "Tap to see the question" : "Tap to see the answer"}
      </Text>
    </TouchableOpacity>
  );
}

// CREATE SCREEN (the form is static: nothing to type or save)

function Create({ isDark }) {
  const styles = getStyles(isDark);

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

        {/* Add button (does nothing yet, just a design) */}
        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Add Card</Text>
        </TouchableOpacity>
      </View>

      {/* One FlashCard for each item in FLASHCARDS (tap a card to flip it) */}
      {FLASHCARDS.map((card) => (
        <FlashCard
          key={card.id}
          question={card.question}
          answer={card.answer}
          isDark={isDark}
        />
      ))}
    </ScrollView>
  );
}

// PROGRESS SCREEN

function ProgressScreen({ isDark }) {
  const styles = getStyles(isDark);
  const average = getAverage(SCORES);

  // Take only the first SCORE_LIMIT scores
  const recent = SCORES.slice(0, SCORE_LIMIT);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      {/* Header */}
      <Text style={styles.title}>Progress</Text>
      <Text style={styles.subtitle}>Your average is {average}%</Text>

      {/* One card per score (limited by SCORE_LIMIT) */}
      {recent.map((item) => (
        <View key={item.id} style={styles.card}>
          {/* Subject name and score */}
          <View style={styles.progressTop}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.progressPercent}>{item.score}%</Text>
          </View>

          {/* Date */}
          <Text style={styles.cardBody}>{item.date}</Text>

          {/* Progress bar (width follows the score) */}
          <View style={styles.barBackground}>
            <View style={[styles.barFill, { width: `${item.score}%` }]} />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

// TAB BAR (bottom navigation)

function TabBar({ active, onChange, isDark }) {
  const styles = getStyles(isDark);
  const colors = getColors(isDark);

  return (
    <View style={styles.tabBar}>
      {/* One button for each item in TABS */}
      {TABS.map((tab) => {
        // Blue when selected, gray when not
        const color = active === tab.key ? colors.accent : colors.tabInactive;

        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            activeOpacity={0.7}
            onPress={() => onChange(tab.key)}
          >
            <Ionicons name={tab.icon} size={26} color={color} />
            <Text style={[styles.tabLabel, { color }]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// APP (main component: active screen + tab bar + settings)

export default function App() {
  // Which tab is open right now ("home", "create" or "progress")
  const [activeTab, setActiveTab] = useState("home");

  // true = dark mode, false = light mode
  const [isDark, setIsDark] = useState(true);

  // Is the settings pop-up open?
  const [showSettings, setShowSettings] = useState(false);

  const styles = getStyles(isDark);
  const colors = getColors(isDark);

  // Picks the screen that matches the open tab
  const renderScreen = () => {
    if (activeTab === "create") return <Create isDark={isDark} />;
    if (activeTab === "progress") return <ProgressScreen isDark={isDark} />;
    return (
      <Home
        goTo={setActiveTab}
        onOpenSettings={() => setShowSettings(true)}
        isDark={isDark}
      />
    );
  };

  return (
    <View style={styles.app}>
      {/* Active screen */}
      <View style={styles.screen}>{renderScreen()}</View>

      {/* Bottom tab bar */}
      <TabBar active={activeTab} onChange={setActiveTab} isDark={isDark} />

      {/* Settings pop-up */}
      <Modal visible={showSettings} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            {/* Title and close icon */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Settings</Text>
              <TouchableOpacity onPress={() => setShowSettings(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            {/* Dark mode switch */}
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Dark Mode</Text>
              <Switch value={isDark} onValueChange={setIsDark} />
            </View>

            {/* About box */}
            <View style={styles.aboutBox}>
              <Text style={styles.aboutTitle}>About CramWise</Text>
              <Text style={styles.aboutBody}>
                CramWise is your smart study companion. Review flashcards, take
                quizzes, and track your progress. Study less stress, cram
                wisely.
              </Text>
            </View>

            {/* Close button */}
            <TouchableOpacity
              style={[styles.button, styles.closeButton]}
              onPress={() => setShowSettings(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
