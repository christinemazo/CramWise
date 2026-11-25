// PROGRESS SCREEN: spaced formatted quiz date below title + year-aware dates + Average score hero card + Latest Scores compact cards + detail view

import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getStyles } from "../../styles";
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
    dateObj.getDate()
  );

  const dayDiff = Math.round(
    (todayStart.getTime() - targetStart.getTime()) / (1000 * 60 * 60 * 24)
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
  const baseStyles = getStyles(isDark);
  const { scores, average, deleteScore } = useDecks();

  // Stores the quiz card that was tapped
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const cardBg = isDark ? "#132238" : "#FFFFFF";
  const cardBorder = isDark ? "#233652" : "#E2E8F0";
  const titleColor = isDark ? "#F8FAFC" : "#0F172A";
  const metaColor = isDark ? "#94A3B8" : "#64748B";
  const trackBg = isDark ? "#24344D" : "#E2E8F0";

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
        contentContainerStyle={baseStyles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.rowTop, { marginBottom: 12 }]}>
          <TouchableOpacity
            onPress={() => setSelectedQuiz(null)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.backText}>← Back to Progress</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDeleteQuiz}
            activeOpacity={0.7}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            accessibilityLabel="Delete quiz"
          >
            <Ionicons name="trash-outline" size={22} color="#EF4444" />
          </TouchableOpacity>
        </View>

        <Text style={baseStyles.title}>{selectedQuiz.title}</Text>
        <Text style={baseStyles.subtitle}>
          Completed {formattedSelectedDate} · Score: {selectedQuiz.score}%
        </Text>

        {selectedQuiz.items && selectedQuiz.items.length > 0 ? (
          selectedQuiz.items.map((item, idx) => (
            <View
              key={`${item.id || idx}-${idx}`}
              style={[
                styles.card,
                { backgroundColor: cardBg, borderColor: cardBorder },
              ]}
            >
              <Text style={[styles.cardTitle, { color: titleColor }]}>
                {idx + 1}. {item.front}
              </Text>
              <Text style={[styles.cardMeta, { color: metaColor }]}>
                Answer: {item.back}
              </Text>
              <Text
                style={[
                  styles.cardMeta,
                  {
                    marginTop: 8,
                    fontSize: 13,
                    fontWeight: "700",
                    color: item.gotIt ? "#22C55E" : "#EF4444",
                  },
                ]}
              >
                {item.gotIt ? "Got it" : "Missed it"}
              </Text>
            </View>
          ))
        ) : (
          <View
            style={[
              styles.card,
              { backgroundColor: cardBg, borderColor: cardBorder },
            ]}
          >
            <Text style={[styles.cardTitle, { color: titleColor }]}>
              Quiz recorded
            </Text>
            <Text style={[styles.cardMeta, { color: metaColor }]}>
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
      contentContainerStyle={baseStyles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={baseStyles.title}>Progress</Text>
      <Text style={baseStyles.subtitle}>Track your quiz score</Text>

      <View
        style={[
          styles.heroCard,
          { backgroundColor: cardBg, borderColor: cardBorder },
        ]}
      >
        <View style={styles.progressTop}>
          <Text style={[styles.heroTitle, { color: titleColor }]}>
            Average score
          </Text>
          <Text style={styles.progressPercent}>{clampedAverage}%</Text>
        </View>
        <View style={[styles.barBackground, { backgroundColor: trackBg }]}>
          <View
            style={[styles.barFill, { width: `${clampedAverage}%` }]}
          />
        </View>
      </View>

      {scores.length === 0 ? (
        <View
          style={[
            styles.card,
            { backgroundColor: cardBg, borderColor: cardBorder },
          ]}
        >
          <Text style={[styles.cardTitle, { color: titleColor }]}>
            No quizzes taken yet
          </Text>
          <Text style={[styles.cardMeta, { color: metaColor }]}>
            Finish a quiz in the Quiz tab to see your results here.
          </Text>
        </View>
      ) : (
        <View style={styles.recentSection}>
          <View style={styles.recentHeaderRow}>
            <Text style={[styles.sectionHeading, { color: titleColor }]}>
              Latest Scores
            </Text>
          </View>

          {scores.map((quiz, index) => (
            <TouchableOpacity
              key={quiz.id || `quiz-${index}`}
              style={[
                styles.scoreCard,
                { backgroundColor: cardBg, borderColor: cardBorder },
              ]}
              activeOpacity={0.85}
              onPress={() => setSelectedQuiz(quiz)}
            >
              <View style={styles.rowTop}>
                <View style={{ flex: 1, paddingRight: 12 }}>
                  <Text style={[styles.cardTitle, { color: titleColor }]}>
                    {quiz.title}
                  </Text>
                  <Text style={[styles.cardMeta, { color: metaColor }]}>
                    {formatQuizDate(quiz.date)}
                  </Text>
                </View>
                <Text style={styles.scoreText}>{quiz.score}%</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    borderRadius: 18,
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginBottom: 18,
    borderWidth: 1.5,
  },
  progressTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: "800",
  },
  progressPercent: {
    fontSize: 24,
    fontWeight: "900",
    color: "#1D9BF0",
  },
  barBackground: {
    height: 11,
    borderRadius: 999,
    overflow: "hidden",
    marginTop: 16,
  },
  barFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#1D9BF0",
  },
  recentSection: {
    marginTop: 4,
  },
  recentHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "800",
  },
  card: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
  },
  scoreCard: {
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
  },
  rowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1D9BF0",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  cardMeta: {
    fontSize: 12,
    marginTop: 6,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1D9BF0",
  },
});