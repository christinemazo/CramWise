import { StyleSheet, Text, View } from "react-native";

export default function Create() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🛠️</Text>
      <Text style={styles.title}>Deck creation is coming soon</Text>
      <Text style={styles.body}>
        This is where you'll build a new flashcard deck.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emoji: { fontSize: 40, marginBottom: 16 },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  body: { color: "#9CA3AF", fontSize: 14, textAlign: "center" },
});
