// PROGRESS SCREEN: view saved scores and tap an attempt to review cards

import { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getStyles } from "../../styles";
import { useDecks } from "../contexts/Deckcontext";

export default function ProgressScreen({ isDark }) {
  const baseStyles = getStyles(isDark);
  const { scores, average } = useDecks();
  const [selected, setSelected] = useState(null);

  const cardBg = isDark ? "#132238" : "#FFFFFF";
  const cardBorder = isDark ? "#233652" : "#E2E8F0";
  const titleColor = isDark ? "#F8FAFC" : "#0F172A";
  const metaColor = isDark ? "#94A3B8" : "#64748B";
  const trackBg = isDark ? "#24344D" : "#E2E8F0";

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={baseStyles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={baseStyles.title}>Progress</Text>
        <Text style={baseStyles.subtitle}>Your average is {average}%</Text>

        {scores.length === 0 && (
          <View
            style={[
              localStyles.card,
              { backgroundColor: cardBg, borderColor: cardBorder },
            ]}
          >
            <Text style={[localStyles.cardTitle, { color: titleColor }]}>
              No quizzes taken yet
            </Text>
            <Text style={[localStyles.cardMeta, { color: metaColor }]}>
              Finish a quiz in the Quiz tab to see your results here.
            </Text>
          </View>
        )}

        {scores.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              localStyles.card,
              { backgroundColor: cardBg, borderColor: cardBorder },
            ]}
            activeOpacity={0.85}
            onPress={() => setSelected(item)}
          >
            <View style={localStyles.rowTop}>
              <View>
                <Text style={[localStyles.cardTitle, { color: titleColor }]}>
                  {item.title}
                </Text>
                <Text style={[localStyles.cardMeta, { color: metaColor }]}>
                  {item.date} · Tap to review
                </Text>
              </View>
              <Text style={localStyles.scoreText}>{item.score}%</Text>
            </View>

            <View style={[localStyles.track, { backgroundColor: trackBg }]}>
              <View
                style={[localStyles.fill, { width: `${item.score}%` }]}
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        visible={!!selected}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelected(null)}
      >
        <View style={localStyles.modalBackdrop}>
          <View
            style={[
              localStyles.modalSheet,
              { backgroundColor: isDark ? "#0F172A" : "#FFFFFF" },
            ]}
          >
            <View style={localStyles.rowTop}>
              <View>
                <Text style={[baseStyles.title, { marginBottom: 2 }]}>
                  {selected?.title}
                </Text>
                <Text style={[baseStyles.subtitle, { marginBottom: 0 }]}>
                  {selected?.date} · {selected?.score}%
                </Text>
              </View>
              <TouchableOpacity onPress={() => setSelected(null)}>
                <Text style={localStyles.scoreText}>Close</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              style={{ marginTop: 16 }}
              showsVerticalScrollIndicator={false}
            >
              {selected?.items?.length > 0 ? (
                selected.items.map((cardItem, idx) => (
                  <View
                    key={`${cardItem.id}-${idx}`}
                    style={[
                      localStyles.card,
                      { backgroundColor: cardBg, borderColor: cardBorder },
                    ]}
                  >
                    <Text
                      style={[localStyles.cardTitle, { color: titleColor }]}
                    >
                      {idx + 1}. {cardItem.front}
                    </Text>
                    <Text style={[localStyles.cardMeta, { color: metaColor }]}>
                      Answer: {cardItem.back}
                    </Text>
                    <Text
                      style={[
                        localStyles.cardMeta,
                        {
                          marginTop: 8,
                          fontSize: 13,
                          fontWeight: "700",
                          color: cardItem.gotIt ? "#22C55E" : "#EF4444",
                        },
                      ]}
                    >
                      {cardItem.gotIt ? "Got it" : "Missed it"}
                    </Text>
                  </View>
                ))
              ) : (
                <View
                  style={[
                    localStyles.card,
                    { backgroundColor: cardBg, borderColor: cardBorder },
                  ]}
                >
                  <Text style={[localStyles.cardMeta, { color: metaColor }]}>
                    Card details weren't saved for this older quiz attempt.
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const localStyles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
  },
  rowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  cardMeta: {
    fontSize: 12,
    marginTop: 3,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1D9BF0",
  },
  track: {
    height: 7,
    borderRadius: 999,
    overflow: "hidden",
    marginTop: 14,
  },
  fill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#1D9BF0",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-end",
  },
  modalSheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
});