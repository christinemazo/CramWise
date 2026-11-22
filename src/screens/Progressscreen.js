// PROGRESS SCREEN: average score + clickable quiz cards that show the attempt

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

export default function ProgressScreen({ isDark }) {
  const baseStyles = getStyles(isDark);
  const { scores, average } = useDecks();

  // Stores the quiz attempt that was tapped
  const [selectedAttempt, setSelectedAttempt] = useState(null);

  const cardBg = isDark ? "#132238" : "#FFFFFF";
  const cardBorder = isDark ? "#233652" : "#E2E8F0";
  const titleColor = isDark ? "#F8FAFC" : "#0F172A";
  const metaColor = isDark ? "#94A3B8" : "#64748B";
  const trackBg = isDark ? "#24344D" : "#E2E8F0";

  // When a quiz card is tapped, show that attempt's details and answers
  if (selectedAttempt) {
    return (
      <ScrollView
        contentContainerStyle={baseStyles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.rowTop, { marginBottom: 12 }]}>
          <TouchableOpacity
            onPress={() => setSelectedAttempt(null)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.backText}>← Back to Progress</Text>
          </TouchableOpacity>
          <Text style={styles.scoreText}>{selectedAttempt.score}%</Text>
        </View>

        <Text style={baseStyles.title}>{selectedAttempt.title}</Text>
        <Text style={baseStyles.subtitle}>
          Attempt on {selectedAttempt.date} · Score: {selectedAttempt.score}%
        </Text>

        {selectedAttempt.items && selectedAttempt.items.length > 0 ? (
          selectedAttempt.items.map((item, idx) => (
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
              Quiz attempt recorded
            </Text>
            <Text style={[styles.cardMeta, { color: metaColor }]}>
              No card-by-card breakdown was saved for this earlier attempt. Take a
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
      <Text style={baseStyles.subtitle}>Your average is {average}%</Text>

      {scores.length === 0 && (
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
      )}

      {scores.map((attempt) => (
        <TouchableOpacity
          key={attempt.id}
          style={[
            styles.card,
            { backgroundColor: cardBg, borderColor: cardBorder },
          ]}
          activeOpacity={0.85}
          onPress={() => setSelectedAttempt(attempt)}
        >
          <View style={styles.rowTop}>
            <View style={{ flex: 1, paddingRight: 12 }}>
              <Text style={[styles.cardTitle, { color: titleColor }]}>
                {attempt.title}
              </Text>
              <Text style={[styles.cardMeta, { color: metaColor }]}>
                {attempt.date} · Tap to view quiz
              </Text>
            </View>
            <Text style={styles.scoreText}>{attempt.score}%</Text>
          </View>

          <View style={[styles.track, { backgroundColor: trackBg }]}>
            <View style={[styles.fill, { width: `${attempt.score}%` }]} />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
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
    marginTop: 3,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1D9BF0",
  },
  track: {
    height: 7,
    borderRadius: 999,
    overflow: "hidden",
    marginTop: 14,
  },
  fill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#1D9BF0",
  },
});