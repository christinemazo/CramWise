import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

// Placeholder numbers, same as the Progress screen.
// Replace with real data once quiz results are stored.
const averageScore = 85;
const quizzesTaken = 2;
const bestScore = 96;

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* SETTINGS BUTTON */}
      <Pressable
        style={styles.settingsButton}
        onPress={() => router.push("/settings")}
        accessibilityRole="button"
        accessibilityLabel="Open Settings"
        hitSlop={10}
      >
        <Ionicons name="settings-outline" size={22} color="#208AEF" />
      </Pressable>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <Text style={styles.greeting}>Welcome</Text>

        <Text style={styles.subtitle}>
          Studying offline — no account needed
        </Text>

        {/* GET STARTED */}
        <Text style={styles.sectionLabel}>Get started</Text>

        <View style={styles.card}>
          <Text style={styles.cardIcon}>📚</Text>

          <Text style={styles.cardTitle}>Study smarter with CramWise</Text>

          <Text style={styles.cardBody}>
            Review your flashcards, take quizzes, and track your progress.
          </Text>
        </View>

        {/* PROGRESS OVERVIEW */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabelNoMargin}>Progress overview</Text>

          <Pressable
            onPress={() => router.push("/progress")}
            accessibilityRole="button"
            accessibilityLabel="See all progress"
            hitSlop={10}
          >
            <Text style={styles.seeAll}>See All</Text>
          </Pressable>
        </View>

        <Pressable
          style={styles.progressCard}
          onPress={() => router.push("/progress")}
        >
          <View style={styles.progressTop}>
            <View>
              <Text style={styles.progressLabel}>Overall Progress</Text>
              <Text style={styles.progressDescription}>
                Keep improving your scores
              </Text>
            </View>

            <Text style={styles.progressPercentage}>{averageScore}%</Text>
          </View>

          <View style={styles.progressBarBackground}>
            <View
              style={[styles.progressBarFill, { width: `${averageScore}%` }]}
            />
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statTile}>
              <Ionicons
                name="document-text-outline"
                size={18}
                color="#208AEF"
              />
              <Text style={styles.statValue}>{quizzesTaken}</Text>
              <Text style={styles.statLabel}>Quizzes</Text>
            </View>

            <View style={styles.statTile}>
              <Ionicons name="trending-up-outline" size={18} color="#208AEF" />
              <Text style={styles.statValue}>{averageScore}%</Text>
              <Text style={styles.statLabel}>Average</Text>
            </View>

            <View style={styles.statTile}>
              <Ionicons name="trophy-outline" size={18} color="#208AEF" />
              <Text style={styles.statValue}>{bestScore}%</Text>
              <Text style={styles.statLabel}>Best</Text>
            </View>
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F1629",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 110,
  },

  settingsButton: {
    position: "absolute",
    top: 48,
    right: 20,
    zIndex: 100,
    elevation: 10,
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#17263A",
    borderWidth: 1,
    borderColor: "#25364D",
    alignItems: "center",
    justifyContent: "center",
  },

  greeting: {
    color: "#F8FAFC",
    fontSize: 30,
    fontWeight: "800",
  },

  subtitle: {
    color: "#94A3B8",
    fontSize: 14,
    marginTop: 2,
    marginBottom: 28,
  },

  sectionLabel: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  sectionLabelNoMargin: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  seeAll: {
    fontSize: 13,
    fontWeight: "700",
    color: "#208AEF",
  },

  card: {
    backgroundColor: "#17263A",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#25364D",
    padding: 20,
    marginBottom: 28,
  },

  cardIcon: {
    fontSize: 28,
    marginBottom: 12,
  },

  cardTitle: {
    color: "#F8FAFC",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },

  cardBody: {
    color: "#94A3B8",
    fontSize: 14,
    lineHeight: 20,
  },

  progressCard: {
    backgroundColor: "#17263A",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#25364D",
    padding: 20,
  },

  progressTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  progressLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  progressDescription: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 3,
  },

  progressPercentage: {
    fontSize: 25,
    fontWeight: "700",
    color: "#208AEF",
  },

  progressBarBackground: {
    height: 9,
    backgroundColor: "#25364D",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 16,
  },

  progressBarFill: {
    height: "100%",
    backgroundColor: "#208AEF",
    borderRadius: 10,
  },

  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 18,
  },

  statTile: {
    flex: 1,
    backgroundColor: "#0F1629",
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    gap: 4,
  },

  statValue: {
    color: "#F8FAFC",
    fontSize: 16,
    fontWeight: "700",
  },

  statLabel: {
    color: "#78879B",
    fontSize: 11,
  },
});
