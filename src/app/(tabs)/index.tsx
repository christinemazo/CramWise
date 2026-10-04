import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

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
        <Ionicons name="settings-outline" size={25} color="#FFFFFF" />
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

        {/* QUICK ACTIONS */}
        <Text style={styles.sectionLabel}>Quick actions</Text>

        <Pressable
          style={styles.actionCard}
          onPress={() => router.push("/create")}
        >
          <View style={styles.actionIcon}>
            <Ionicons name="add-circle-outline" size={26} color="#3B82F6" />
          </View>

          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Create Flashcards</Text>

            <Text style={styles.actionText}>Create a new study deck.</Text>
          </View>

          <Ionicons name="chevron-forward" size={22} color="#64748B" />
        </Pressable>

        <Pressable
          style={styles.actionCard}
          onPress={() => router.push("/progress")}
        >
          <View style={styles.actionIcon}>
            <Ionicons name="stats-chart-outline" size={26} color="#3B82F6" />
          </View>

          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>View Progress</Text>

            <Text style={styles.actionText}>Check your study progress.</Text>
          </View>

          <Ionicons name="chevron-forward" size={22} color="#64748B" />
        </Pressable>

        {/* SETTINGS */}
        <Pressable
          style={styles.actionCard}
          onPress={() => router.push("/settings")}
        >
          <View style={styles.actionIcon}>
            <Ionicons name="settings-outline" size={26} color="#3B82F6" />
          </View>

          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Settings</Text>

            <Text style={styles.actionText}>
              Account, appearance, and app settings.
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={22} color="#64748B" />
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },

  content: {
    padding: 20,
    paddingTop: 100,
    paddingBottom: 40,
  },

  settingsButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 100,
    elevation: 10,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#1E293B",
    borderWidth: 1,
    borderColor: "#334155",
    alignItems: "center",
    justifyContent: "center",
  },

  greeting: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
  },

  subtitle: {
    color: "#9CA3AF",
    fontSize: 14,
    marginTop: 5,
    marginBottom: 32,
  },

  sectionLabel: {
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
  },

  card: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
    padding: 20,
    marginBottom: 28,
  },

  cardIcon: {
    fontSize: 28,
    marginBottom: 12,
  },

  cardTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },

  cardBody: {
    color: "#9CA3AF",
    fontSize: 14,
    lineHeight: 20,
  },

  actionCard: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  actionIcon: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: "#172554",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  actionContent: {
    flex: 1,
  },

  actionTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  actionText: {
    color: "#94A3B8",
    fontSize: 13,
    marginTop: 4,
  },
});
