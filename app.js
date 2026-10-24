import { Ionicons } from "@expo/vector-icons"; // icons
import { useState } from "react"; // lets the app remember values
import {
  Modal, // pop-up window
  Switch, // on/off switch
  Text, // all text
  TouchableOpacity, // pressable buttons
  View, // box / container
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"; // keeps content out of the notch and system bars
import TabBar from "./components/TabBar"; // bottom navigation
import CreateScreen from "./screens/CreateScreen"; // Create tab
import HomeScreen from "./screens/HomeScreen"; // Home tab
import ProgressScreen from "./screens/ProgressScreen"; // Progress tab
import { getColors, getStyles } from "./styles"; // colors and styles

// APP CONTENT (active screen + tab bar + settings)

function AppContent() {
  // Which tab is open right now ("home", "create" or "progress")
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
    <SafeAreaView style={styles.app}>
      {/* Active screen */}
      <View style={styles.screen}>{renderScreen()}</View>

      {/* Bottom tab bar */}
      <TabBar active={activeTab} onChange={setActiveTab} isDark={isDark} />

      {/* Settings pop-up */}
      <Modal visible={showSettings} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            {/* Title and close icon */}
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
                CramWise is your smart study companion. Review flashcards, take
                quizzes, and track your progress. Study less stress, cram
                wisely.
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
  );
}

// APP (wraps everything in SafeAreaProvider so SafeAreaView works)
export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}
