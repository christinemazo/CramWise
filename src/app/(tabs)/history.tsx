import { StyleSheet, Text, View } from "react-native";

export default function History() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.emoji}>🕓</Text>
        <Text style={styles.title}>No study history yet</Text>
        <Text style={styles.body}>
          Completed decks and quiz sessions will show up here so you can track what you have reviewed.
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
