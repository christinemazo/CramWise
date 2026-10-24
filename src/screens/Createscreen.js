// CREATE SCREEN: make decks, add cards, delete them (all saved)

import { useState } from "react";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { getColors, getStyles } from "../../styles";
import FlashCard from "../components/Flashcard";
import { useDecks } from "../contexts/Deckcontext";

export default function CreateScreen({ isDark }) {
  const styles = getStyles(isDark);
  const colors = getColors(isDark);
  const { decks, addDeck, deleteDeck, addCard, deleteCard } = useDecks();

  const [deckTitle, setDeckTitle] = useState("");
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  // Selected deck (falls back to the first deck)
  const [selectedId, setSelectedId] = useState(null);
  const selectedDeck = decks.find((d) => d.id === selectedId) || decks[0];

  const handleCreateDeck = () => {
    if (!deckTitle.trim()) return;
    setSelectedId(addDeck(deckTitle.trim()));
    setDeckTitle("");
  };

  const handleAddCard = () => {
    if (!selectedDeck || !front.trim() || !back.trim()) return;
    addCard(selectedDeck.id, front.trim(), back.trim());
    setFront("");
    setBack("");
  };

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Create New Deck</Text>
      <Text style={styles.subtitle}>Add cards to your deck</Text>

      {/* New deck */}
      <Text style={styles.label}>Deck Title</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Mobile Programming"
        placeholderTextColor={colors.subtle}
        value={deckTitle}
        onChangeText={setDeckTitle}
      />
      <TouchableOpacity
        style={[styles.button, styles.buttonSpaced]}
        onPress={handleCreateDeck}
      >
        <Text style={styles.buttonText}>Create Deck</Text>
      </TouchableOpacity>

      {/* Deck list: tap one to add cards to it */}
      {decks.map((deck) => (
        <TouchableOpacity
          key={deck.id}
          style={[
            styles.deckRow,
            deck.id === selectedDeck.id && styles.deckRowActive,
          ]}
          onPress={() => setSelectedId(deck.id)}
        >
          <Text style={styles.deckRowTitle}>{deck.title}</Text>
          <Text style={styles.deckRowCount}>{deck.cards.length} cards</Text>
        </TouchableOpacity>
      ))}

      {/* Add flashcard form */}
      <View style={[styles.card, { marginTop: 14 }]}>
        <Text style={styles.cardTitle}>
          {selectedDeck
            ? `Add Card to "${selectedDeck.title}"`
            : "Add Flashcard"}
        </Text>

        <Text style={styles.label}>Front (Question / Term)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter question..."
          placeholderTextColor={colors.subtle}
          value={front}
          onChangeText={setFront}
          multiline
        />

        <Text style={styles.label}>Back (Answer / Definition)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter answer..."
          placeholderTextColor={colors.subtle}
          value={back}
          onChangeText={setBack}
          multiline
        />

        <TouchableOpacity style={styles.button} onPress={handleAddCard}>
          <Text style={styles.buttonText}>Add Card</Text>
        </TouchableOpacity>
      </View>

      {/* Cards of the selected deck */}
      {selectedDeck && (
        <>
          <View style={styles.deckHeader}>
            <Text style={styles.sectionTitle}>{selectedDeck.title}</Text>
            <TouchableOpacity onPress={() => deleteDeck(selectedDeck.id)}>
              <Text style={styles.deleteText}>Delete deck</Text>
            </TouchableOpacity>
          </View>

          {selectedDeck.cards.map((card) => (
            <FlashCard
              key={card.id}
              question={card.front}
              answer={card.back}
              isDark={isDark}
              onDelete={() => deleteCard(selectedDeck.id, card.id)}
            />
          ))}
        </>
      )}
    </ScrollView>
  );
}
