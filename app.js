// APP: picks the open tab, shows the tab bar and settings pop-up

import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TabBar from "./src/components/Tabbar";
import { DeckProvider } from "./src/contexts/Deckcontext";
import CreateScreen from "./src/screens/Createscreen";
import HomeScreen from "./src/screens/Homesreen";
import ProgressScreen from "./src/screens/Progressscreen";
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
      {/* SafeAreaView keeps content away from the notch and home bar */}
      <SafeAreaView style={styles.app} edges={["top", "bottom"]}>
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
      </SafeAreaView>
    </DeckProvider>
  );
}
