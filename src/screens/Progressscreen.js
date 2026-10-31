// PROGRESS SCREEN: add your quiz scores (like 12/15), see your average, remove scores

import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getColors, getStyles } from "../../styles";
import { useDecks } from "../contexts/Deckcontext";

export default function ProgressScreen({ isDark }) {
  const styles = getStyles(isDark);
  const colors = getColors(isDark);
  const { scores, average, addScore, deleteScore } = useDecks();

  // What the user is typing
  const [subject, setSubject] = useState("");
  const [score, setScore] = useState(""); // the score you got, like 12
  const [outOf, setOutOf] = useState(""); // the total, like 15

  // Message shown when the input is not valid
  const [error, setError] = useState("");

  // Runs when "Add Score" is pressed
  const handleAddScore = () => {
    const got = Number(score);
    const total = Number(outOf);

    // Need a subject, and a score that is not bigger than the total
    if (
      !subject.trim() ||
      score.trim() === "" ||
      outOf.trim() === "" ||
      isNaN(got) ||
      isNaN(total) ||
      total <= 0 ||
      got < 0 ||
      got > total
    ) {
      setError("Enter a subject and a score like 12 out of 15.");
      return;
    }

    addScore(subject.trim(), got, total);
    setSubject("");
    setScore("");
    setOutOf("");
    setError("");
  };

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Progress</Text>
      <Text style={styles.subtitle}>Your average is {average}%</Text>

      {/* Add a score */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Add Quiz Score</Text>

        <Text style={styles.label}>Subject</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Mobile Programming"
          placeholderTextColor={colors.subtle}
          value={subject}
          onChangeText={setSubject}
        />

        {/* Score and total side by side: 12 / 15 */}
        <View style={styles.inputRow}>
          <View style={styles.inputHalf}>
            <Text style={styles.label}>Your score</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 12"
              placeholderTextColor={colors.subtle}
              keyboardType="numeric"
              value={score}
              onChangeText={setScore}
            />
          </View>

          <View style={styles.inputHalf}>
            <Text style={styles.label}>Out of</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 15"
              placeholderTextColor={colors.subtle}
              keyboardType="numeric"
              value={outOf}
              onChangeText={setOutOf}
            />
          </View>
        </View>

        {error !== "" && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleAddScore}>
          <Text style={styles.buttonText}>Add Score</Text>
        </TouchableOpacity>
      </View>

      {/* Saved scores */}
      <Text style={styles.sectionTitle}>Your Scores</Text>

      {scores.length === 0 && (
        <View style={styles.card}>
          <Text style={styles.cardBody}>
            No scores yet. Add your first quiz score above.
          </Text>
        </View>
      )}

      {scores.map((item) => (
        <View key={item.id} style={styles.card}>
          {/* Subject on the left, percent on the right */}
          <View style={styles.progressTop}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.progressPercent}>{item.score}%</Text>
          </View>

          <View style={styles.barBackground}>
            <View style={[styles.barFill, { width: `${item.score}%` }]} />
          </View>

          {/* Points (12/15) and date on the left, remove button on the right */}
          <View style={styles.scoreFooter}>
            <Text style={styles.cardBody}>
              {item.points ? `${item.points}  •  ${item.date}` : item.date}
            </Text>
            <TouchableOpacity onPress={() => deleteScore(item.id)} hitSlop={10}>
              <Ionicons name="trash-outline" size={18} color={colors.muted} />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
