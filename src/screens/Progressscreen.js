// PROGRESS SCREEN: average score, latest quiz scores, and a detail view for each quiz

import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { getColors, getStyles } from "../../styles";
import { useDecks } from "../contexts/Deckcontext";

function parseQuizDate(rawDate) {
  if (!rawDate) return null;
  if (rawDate instanceof Date) {
    return Number.isNaN(rawDate.getTime()) ? null : rawDate;
  }

  const str = String(rawDate).trim();
  if (!str) return null;

  // Handle YYYY-MM-DD in local time so midnight doesn't shift by timezone
  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(str);
  if (isoMatch) {
    const year = Number(isoMatch[1]);
    const month = Number(isoMatch[2]) - 1;
    const day = Number(isoMatch[3]);
    const parsed = new Date(year, month, day);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  const parsed = new Date(str);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatQuizDate(rawDate) {
  const dateObj = parseQuizDate(rawDate);
  if (!dateObj) return rawDate ? String(rawDate) : "";

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetStart = new Date(
    dateObj.getFullYear(),
    dateObj.getMonth(),
    dateObj.getDate(),
  );

  const dayDiff = Math.round(
    (todayStart.getTime() - targetStart.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (dayDiff === 0) return "Today";
  if (dayDiff === 1) return "Yesterday";

  const includeYear = targetStart.getFullYear() !== todayStart.getFullYear();

  return targetStart.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    ...(includeYear ? { year: "numeric" } : {}),
  });
}

export default function ProgressScreen({ isDark }) {
  const styles = getStyles(isDark);
  const colors = getColors(isDark);
  const { scores, average, deleteScore } = useDecks();

  // Stores the quiz card that was tapped
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const clampedAverage = Math.max(0, Math.min(100, Number(average) || 0));

  const handleDeleteQuiz = () => {
    if (!selectedQuiz) return;
    if (typeof deleteScore === "function") {
      deleteScore(selectedQuiz.id);
    }
    setSelectedQuiz(null);
  };

  // When a quiz card is tapped, show that quiz's details and answers
  if (selectedQuiz) {
    const formattedSelectedDate = formatQuizDate(selectedQuiz.date);

    return (
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.detailHeader}>
          <TouchableOpacity
            onPress={() => setSelectedQuiz(null)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={18} color={colors.accent} />
            <Text style={styles.backText}>Back to Progress</Text>
          </TouchableOpacity>

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

        <Text style={styles.title}>{selectedQuiz.title}</Text>
        <Text style={styles.detailSubtitle}>
          Completed {formattedSelectedDate} · Score: {selectedQuiz.score}%
        </Text>

        {selectedQuiz.items && selectedQuiz.items.length > 0 ? (
          selectedQuiz.items.map((item, idx) => (
            <View key={`${item.id || idx}-${idx}`} style={styles.panelCard}>
              <Text style={styles.panelTitle}>
                {idx + 1}. {item.front}
              </Text>
              <Text style={styles.panelMeta}>Answer: {item.back}</Text>
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

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Progress</Text>
      <Text style={styles.subtitle}>Track your quiz score</Text>

      <View style={styles.heroCard}>
        <View style={styles.progressTop}>
          <Text style={styles.heroTitle}>Average score</Text>
          <Text style={styles.heroPercent}>{clampedAverage}%</Text>
        </View>
        <View style={styles.heroBar}>
          <View style={[styles.heroBarFill, { width: `${clampedAverage}%` }]} />
        </View>
      </View>

      {scores.length === 0 ? (
        <View style={styles.panelCard}>
          <Text style={styles.panelTitle}>No quizzes taken yet</Text>
          <Text style={styles.panelMeta}>
            Finish a quiz in the Quiz tab to see your results here.
          </Text>
        </View>
      ) : (
        <View style={styles.recentSection}>
          <View style={styles.recentHeaderRow}>
            <Text style={styles.sectionHeading}>Latest Scores</Text>
          </View>

          {scores.map((quiz, index) => (
            <TouchableOpacity
              key={quiz.id || `quiz-${index}`}
              style={styles.scoreCard}
              activeOpacity={0.85}
              onPress={() => setSelectedQuiz(quiz)}
            >
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
