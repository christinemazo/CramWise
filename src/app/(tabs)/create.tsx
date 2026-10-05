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
        placeholderTextColor="#78879B"
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
          placeholderTextColor="#78879B"
          multiline
          value={question}
          onChangeText={setQuestion}
        />

        <Text style={styles.label}>Back (Answer / Definition)</Text>

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter answer..."
          placeholderTextColor="#78879B"
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
    backgroundColor: "#0F1629",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 110,
  },

  header: {
    fontSize: 30,
    fontWeight: "800",
    color: "#F8FAFC",
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginVertical: 10,
  },

  label: {
    fontSize: 13,
    color: "#94A3B8",
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#0F1629",
    color: "#F8FAFC",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#25364D",
  },

  textArea: {
    minHeight: 70,
    textAlignVertical: "top",
  },

  cardForm: {
    backgroundColor: "#17263A",
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#25364D",
    marginBottom: 24,
  },

  addButton: {
    backgroundColor: "#208AEF",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  cardPreview: {
    backgroundColor: "#17263A",
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#208AEF",
    borderWidth: 1,
    borderColor: "#25364D",
  },

  cardText: {
    color: "#F8FAFC",
    fontSize: 14,
    marginBottom: 4,
  },

  bold: {
    fontWeight: "700",
    color: "#208AEF",
  },
});
