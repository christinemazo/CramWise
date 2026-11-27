// HOME SCREEN: welcome message and the average score

// Icons from Expo (used for the settings gear)
import { Ionicons } from "@expo/vector-icons";
// Building blocks: scrollable screen, text, pressable area, box
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
// Functions that give the colors and styles for dark or light mode
import { getColors, getStyles } from "../../styles";
// Gives access to the shared data
import { useDecks } from "../contexts/Deckcontext";

// goTo = changes the open tab, onOpenSettings = opens the settings pop-up
export default function HomeScreen({ goTo, onOpenSettings, isDark }) {
  // Styles and colors that match the current mode
  const styles = getStyles(isDark);
  const colors = getColors(isDark);
  // The average score from the shared data
  const { average } = useDecks();

  return (
    // Scrollable screen
    <ScrollView contentContainerStyle={styles.content}>
      {/* Settings gear on the right */}
      <View style={styles.settingsRow}>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={onOpenSettings}
        >
          <Ionicons name="settings-outline" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Title and tagline */}
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

      {/* Section heading */}
      <Text style={styles.sectionTitle}>Progress overview</Text>

      {/* Average score card: pressing it opens the Progress tab */}
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => goTo("progress")}
      >
        {/* Label on the left, percent on the right */}
        <View style={styles.progressTop}>
          <Text style={styles.cardTitle}>Average score</Text>
          <Text style={styles.progressPercent}>{average}%</Text>
        </View>
        {/* Empty bar with a blue part as wide as the average */}
        <View style={styles.barBackground}>
          <View style={[styles.barFill, { width: `${average}%` }]} />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}
