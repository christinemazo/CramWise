// CREATE SCREEN: make decks, add cards, delete them (all saved)

// useState lets the screen remember what the user types and which deck is selected
import { useState } from "react";
// Building blocks: scrollable screen, text, typing box, pressable button, box
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// Functions that give the colors and styles for dark or light mode
import { getColors, getStyles } from "../../styles";
// The flip card used to show each card of the selected deck
import FlashCard from "../components/Flashcard";
// Gives access to the shared data and actions
import { useDecks } from "../contexts/Deckcontext";

export default function CreateScreen({ isDark }) {
  // Styles and colors that match the current mode
  const styles = getStyles(isDark);
  const colors = getColors(isDark);
  // The decks and the actions from the shared data
  const { decks, addDeck, deleteDeck, addCard, deleteCard } = useDecks();

  // What the user is typing: new deck title, front and back of a new card
  const [deckTitle, setDeckTitle] = useState("");
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  // Selected deck (falls back to the first deck)
  const [selectedId, setSelectedId] = useState(null);
  const selectedDeck = decks.find((d) => d.id === selectedId) || decks[0];

  // Runs when "Create Deck" is pressed
  const handleCreateDeck = () => {
    // Do nothing if the title is empty
    if (!deckTitle.trim()) return;
    // Create the deck and select it right away
    setSelectedId(addDeck(deckTitle.trim()));
    // Clear the input box
    setDeckTitle("");
  };

  // Runs when "Add Card" is pressed
  const handleAddCard = () => {
    // Do nothing if there is no deck or the front/back is empty
    if (!selectedDeck || !front.trim() || !back.trim()) return;
    // Add the card to the selected deck
    addCard(selectedDeck.id, front.trim(), back.trim());
    // Clear both input boxes
    setFront("");
    setBack("");
  };

  return (
    // Scrollable screen (keyboardShouldPersistTaps lets buttons work with one tap)
    <ScrollView
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      {/* Title and subtitle */}
      <Text style={styles.title}>Create New Deck</Text>
      <Text style={styles.subtitle}>Add cards to your deck</Text>

      {/* New deck: title input */}
      <Text style={styles.label}>Deck Title</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Mobile Programming"
        placeholderTextColor={colors.subtle}
        value={deckTitle}
        onChangeText={setDeckTitle}
      />
      {/* New deck: create button */}
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
          // The selected deck gets a blue border
          style={[
            styles.deckRow,
            deck.id === selectedDeck.id && styles.deckRowActive,
          ]}
          onPress={() => setSelectedId(deck.id)}
        >
          {/* Deck name and number of cards */}
          <Text style={styles.deckRowTitle}>{deck.title}</Text>
          <Text style={styles.deckRowCount}>{deck.cards.length} cards</Text>
        </TouchableOpacity>
      ))}

      {/* Add flashcard form */}
      <View style={[styles.card, { marginTop: 14 }]}>
        {/* Heading shows which deck the card will go into */}
        <Text style={styles.cardTitle}>
          {selectedDeck
            ? `Add Card to "${selectedDeck.title}"`
            : "Add Flashcard"}
        </Text>

        {/* Front of the card */}
        <Text style={styles.label}>Front (Question / Term)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter question..."
          placeholderTextColor={colors.subtle}
          value={front}
          onChangeText={setFront}
          multiline
        />

        {/* Back of the card */}
        <Text style={styles.label}>Back (Answer / Definition)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter answer..."
          placeholderTextColor={colors.subtle}
          value={back}
          onChangeText={setBack}
          multiline
        />

        {/* Add card button */}
        <TouchableOpacity style={styles.button} onPress={handleAddCard}>
          <Text style={styles.buttonText}>Add Card</Text>
        </TouchableOpacity>
      </View>

      {/* Cards of the selected deck (only if a deck exists) */}
      {selectedDeck && (
        <>
          {/* Deck name on the left, delete button on the right */}
          <View style={styles.deckHeader}>
            <Text style={styles.sectionTitle}>{selectedDeck.title}</Text>
            <TouchableOpacity onPress={() => deleteDeck(selectedDeck.id)}>
              <Text style={styles.deleteText}>Delete deck</Text>
            </TouchableOpacity>
          </View>

          {/* One flip card for each card in the deck */}
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
