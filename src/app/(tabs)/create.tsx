import { StyleSheet, Text, View } from "react-native";

export default function Create() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.emoji}>🛠️</Text>
        <Text style={styles.title}>Deck creation is coming soon</Text>
        <Text style={styles.body}>
          Build a custom set of flashcards, organize them by subject, and turn your notes into focused review sessions.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09111E",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#101B2D",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#1D2C45",
    padding: 28,
    alignItems: "center",
  },
  emoji: { fontSize: 42, marginBottom: 16 },
  title: {
    color: "#F8FBFF",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
  body: {
    color: "#A7B7D1",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
});
