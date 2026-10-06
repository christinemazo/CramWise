import { StyleSheet } from "react-native";

// Change a color here and it updates everywhere in the app.

export const colors = {
  background: "#0F1629", // screen background (dark navy)
  card: "#17263A", // cards and rows
  border: "#25364D", // card borders and bar background
  text: "#F8FAFC", // main text (almost white)
  muted: "#94A3B8", // secondary text (light gray-blue)
  subtle: "#78879B", // small hints and placeholders
  accent: "#208AEF", // blue used for buttons, bars and scores
};

export const styles = StyleSheet.create({
  // LAYOUT: overall structure of the app

  app: { flex: 1, backgroundColor: colors.background },
  screen: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 48, paddingBottom: 40 },

  // TEXT: titles, subtitles and labels

  title: { fontSize: 30, fontWeight: "800", color: colors.text },
  subtitle: {
    fontSize: 14,
    color: colors.muted,
    marginTop: 2,
    marginBottom: 24,
  }, // small line under the title
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: 8,
    marginBottom: 12,
  }, // heading for a section
  label: { fontSize: 13, color: colors.muted, marginBottom: 6 },

  // CARDS: rounded boxes used on Home, Create and Progress

  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    marginBottom: 24,
  }, // main card box
  cardIcon: { fontSize: 28, marginBottom: 12 }, // emoji on the Home card
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 6,
  }, // title inside a card
  cardBody: { fontSize: 14, lineHeight: 20, color: colors.muted },

  // PROGRESS BAR: used on Home and Progress

  progressTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }, // label on the left, percent on the right
  progressPercent: { fontSize: 25, fontWeight: "700", color: colors.accent },
  barBackground: {
    height: 9,
    backgroundColor: colors.border,
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 16,
  }, // empty bar
  barFill: { height: "100%", backgroundColor: colors.accent, borderRadius: 10 },

  // SCORE ROWS: list on the Progress screen

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 10,
  }, // one score row
  rowTitle: { fontSize: 15, fontWeight: "700", color: colors.text }, // subject name
  rowDate: { fontSize: 12, color: colors.subtle, marginTop: 4 }, // date under the name
  rowScore: { fontSize: 15, fontWeight: "700", color: colors.accent }, // score on the right

  // CREATE FORM: inputs, button and card list

  input: {
    backgroundColor: colors.background,
    color: colors.text,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  }, // text field
  textArea: { minHeight: 70, textAlignVertical: "top" },
  button: {
    backgroundColor: colors.accent,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  }, // "+ Add Flashcard" button
  buttonText: { color: "#FFFFFF", fontWeight: "700" },
  cardPreview: {
    backgroundColor: colors.card,
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
    borderWidth: 1,
    borderColor: colors.border,
  }, // one added flashcard in the list
  cardText: { color: colors.text, fontSize: 14, marginBottom: 4 },
  bold: { fontWeight: "700", color: colors.accent },

  // TAB BAR: bottom navigation

  tabBar: {
    flexDirection: "row",
    height: 70,
    paddingVertical: 8,
    backgroundColor: "#0F172A",
    borderTopWidth: 1,
    borderTopColor: "#1E293B",
  }, // the bar itself
  tab: { flex: 1, alignItems: "center", justifyContent: "center" },
  tabLabel: { fontSize: 11, marginTop: 2 },
});
