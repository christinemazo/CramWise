// HOME SCREEN: welcome message, the average score, and the settings pop-up

import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Modal,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getColors, getStyles } from "../../styles";
import { useDecks } from "../contexts/Deckcontext";

// goTo = changes the open tab, isDark / setIsDark = the color mode from App
export default function HomeScreen({ goTo, isDark, setIsDark }) {
  const styles = getStyles(isDark);
  const colors = getColors(isDark);
  const { average } = useDecks();

  // Is the settings pop-up open?
  const [showSettings, setShowSettings] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      {/* Settings gear on the right */}
      <View style={styles.settingsRow}>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => setShowSettings(true)}
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
        <View style={styles.progressTop}>
          <Text style={styles.cardTitle}>Average score</Text>
          <Text style={styles.progressPercent}>{average}%</Text>
        </View>
        <View style={styles.barBackground}>
          <View style={[styles.barFill, { width: `${average}%` }]} />
        </View>
      </TouchableOpacity>

      {/* Settings pop-up */}
      <Modal visible={showSettings} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Settings</Text>
              <TouchableOpacity onPress={() => setShowSettings(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Dark Mode</Text>
              <Switch value={isDark} onValueChange={setIsDark} />
            </View>

            <View style={styles.aboutBox}>
              <Text style={styles.aboutTitle}>About CramWise</Text>
              <Text style={styles.aboutBody}>
                CramWise is your smart study companion. Review flashcards, take
                quizzes, and track your progress. Study less stress, cram
                wisely.
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.button, styles.closeButton]}
              onPress={() => setShowSettings(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}