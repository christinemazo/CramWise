// APP: picks the open tab and shows the tab bar

import { useState } from "react";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import TabBar from "./src/components/Tabbar";
import { DeckProvider } from "./src/contexts/Deckcontext";
import CreateScreen from "./src/screens/Createscreen";
import HomeScreen from "./src/screens/Homescreen";
import ProgressScreen from "./src/screens/Progressscreen";
import QuizScreen from "./src/screens/Quizscreen";
import { getStyles } from "./styles";

export default function App() {
  // Which tab is open ("home", "create", "quiz" or "progress")
  const [activeTab, setActiveTab] = useState("home");

  // true = dark mode, false = light mode (shared by every screen)
  const [isDark, setIsDark] = useState(true);

  const styles = getStyles(isDark);

  // Picks the screen that matches the open tab
  const renderScreen = () => {
    if (activeTab === "create") return <CreateScreen isDark={isDark} />;
    if (activeTab === "quiz") return <QuizScreen isDark={isDark} />;
    if (activeTab === "progress") return <ProgressScreen isDark={isDark} />;
    return (
      <HomeScreen goTo={setActiveTab} isDark={isDark} setIsDark={setIsDark} />
    );
  };

  return (
    <SafeAreaProvider>
      <DeckProvider>
        <SafeAreaView style={styles.app} edges={["top", "bottom"]}>
          <View style={styles.screen}>{renderScreen()}</View>
          <TabBar active={activeTab} onChange={setActiveTab} isDark={isDark} />
        </SafeAreaView>
      </DeckProvider>
    </SafeAreaProvider>
  );
}