import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Flashcard = {
  id: string;
  question: string;
  answer: string;
};

export default function Create() {
  const [deckTitle, setDeckTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [cards, setCards] = useState<Flashcard[]>([]);

  const handleAddCard = () => {
    if (!question.trim() || !answer.trim()) {
      return;
    }

    const newCard: Flashcard = {
      id: Date.now().toString(),
      question: question.trim(),
      answer: answer.trim(),
    };

    setCards((currentCards) => [...currentCards, newCard]);

    setQuestion("");
    setAnswer("");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.header}>Create New Deck</Text>

      {/* Deck Title */}
      <Text style={styles.label}>Deck Title</Text>

      <TextInput
        style={styles.input}
        placeholder="e.g., Biology 101"
        placeholderTextColor="#888"
        value={deckTitle}
        onChangeText={setDeckTitle}
      />

      {/* Add Flashcard */}
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

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddCard}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>+ Add Flashcard to List</Text>
        </TouchableOpacity>
      </View>

      {/* Flashcard Preview */}
      <Text style={styles.sectionTitle}>
        Flashcards in Deck ({cards.length})
      </Text>

      {cards.map((card, index) => (
        <View key={card.id} style={styles.cardPreview}>
          <Text style={styles.cardText}>
            <Text style={styles.bold}>#{index + 1} Q:</Text> {card.question}
          </Text>

          <Text style={styles.cardText}>
            <Text style={styles.bold}>A:</Text> {card.answer}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginVertical: 10,
  },

  label: {
    fontSize: 14,
    color: "#AAAAAA",
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#1B263B",
    color: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },

  textArea: {
    minHeight: 70,
    textAlignVertical: "top",
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
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  cardPreview: {
    backgroundColor: "#1B263B",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
  },

  cardText: {
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 4,
  },

  bold: {
    fontWeight: "bold",
  },
});
