import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { getColors, getStyles } from "../../styles";
import { useDecks } from "../contexts/Deckcontext";

export default function HomeScreen({ goTo, onOpenSettings, isDark }) {
  const styles = getStyles(isDark);
  const colors = getColors(isDark);
  const { average } = useDecks();

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.settingsRow}>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={onOpenSettings}
        >
          <Ionicons name="settings-outline" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Study less stress, cram wisely</Text>

      <View style={styles.card}>
        <Text style={styles.cardIcon}>📚</Text>
        <Text style={styles.cardTitle}>Study smarter with CramWise</Text>
        <Text style={styles.cardBody}>
          Review your flashcards, take quizzes, and track your progress.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Progress overview</Text>

      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => goTo("progress")}
      >
        <View style={styles.progressTop}>
          <Text style={styles.cardTitle}>Average score</Text>
          <Text style={styles.progressPercent}>{average}%</Text>
        </View>
        <View style={styles.barBackground}>
          <View style={[styles.barFill, { width: `${average}%` }]} />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}
