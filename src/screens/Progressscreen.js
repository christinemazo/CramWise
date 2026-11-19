// PROGRESS SCREEN: shows the scores saved from quizzes

import { ScrollView, Text, View } from "react-native";
import { getStyles } from "../../styles";
import { useDecks } from "../contexts/Deckcontext";

export default function ProgressScreen({ isDark }) {
  const styles = getStyles(isDark);
  const { scores, average } = useDecks();

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>Progress</Text>
      <Text style={styles.subtitle}>Your average is {average}%</Text>

      {/* Message shown until the first quiz is taken */}
      {scores.length === 0 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>No quiz results yet</Text>
          <Text style={styles.cardBody}>
            Your scores will show up here once you take a quiz.
          </Text>
        </View>
      )}

      {/* One card per saved score (newest first) */}
      {scores.map((item) => (
        <View key={item.id} style={styles.card}>
          <View style={styles.progressTop}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.progressPercent}>{item.score}%</Text>
          </View>

          <Text style={styles.cardBody}>{item.date}</Text>

          <View style={styles.barBackground}>
            <View style={[styles.barFill, { width: `${item.score}%` }]} />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
