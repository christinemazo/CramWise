import { StyleSheet } from "react-native";

// COLORS
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

  app: { flex: 1, backgroundColor: colors.background }, // whole app
  screen: { flex: 1 }, // area above the tab bar
  content: { paddingHorizontal: 20, paddingTop: 48, paddingBottom: 40 }, // spacing inside each screen

  // TEXT: titles, subtitles and labels

  title: { fontSize: 30, fontWeight: "800", color: colors.text }, // big screen title
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
  label: { fontSize: 13, color: colors.muted, marginBottom: 6 }, // text above a field

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
  cardBody: { fontSize: 14, lineHeight: 20, color: colors.muted }, // paragraph inside a card

  // PROGRESS BAR: used on Home and Progress

  progressTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }, // label on the left, percent on the right
  progressPercent: { fontSize: 25, fontWeight: "700", color: colors.accent }, // big % number
  barBackground: {
    height: 9,
    backgroundColor: colors.border,
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 16,
  }, // empty bar
  barFill: { height: "100%", backgroundColor: colors.accent, borderRadius: 10 }, // filled part (width is set in app.js)

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

  // CREATE FORM: the static fields and button on the Create screen

  input: {
    backgroundColor: colors.background,
    color: colors.text,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  }, // box that looks like a text field
  textArea: { minHeight: 70 }, // taller box for question and answer
  fieldText: { color: colors.subtle }, // placeholder-style text in the static fields
  button: {
    backgroundColor: colors.accent,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  }, // "+ Add Flashcard" button
  buttonText: { color: "#FFFFFF", fontWeight: "700" }, // text inside the button
  cardPreview: {
    backgroundColor: colors.card,
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
    borderWidth: 1,
    borderColor: colors.border,
  }, // one added flashcard in a list (not used right now)
  cardText: { color: colors.text, fontSize: 14, marginBottom: 4 }, // question / answer text (not used right now)
  bold: { fontWeight: "700", color: colors.accent }, // "Q:" and "A:" labels (not used right now)

  // FLASH CARDS: tap to flip between question and answer

  flashCard: {
    minHeight: 150,
    backgroundColor: colors.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    marginBottom: 14,
    justifyContent: "space-between",
  }, // card showing the question
  flashCardBack: { backgroundColor: "#12395F", borderColor: colors.accent }, // blue tint when showing the answer
  flashSide: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    color: colors.accent,
  }, // "QUESTION" / "ANSWER" label
  flashText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
    marginVertical: 14,
  }, // text on the card
  flashHint: { fontSize: 12, color: colors.subtle, textAlign: "center" }, // "Tap to flip"

  // TAB BAR: bottom navigation

  tabBar: {
    flexDirection: "row",
    height: 70,
    paddingVertical: 8,
    backgroundColor: "#0F172A",
    borderTopWidth: 1,
    borderTopColor: "#1E293B",
  }, // the bar itself
  tab: { flex: 1, alignItems: "center", justifyContent: "center" }, // one tab button
  tabLabel: { fontSize: 11, marginTop: 2 }, // text under each tab icon
});
