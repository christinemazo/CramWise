import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";

const stats = [
  { label: "Streak", value: "12d" },
  { label: "Accuracy", value: "89%" },
  { label: "Focus", value: "20m" },
];

const actions = [
  { title: "Upload notes", subtitle: "PDF • PPT • DOCX", token: "UP" },
  { title: "Generate quiz", subtitle: "MCQ • True / False", token: "QZ" },
  { title: "Flashcards", subtitle: "Review • Recall", token: "FC" },
  { title: "Timer mode", subtitle: "15 • 30 • 45 min", token: "TM" },
];

const questionTypes = [
  "Multiple choice",
  "True / False",
  "Identification",
  "Fill blanks",
  "Matching",
];

const recentScores = [
  { title: "Biology review", score: "92%", time: "12 min ago" },
  { title: "Spanish verbs", score: "88%", time: "1 day ago" },
  { title: "History recap", score: "95%", time: "2 days ago" },
];

export default function Home() {
  const { session } = useAuth();
  const { actualTheme, setTheme } = useTheme();
  const isDark = actualTheme === "dark";
  const email = session?.user?.email ?? null;
  const firstName = email ? email.split("@")[0].split(".")[0] : "there";
  const isCompact = Dimensions.get("window").width < 380;

  const palette = isDark
    ? {
        background: "#17151B",
        panel: "#24202A",
        panelStrong: "#30273A",
        panelSoft: "#211D27",
        border: "#3A3044",
        text: "#FFF9F0",
        muted: "#D0C4D2",
        secondary: "#B3A5B7",
        accent: "#D5B77A",
        accentCool: "#A9C7A1",
        accentSoft: "#403342",
        toggle: "#F4EBDD",
        toggleText: "#29212B",
      }
    : {
        background: "#FBF7F1",
        panel: "#FFFFFF",
        panelStrong: "#F4E9DE",
        panelSoft: "#FCF9F5",
        border: "#E9DED4",
        text: "#302A36",
        muted: "#6F6873",
        secondary: "#817782",
        accent: "#A06E35",
        accentCool: "#769A6D",
        accentSoft: "#F3E4D6",
        toggle: "#302A36",
        toggleText: "#FFF9F0",
      };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: palette.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.topbar}>
        <View>
          <Text style={[styles.eyebrow, { color: palette.accent }]}>Study ready</Text>
          <Text style={[styles.greeting, { color: palette.text }]}>
            {email ? `Welcome back, ${firstName}` : "Welcome"}
          </Text>
        </View>

        <Pressable
          onPress={() => setTheme(isDark ? "light" : "dark")}
          style={[
            styles.themeButton,
            { backgroundColor: palette.toggle, borderColor: palette.border },
          ]}
        >
          <Text style={[styles.themeButtonText, { color: palette.toggleText }]}>
            {isDark ? "Light" : "Dark"}
          </Text>
        </Pressable>
      </View>

      <LinearGradient
        colors={isDark ? ["#49344A", "#34283D", "#24202A"] : ["#FFF1D9", "#F4E9DE", "#EDE3F0"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.heroCard,
          { borderColor: palette.border },
        ]}
      >
        <View style={styles.heroHeader}>
          <Text
            style={[styles.badge, { backgroundColor: palette.accentSoft, color: palette.accent }]}
          >
            12-day streak
          </Text>
          <Text style={[styles.heroChip, { color: palette.muted }]}>Daily goal</Text>
        </View>

        <Text style={[styles.heroTitle, { color: palette.text }]}>Finish a 20 minute quiz challenge</Text>
        <Text style={[styles.heroSubtitle, { color: palette.muted }]}>
          Keep your momentum with short review sessions, question variety, and smarter recall cycles.
        </Text>

        <View style={[styles.heroActions, isCompact && styles.heroActionsCompact]}>
          <Pressable style={[styles.primaryButton, { backgroundColor: palette.accentCool }]}>
            <Text style={styles.primaryButtonText}>Start quiz</Text>
          </Pressable>
          <Pressable
            style={[
              styles.secondaryButton,
              { backgroundColor: isDark ? "rgba(255,249,240,0.12)" : "rgba(255,255,255,0.78)", borderColor: palette.border },
            ]}
          >
            <Text style={[styles.secondaryButtonText, { color: palette.text }]}>Daily review</Text>
          </Pressable>
        </View>
      </LinearGradient>

      <View style={styles.statsRow}>
        {stats.map((stat) => (
          <View
            key={stat.label}
            style={[
              styles.statCard,
              { backgroundColor: palette.panel, borderColor: palette.border },
            ]}
          >
            <Text style={[styles.statValue, { color: palette.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: palette.secondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionLabel, { color: palette.secondary }]}>Quick actions</Text>
      </View>

      <View style={styles.actionGrid}>
        {actions.map((action) => (
          <Pressable
            key={action.title}
            style={[
              styles.actionCard,
              { backgroundColor: palette.panel, borderColor: palette.border },
            ]}
          >
            <View style={[styles.token, { backgroundColor: palette.accentSoft }]}>
              <Text style={[styles.tokenText, { color: palette.accent }]}>{action.token}</Text>
            </View>
            <Text style={[styles.actionTitle, { color: palette.text }]}>{action.title}</Text>
            <Text style={[styles.actionSubtitle, { color: palette.muted }]}>{action.subtitle}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionLabel, { color: palette.secondary }]}>Question types</Text>
      </View>

      <View style={styles.pillGrid}>
        {questionTypes.map((type) => (
          <View
            key={type}
            style={[
              styles.pill,
              { backgroundColor: palette.panelSoft, borderColor: palette.border },
            ]}
          >
            <Text style={[styles.pillText, { color: palette.text }]}>{type}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionLabel, { color: palette.secondary }]}>Recent scores</Text>
        <Text style={[styles.linkText, { color: palette.accent }]}>View all</Text>
      </View>

      <View
        style={[
          styles.scoreCard,
          { backgroundColor: palette.panel, borderColor: palette.border },
        ]}
      >
        {recentScores.map((item) => (
          <View key={item.title} style={styles.scoreRow}>
            <View>
              <Text style={[styles.scoreTitle, { color: palette.text }]}>{item.title}</Text>
              <Text style={[styles.scoreMeta, { color: palette.muted }]}>{item.time}</Text>
            </View>
            <Text style={[styles.scoreValue, { color: palette.accent }]}>{item.score}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 48,
  },
  topbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  eyebrow: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  greeting: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -0.7,
    marginTop: 4,
  },
  themeButton: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  themeButtonText: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  heroCard: {
    borderRadius: 26,
    padding: 24,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 26,
    shadowOffset: { width: 0, height: 14 },
    elevation: 10,
  },
  heroHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  badge: {
    fontFamily: "Quicksand_700Bold",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  heroChip: {
    fontFamily: "Quicksand_600SemiBold",
    fontSize: 12,
    fontWeight: "600",
  },
  heroTitle: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.6,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontFamily: "Quicksand_400Regular",
    fontSize: 14,
    lineHeight: 20,
  },
  heroActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 22,
  },
  heroActionsCompact: {
    flexDirection: "column",
  },
  primaryButton: {
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flex: 1,
    minHeight: 48,
    justifyContent: "center",
  },
  primaryButtonText: {
    fontFamily: "Quicksand_700Bold",
    color: "#FFFFFF",
    fontWeight: "700",
    textAlign: "center",
  },
  secondaryButton: {
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flex: 1,
    minHeight: 48,
    justifyContent: "center",
  },
  secondaryButtonText: {
    fontFamily: "Quicksand_700Bold",
    fontWeight: "700",
    textAlign: "center",
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    padding: 15,
  },
  statValue: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  statLabel: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 11,
    marginTop: 4,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    marginBottom: 14,
  },
  sectionLabel: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  linkText: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 12,
    fontWeight: "700",
  },
  actionGrid: {
    gap: 14,
  },
  actionCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 17,
    minHeight: 116,
  },
  token: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  tokenText: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  actionTitle: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  actionSubtitle: {
    fontFamily: "Quicksand_400Regular",
    fontSize: 13,
    lineHeight: 18,
  },
  pillGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  pill: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  pillText: {
    fontFamily: "Quicksand_600SemiBold",
    fontSize: 12,
    fontWeight: "600",
  },
  scoreCard: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(148,163,184,0.22)",
  },
  scoreTitle: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 15,
    fontWeight: "700",
  },
  scoreMeta: {
    fontFamily: "Quicksand_400Regular",
    fontSize: 12,
    marginTop: 3,
  },
  scoreValue: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 18,
    fontWeight: "800",
  },
});
