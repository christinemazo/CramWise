import { ScrollView, Text, View } from "react-native";
import { useDecks } from "../context/DeckContext";
import { getStyles } from "../styles";

export default function ProgressScreen({ isDark }) {
  const styles = getStyles(isDark);
  const { scores, average } = useDecks();

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>Progress</Text>
      <Text style={styles.subtitle}>Your average is {average}%</Text>

      {/* One card per saved score (empty until quizzes exist) */}
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
