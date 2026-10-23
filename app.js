import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Switch,
} from "react-native";
import { colors, styles } from "./styles";

const SCORES = [
  { id: "1", title: "Mobile Programming", date: "Yesterday", score: 85 },
  { id: "2", title: "Programming Language", date: "Two days ago", score: 75 },
  { id: "3", title: "Software Engineering", date: "Sept 30", score: 80 },
];
const SCORE_LIMIT = 3;
const TABS = [
  { key: "home", label: "Home", icon: "home" },
  { key: "create", label: "Create", icon: "add-circle" },
  { key: "progress", label: "Progress", icon: "stats-chart" },
];
const FLASHCARDS = [
  {
    id: "1",
    question: "What is React Native used for?",
    answer: "Building mobile apps with JavaScript",
  },
];

function getAverage(scores) {
  if (scores.length === 0) return 0;
  const total = scores.reduce((sum, item) => sum + item.score, 0);
  return Math.round(total / scores.length);
}

function Home({ goTo, onOpenSettings, isDark }) {
  const average = getAverage(SCORES);
  const theme = {
    title: { color: isDark ? "#fff" : "#0F172A" },
    subtitle: { color: isDark ? "#94A3B8" : "#64748B" },
    card: { backgroundColor: isDark ? "#17263A" : "#fff" },
    cardTitle: { color: isDark ? "#fff" : "#0F172A" },
    cardBody: { color: isDark ? "#94A3B8" : "#64748B" },
  };
  return (
    <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={[styles.content, { backgroundColor: isDark ? "#0F1629" : "#F8FAFC", flexGrow: 1, minHeight: '100%' }]}>
      <View style={{ width: "100%", alignItems: "flex-end" }}>
        <TouchableOpacity onPress={onOpenSettings} style={{ padding: 8 }}>
          <Ionicons name="settings-outline" size={22} color={isDark ? "#fff" : "#0F172A"} />
        </TouchableOpacity>
      </View>
      <Text style={[styles.title, theme.title]}>Welcome</Text>
      <Text style={[styles.subtitle, theme.subtitle]}>Study less stress, cram wisely</Text>
      <View style={[styles.card, theme.card]}>
        <Text style={styles.cardIcon}>📚</Text>
        <Text style={[styles.cardTitle, theme.cardTitle]}>Study smarter with CramWise</Text>
        <Text style={[styles.cardBody, theme.cardBody]}>Review your flashcards, take quizzes, and track your progress.</Text>
      </View>
      <Text style={[styles.sectionTitle, theme.title]}>Progress overview</Text>
      <TouchableOpacity style={[styles.card, theme.card]} activeOpacity={0.8} onPress={() => goTo("progress")}>
        <View style={styles.progressTop}>
          <Text style={[styles.cardTitle, theme.cardTitle]}>Average score</Text>
          <Text style={styles.progressPercent}>{average}%</Text>
        </View>
        <View style={styles.barBackground}>
          <View style={[styles.barFill, { width: `${average}%` }]} />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

function FlashCard({ question, answer, isDark }) {
  const [flashed, setFlashed] = useState(false);
  return (
    <TouchableOpacity style={[styles.flashCard, { backgroundColor: isDark ? "#17263A" : "#fff" }, flashed && styles.flashCardBack]} activeOpacity={0.9} onPress={() => setFlashed(!flashed)}>
      <Text style={styles.flashSide}>{flashed ? "ANSWER" : "QUESTION"}</Text>
      <Text style={[styles.flashText, { color: isDark ? "#fff" : "#0F172A" }]}>{flashed ? answer : question}</Text>
      <Text style={styles.flashHint}>Tap to see the answer</Text>
    </TouchableOpacity>
  );
}

function Create({ isDark }) {
  const theme = {
    bg: { backgroundColor: isDark ? "#0F1629" : "#F8FAFC" },
    title: { color: isDark ? "#fff" : "#0F172A" },
    subtitle: { color: isDark ? "#94A3B8" : "#64748B" },
    card: { backgroundColor: isDark ? "#17263A" : "#fff" },
    label: { color: isDark ? "#fff" : "#0F172A" },
    input: { backgroundColor: isDark ? "#0F1629" : "#F1F5F9" },
  };
  return (
    <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={[styles.content, theme.bg, { flexGrow: 1, minHeight: '100%' }]}>
      <Text style={[styles.title, theme.title]}>Create New Deck</Text>
      <Text style={[styles.subtitle, theme.subtitle]}>Add cards to your deck</Text>
      <Text style={[styles.label, theme.label]}>Deck Title</Text>
      <View style={[styles.input, theme.input]}><Text style={styles.fieldText}>e.g., Mobile Programming</Text></View>
      <View style={[styles.card, theme.card]}>
        <Text style={[styles.cardTitle, theme.label]}>Add Flashcard</Text>
        <Text style={[styles.label, theme.label]}>Front (Question / Term)</Text>
        <View style={[styles.input, styles.textArea, theme.input]}><Text style={styles.fieldText}>Enter question...</Text></View>
        <Text style={[styles.label, theme.label]}>Back (Answer / Definition)</Text>
        <View style={[styles.input, styles.textArea, theme.input]}><Text style={styles.fieldText}>Enter answer...</Text></View>
        <TouchableOpacity style={styles.button} activeOpacity={0.8}><Text style={styles.buttonText}>Add Card</Text></TouchableOpacity>
      </View>
      {FLASHCARDS.map((card) => (<FlashCard key={card.id} question={card.question} answer={card.answer} isDark={isDark} />))}
    </ScrollView>
  );
}

function ProgressScreen({ isDark }) {
  const average = getAverage(SCORES);
  const theme = {
    bg: { backgroundColor: isDark ? "#0F1629" : "#F8FAFC" },
    title: { color: isDark ? "#fff" : "#0F172A" },
    subtitle: { color: isDark ? "#94A3B8" : "#64748B" },
    card: { backgroundColor: isDark ? "#17263A" : "#fff" },
    cardTitle: { color: isDark ? "#fff" : "#0F172A" },
    cardBody: { color: isDark ? "#94A3B8" : "#64748B" },
  };
  return (
    <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={[styles.content, theme.bg, { flexGrow: 1, minHeight: '100%' }]}>
      <Text style={[styles.title, theme.title]}>Progress</Text>
      <Text style={[styles.subtitle, theme.subtitle]}>Your average is {average}%</Text>
      {SCORES.slice(0, SCORE_LIMIT).map((item) => (
        <View key={item.id} style={[styles.card, theme.card]}>
          <View style={styles.progressTop}><Text style={[styles.cardTitle, theme.cardTitle]}>{item.title}</Text><Text style={styles.progressPercent}>{item.score}%</Text></View>
          <Text style={[styles.cardBody, theme.cardBody]}>{item.date}</Text>
          <View style={styles.barBackground}><View style={[styles.barFill, { width: `${item.score}%` }]} /></View>
        </View>
      ))}
    </ScrollView>
  );
}

// AYOS NA TAB BAR - KAHIT WALA SA styles.js GAGANA!
function TabBar({ active, onChange, isDark }) {
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: isDark ? "#17263A" : "#fff",
      borderTopWidth: 1,
      borderTopColor: isDark ? "#25364D" : "#E2E8F0",
      paddingVertical: 10,
      paddingBottom: 15,
      width: '100%',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    }}>
      {TABS.map((tab) => (
        <TouchableOpacity key={tab.key} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} activeOpacity={0.7} onPress={() => onChange(tab.key)}>
          <Ionicons name={tab.icon} size={26} color={active === tab.key ? "#208AEF" : "#94A3B8"} />
          <Text style={{ fontSize: 11, marginTop: 3, color: active === tab.key ? "#208AEF" : "#94A3B8", fontWeight: active === tab.key ? '700' : '400' }}>{tab.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [isDark, setIsDark] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const renderScreen = () => {
    if (activeTab === "create") return <Create isDark={isDark} />;
    if (activeTab === "progress") return <ProgressScreen isDark={isDark} />;
    return <Home goTo={setActiveTab} onOpenSettings={() => setShowSettings(true)} isDark={isDark} />;
  };

  return (
    <View style={[styles.app, { flex: 1, backgroundColor: isDark ? "#0F1629" : "#F8FAFC", width: '100%', height: '100%' }]}>
      <View style={{ flex: 1, paddingBottom: 70, width: '100%' }}>
        {renderScreen()}
      </View>
      <TabBar active={activeTab} onChange={setActiveTab} isDark={isDark} />
      <Modal visible={showSettings} transparent animationType="slide">
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", padding: 20 }}>
          <View style={{ backgroundColor: isDark ? "#17263A" : "#fff", borderRadius: 20, padding: 24 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
              <Text style={{ fontSize: 20, fontWeight: "700", color: isDark ? "#fff" : "#0F172A" }}>Settings</Text>
              <TouchableOpacity onPress={() => setShowSettings(false)}><Ionicons name="close" size={24} color={isDark ? "#fff" : "#0F172A"} /></TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: isDark ? "#25364D" : "#E2E8F0" }}>
              <Text style={{ color: isDark ? "#fff" : "#0F172A", fontWeight: "600" }}>Light Mode</Text>
              <Switch value={!isDark} onValueChange={(v) => { if(v) setIsDark(false); }} />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 12 }}>
              <Text style={{ color: isDark ? "#fff" : "#0F172A", fontWeight: "600" }}>Dark Mode</Text>
              <Switch value={isDark} onValueChange={(v) => { if(v) setIsDark(true); }} />
            </View>
            <View style={{ backgroundColor: isDark ? "#0F1629" : "#F1F5F9", borderRadius: 12, padding: 16, marginTop: 12 }}>
              <Text style={{ fontWeight: "700", color: isDark ? "#fff" : "#0F172A", marginBottom: 6 }}>About CramWise</Text>
              <Text style={{ color: isDark ? "#94A3B8" : "#64748B", fontSize: 13, lineHeight: 20 }}>CramWise is your smart study companion. Review flashcards, take quizzes, and track your progress. Study less stress, cram wisely.</Text>
            </View>
            <TouchableOpacity onPress={() => setShowSettings(false)} style={{ backgroundColor: "#208AEF", padding: 12, borderRadius: 12, alignItems: "center", marginTop: 20 }}>
              <Text style={{ color: "#fff", fontWeight: "700" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}