// FLASH CARD: tap to flip between question and answer

// Icons from Expo (used for the trash icon)
import { Ionicons } from "@expo/vector-icons";
// useState lets the card remember which side is showing
import { useState } from "react";
// Building blocks: text, pressable area, box
import { Text, TouchableOpacity, View } from "react-native";
// Functions that give the colors and styles for dark or light mode
import { getColors, getStyles } from "../../styles";

// question = front text, answer = back text,
// onDelete = optional function (shows a trash icon when given)
export default function FlashCard({ question, answer, isDark, onDelete }) {
  // Styles and colors that match the current mode
  const styles = getStyles(isDark);
  const colors = getColors(isDark);

  // false = showing the question, true = showing the answer
  const [flashed, setFlashed] = useState(false);

  return (
    // The whole card is pressable: each tap flips it
    <TouchableOpacity
      style={[styles.flashCard, flashed && styles.flashCardBack]}
      activeOpacity={0.9}
      onPress={() => setFlashed(!flashed)}
    >
      {/* Top row: side label + optional delete icon */}
      <View style={styles.flashTop}>
        {/* Shows which side is showing */}
        <Text style={styles.flashSide}>{flashed ? "ANSWER" : "QUESTION"}</Text>
        {/* Trash icon appears only when onDelete is given */}
        {onDelete && (
          <TouchableOpacity onPress={onDelete} hitSlop={10}>
            <Ionicons name="trash-outline" size={18} color={colors.muted} />
          </TouchableOpacity>
        )}
      </View>

      {/* The answer or the question */}
      <Text style={styles.flashText}>{flashed ? answer : question}</Text>

      {/* Hint that tells the user what a tap does */}
      <Text style={styles.flashHint}>
        {flashed ? "Tap to see the question" : "Tap to see the answer"}
      </Text>
    </TouchableOpacity>
  );
}
