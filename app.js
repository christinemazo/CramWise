import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Switch, Text, TouchableOpacity, View } from "react-native";
import TabBar from "./components/TabBar";
import { DeckProvider } from "./context/DeckContext";
import CreateScreen from "./screens/CreateScreen";
import HomeScreen from "./screens/HomeScreen";
import ProgressScreen from "./screens/ProgressScreen";
import { getColors, getStyles } from "./styles";

export default function App() {
  // Which tab is open ("home", "create" or "progress")
  const [activeTab, setActiveTab] = useState("home");

  // true = dark mode, false = light mode
  const [isDark, setIsDark] = useState(true);

  // Is the settings pop-up open?
  const [showSettings, setShowSettings] = useState(false);

  const styles = getStyles(isDark);
  const colors = getColors(isDark);

  // Picks the screen that matches the open tab
  const renderScreen = () => {
    if (activeTab === "create") return <CreateScreen isDark={isDark} />;
    if (activeTab === "progress") return <ProgressScreen isDark={isDark} />;
    return (
      <HomeScreen
        goTo={setActiveTab}
        onOpenSettings={() => setShowSettings(true)}
        isDark={isDark}
      />
    );
  };

  return (
    // DeckProvider shares the saved decks with every screen
    <DeckProvider>
      <View style={styles.app}>
        <View style={styles.screen}>{renderScreen()}</View>

        <TabBar active={activeTab} onChange={setActiveTab} isDark={isDark} />

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
                  CramWise is your smart study companion. Review flashcards,
                  take quizzes, and track your progress. Study less stress, cram
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
      </View>
    </DeckProvider>
  );
}
