import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function CreateScreen() {
  const [deckTitle, setDeckTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [cards, setCards] = useState<
    { id: string; question: string; answer: string }[]
  >([]);

  const handleAddCard = () => {
    if (!question.trim() || !answer.trim()) return;
    setCards([...cards, { id: Date.now().toString(), question, answer }]);
    setQuestion("");
    setAnswer("");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Create New Deck</Text>

      {/* Deck Title Input */}
      <Text style={styles.label}>Deck Title</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Biology 101"
        placeholderTextColor="#888"
        value={deckTitle}
        onChangeText={setDeckTitle}
      />

      {/* Card Input Section */}
      <View style={styles.cardForm}>
        <Text style={styles.sectionTitle}>Add Flashcard</Text>

        <Text style={styles.label}>Front (Question / Term)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter question..."
          placeholderTextColor="#888"
          multiline
          value={question}
          onChangeText={setQuestion}
        />

        <Text style={styles.label}>Back (Answer / Definition)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter answer..."
          placeholderTextColor="#888"
          multiline
          value={answer}
          onChangeText={setAnswer}
        />

        <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
          <Text style={styles.buttonText}>+ Add Flashcard to List</Text>
        </TouchableOpacity>
      </View>

      {/* Added Cards Preview */}
      <Text style={styles.sectionTitle}>
        Flashcards in Deck ({cards.length})
      </Text>
      {cards.map((card, index) => (
        <View key={card.id} style={styles.cardPreview}>
          <Text style={styles.cardText}>
            <Text style={{ fontWeight: "bold" }}>#{index + 1} Q:</Text>{" "}
            {card.question}
          </Text>
          <Text style={styles.cardText}>
            <Text style={{ fontWeight: "bold" }}>A:</Text> {card.answer}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#0d1527", // Matches dark background theme
      },
      content: {
        padding: 20,
      },
      header: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 20,
      },
      sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#fff",
        marginVertical: 10,
      },
      label: {
        fontSize: 14,
        color: "#aaa",
        marginBottom: 6,
      },
      input: {
        backgroundColor: "#1b263b",
        color: "#fff",
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#334155",
      },
      textArea: {
        minHeight: 70,
      },
      cardForm: {
        backgroundColor: "#162032",
        padding: 16,
        borderRadius: 10,
        marginBottom: 20,
      },
      addButton: {
        backgroundColor: "#007AFF",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 8,
      },
      buttonText: {
        color: "#fff",
        fontWeight: "bold",
      },
      cardPreview: {
        backgroundColor: "#1b263b",
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        borderLeftWidth: 4,
        borderLeftColor: "#007AFF",
      },
      cardText: {
        color: "#fff",
        fontSize: 14,
        marginBottom: 4,
      },
    });

