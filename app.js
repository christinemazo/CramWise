// APP: picks the open tab, shows the tab bar and settings pop-up

// Icons from Expo (used for the close icon in the settings pop-up)
import { Ionicons } from "@expo/vector-icons";
// useState lets the component remember values that can change
import { useState } from "react";
// Basic building blocks: pop-up, on/off switch, text, button, box
import { Modal, Switch, Text, TouchableOpacity, View } from "react-native";
// Keeps the app away from the notch, status bar and home bar
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// The bottom navigation bar
import TabBar from "./src/components/Tabbar";
// Gives every screen access to the saved decks and scores
import { DeckProvider } from "./src/contexts/Deckcontext";
// The four screens of the app
import CreateScreen from "./src/screens/Createscreen";
import HomeScreen from "./src/screens/Homescreen";
import ProgressScreen from "./src/screens/Progressscreen";
import QuizScreen from "./src/screens/Quizscreen";
// Functions that give the colors and styles for dark or light mode
import { getColors, getStyles } from "./styles";

// The main component of the app
export default function App() {
  // Which tab is open ("home", "create", "quiz" or "progress")
  const [activeTab, setActiveTab] = useState("home");

  // true = dark mode, false = light mode
  const [isDark, setIsDark] = useState(true);

  // Is the settings pop-up open?
  const [showSettings, setShowSettings] = useState(false);

  // Styles and colors that match the current mode
  const styles = getStyles(isDark);
  const colors = getColors(isDark);

  // Picks the screen that matches the open tab
  const renderScreen = () => {
    // Create tab
    if (activeTab === "create") return <CreateScreen isDark={isDark} />;
    // Quiz tab
    if (activeTab === "quiz") return <QuizScreen isDark={isDark} />;
    // Progress tab
    if (activeTab === "progress") return <ProgressScreen isDark={isDark} />;
    // Otherwise show Home (goTo changes the tab, onOpenSettings opens the pop-up)
    return (
      <HomeScreen
        goTo={setActiveTab}
        onOpenSettings={() => setShowSettings(true)}
        isDark={isDark}
      />
    );
  };

  return (
    // SafeAreaProvider is required for SafeAreaView (needed on web)
    <SafeAreaProvider>
      {/* DeckProvider shares the saved decks with every screen */}
      <DeckProvider>
        {/* SafeAreaView keeps content away from the notch and home bar */}
        <SafeAreaView style={styles.app} edges={["top", "bottom"]}>
          {/* The open screen fills the space above the tab bar */}
          <View style={styles.screen}>{renderScreen()}</View>

          {/* Bottom tab bar: highlights the open tab and changes it on press */}
          <TabBar active={activeTab} onChange={setActiveTab} isDark={isDark} />

          {/* Settings pop-up */}
          <Modal visible={showSettings} transparent animationType="slide">
            {/* Dark layer behind the pop-up */}
            <View style={styles.modalBackdrop}>
              {/* The pop-up box */}
              <View style={styles.modalCard}>
                {/* Title on the left, close icon on the right */}
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Settings</Text>
                  <TouchableOpacity onPress={() => setShowSettings(false)}>
                    <Ionicons name="close" size={24} color={colors.text} />
                  </TouchableOpacity>
                </View>

                {/* Dark mode switch */}
                <View style={styles.settingRow}>
                  <Text style={styles.settingLabel}>Dark Mode</Text>
                  <Switch value={isDark} onValueChange={setIsDark} />
                </View>

                {/* About box */}
                <View style={styles.aboutBox}>
                  <Text style={styles.aboutTitle}>About CramWise</Text>
                  <Text style={styles.aboutBody}>
                    CramWise is your smart study companion. Review flashcards,
                    take quizzes, and track your progress. Study less stress,
                    cram wisely.
                  </Text>
                </View>

                {/* Close button */}
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
    </SafeAreaProvider>
  );
}
