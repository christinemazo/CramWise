// FLASH CARD: tap to flip between question and answer

import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { getColors, getStyles } from "../../styles";

export default function FlashCard({ question, answer, isDark, onDelete }) {
  const styles = getStyles(isDark);
  const colors = getColors(isDark);

  // false = showing the question, true = showing the answer
  const [flashed, setFlashed] = useState(false);

  return (
    <TouchableOpacity
      style={[styles.flashCard, flashed && styles.flashCardBack]}
      activeOpacity={0.9}
      onPress={() => setFlashed(!flashed)}
    >
      {/* Top row: side label + optional delete icon */}
      <View style={styles.flashTop}>
        <Text style={styles.flashSide}>{flashed ? "ANSWER" : "QUESTION"}</Text>
        {onDelete && (
          <TouchableOpacity onPress={onDelete} hitSlop={10}>
            <Ionicons name="trash-outline" size={18} color={colors.muted} />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.flashText}>{flashed ? answer : question}</Text>

      <Text style={styles.flashHint}>
        {flashed ? "Tap to see the question" : "Tap to see the answer"}
      </Text>
    </TouchableOpacity>
  );
}
