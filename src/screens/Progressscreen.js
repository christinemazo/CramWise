// PROGRESS SCREEN: average score, latest quiz scores, and a detail view for each quiz

// Icons from Expo (back arrow and trash)
import { Ionicons } from "@expo/vector-icons";
// useState lets the screen remember which quiz was tapped
import { useState } from "react";
// Building blocks: scrollable screen, text, pressable area, box
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
// Functions that give the colors and styles for dark or light mode
import { getColors, getStyles } from "../../styles";
// Gives access to the shared data and actions
import { useDecks } from "../contexts/Deckcontext";

// Turns a saved date (text or Date) into a real Date, or null if it cannot be read
function parseQuizDate(rawDate) {
  // Nothing saved
  if (!rawDate) return null;
  // Already a Date: use it if it is valid
  if (rawDate instanceof Date) {
    return Number.isNaN(rawDate.getTime()) ? null : rawDate;
  }

  // Turn the value into clean text
  const str = String(rawDate).trim();
  if (!str) return null;

  // Handle YYYY-MM-DD in local time so midnight doesn't shift by timezone
  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(str);
  if (isoMatch) {
    const year = Number(isoMatch[1]);
    // Months start at 0 in JavaScript, so subtract 1
    const month = Number(isoMatch[2]) - 1;
    const day = Number(isoMatch[3]);
    const parsed = new Date(year, month, day);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  // Any other format: let JavaScript try to read it
  const parsed = new Date(str);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

// Turns a saved date into "Today", "Yesterday", or a short date like "Oct 26"
function formatQuizDate(rawDate) {
  const dateObj = parseQuizDate(rawDate);
  // If the date cannot be read, show the original text
  if (!dateObj) return rawDate ? String(rawDate) : "";

  // Midnight of today and of the quiz day, so only the day is compared
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetStart = new Date(
    dateObj.getFullYear(),
    dateObj.getMonth(),
    dateObj.getDate(),
  );

  // How many days ago the quiz was taken
  const dayDiff = Math.round(
    (todayStart.getTime() - targetStart.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (dayDiff === 0) return "Today";
  if (dayDiff === 1) return "Yesterday";

  // Show the year only when it is not the current year
  const includeYear = targetStart.getFullYear() !== todayStart.getFullYear();

  return targetStart.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    ...(includeYear ? { year: "numeric" } : {}),
  });
}

export default function ProgressScreen({ isDark }) {
  // Styles and colors that match the current mode
  const styles = getStyles(isDark);
  const colors = getColors(isDark);
  // The saved scores, the average, and the action that deletes a score
  const { scores, average, deleteScore } = useDecks();

  // Stores the quiz card that was tapped
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  // Keeps the average between 0 and 100 so the bar never overflows
  const clampedAverage = Math.max(0, Math.min(100, Number(average) || 0));

  // Runs when the trash icon is pressed in the detail view
  const handleDeleteQuiz = () => {
    if (!selectedQuiz) return;
    // Delete the score (if the action exists)
    if (typeof deleteScore === "function") {
      deleteScore(selectedQuiz.id);
    }
    // Go back to the list
    setSelectedQuiz(null);
  };

  // When a quiz card is tapped, show that quiz's details and answers
  if (selectedQuiz) {
    // "Today", "Yesterday" or a short date
    const formattedSelectedDate = formatQuizDate(selectedQuiz.date);

    return (
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Back button on the left, delete icon on the right */}
        <View style={styles.detailHeader}>
          {/* Back to the list */}
          <TouchableOpacity
            onPress={() => setSelectedQuiz(null)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={18} color={colors.accent} />
            <Text style={styles.backText}>Back to Progress</Text>
          </TouchableOpacity>

          {/* Delete this quiz */}
          <TouchableOpacity
            onPress={handleDeleteQuiz}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityLabel="Delete quiz"
            style={styles.deleteButton}
          >
            <Ionicons name="trash-outline" size={22} color={colors.danger} />
          </TouchableOpacity>
        </View>

        {/* Quiz name, date and score */}
        <Text style={styles.title}>{selectedQuiz.title}</Text>
        <Text style={styles.detailSubtitle}>
          Completed {formattedSelectedDate} · Score: {selectedQuiz.score}%
        </Text>

        {/* Card-by-card answers, or a message for older quizzes without them */}
        {selectedQuiz.items && selectedQuiz.items.length > 0 ? (
          selectedQuiz.items.map((item, idx) => (
            // One card for each question
            <View key={`${item.id || idx}-${idx}`} style={styles.panelCard}>
              {/* Question number and text */}
              <Text style={styles.panelTitle}>
                {idx + 1}. {item.front}
              </Text>
              {/* The correct answer */}
              <Text style={styles.panelMeta}>Answer: {item.back}</Text>
              {/* Green "Got it" or red "Missed it" */}
              <Text
                style={[
                  styles.panelStatus,
                  item.gotIt ? styles.statusGood : styles.statusBad,
                ]}
              >
                {item.gotIt ? "Got it" : "Missed it"}
              </Text>
            </View>
          ))
        ) : (
          // Older quizzes were saved without the answers
          <View style={styles.panelCard}>
            <Text style={styles.panelTitle}>Quiz recorded</Text>
            <Text style={styles.panelMeta}>
              No card-by-card breakdown was saved for this earlier quiz. Take a
              new quiz to see each question and answer here.
            </Text>
          </View>
        )}
      </ScrollView>
    );
  }

  // Main view: the average and the list of quizzes
  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Title and subtitle */}
      <Text style={styles.title}>Progress</Text>
      <Text style={styles.subtitle}>Track your quiz score</Text>

      {/* Average score card */}
      <View style={styles.heroCard}>
        {/* Label on the left, percent on the right */}
        <View style={styles.progressTop}>
          <Text style={styles.heroTitle}>Average score</Text>
          <Text style={styles.heroPercent}>{clampedAverage}%</Text>
        </View>
        {/* Empty bar with a blue part as wide as the average */}
        <View style={styles.heroBar}>
          <View style={[styles.heroBarFill, { width: `${clampedAverage}%` }]} />
        </View>
      </View>

      {/* Empty message, or the list of quizzes */}
      {scores.length === 0 ? (
        // No quizzes saved yet
        <View style={styles.panelCard}>
          <Text style={styles.panelTitle}>No quizzes taken yet</Text>
          <Text style={styles.panelMeta}>
            Finish a quiz in the Quiz tab to see your results here.
          </Text>
        </View>
      ) : (
        <View style={styles.recentSection}>
          {/* "Latest Scores" heading */}
          <View style={styles.recentHeaderRow}>
            <Text style={styles.sectionHeading}>Latest Scores</Text>
          </View>

          {/* One tappable card for each saved quiz (newest first) */}
          {scores.map((quiz, index) => (
            <TouchableOpacity
              key={quiz.id || `quiz-${index}`}
              style={styles.scoreCard}
              activeOpacity={0.85}
              // Remember this quiz so the detail view opens
              onPress={() => setSelectedQuiz(quiz)}
            >
              {/* Name and date on the left, percent on the right */}
              <View style={styles.scoreRow}>
                <View style={{ flex: 1, paddingRight: 12 }}>
                  <Text style={styles.panelTitle}>{quiz.title}</Text>
                  <Text style={styles.panelMeta}>
                    {formatQuizDate(quiz.date)}
                  </Text>
                </View>
                <Text style={styles.scoreValue}>{quiz.score}%</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
