import { StyleSheet } from "react-native";

// COLORS
// One set for dark mode and one for light mode.

export const darkColors = {
  background: "#0F1629", // screen background (dark navy)
  card: "#17263A", // cards, rows and the tab bar
  border: "#25364D", // card borders and bar background
  text: "#F8FAFC", // main text (almost white)
  muted: "#94A3B8", // secondary text (light gray-blue)
  subtle: "#78879B", // small hints and placeholders
  accent: "#208AEF", // blue used for buttons, bars and scores
  input: "#0F1629", // background of the fields
  flashBack: "#12395F", // flash card color when showing the answer
  tabInactive: "#94A3B8", // tab icon color when not selected
};

export const lightColors = {
  background: "#F8FAFC", // screen background (very light gray)
  card: "#FFFFFF", // cards, rows and the tab bar
  border: "#E2E8F0", // card borders and bar background
  text: "#0F172A", // main text (almost black)
  muted: "#64748B", // secondary text (gray)
  subtle: "#94A3B8", // small hints and placeholders
  accent: "#208AEF", // blue used for buttons, bars and scores
  input: "#F1F5F9", // background of the fields
  flashBack: "#DBEAFE", // flash card color when showing the answer
  tabInactive: "#94A3B8", // tab icon color when not selected
};

// Gives back the color set that matches the current mode.
export function getColors(isDark) {
  return isDark ? darkColors : lightColors;
}

// Gives back all the styles for the current mode.
// In app.js:  const styles = getStyles(isDark);
export function getStyles(isDark) {
  const colors = getColors(isDark);

  return StyleSheet.create({
    // LAYOUT: overall structure of the app

    app: { flex: 1, backgroundColor: colors.background }, // whole app
    screen: { flex: 1 }, // area above the tab bar
    content: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 }, // spacing inside each screen
    settingsRow: { alignItems: "flex-end" }, // puts the settings icon on the right
    settingsButton: { padding: 8 }, // tap area around the settings icon

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
      color: colors.text,
      marginTop: 8,
      marginBottom: 12,
    }, // heading for a section
    label: { fontSize: 13, color: colors.text, marginBottom: 6 }, // text above a field

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
    barFill: {
      height: "100%",
      backgroundColor: colors.accent,
      borderRadius: 10,
    }, // filled part (width is set in app.js)

    // CREATE FORM: the static fields and button on the Create screen

    input: {
      backgroundColor: colors.input,
      color: colors.text,
      borderRadius: 12,
      padding: 12,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
    }, // box that looks like a text field
    textArea: { minHeight: 70, textAlignVertical: "top" }, // taller box for question and answer
    fieldText: { color: colors.subtle }, // placeholder-style text in the static fields
    button: {
      backgroundColor: colors.accent,
      padding: 12,
      borderRadius: 12,
      alignItems: "center",
      marginTop: 8,
    }, // blue button
    buttonText: { color: "#FFFFFF", fontWeight: "700" }, // text inside the button

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
    flashCardBack: {
      backgroundColor: colors.flashBack,
      borderColor: colors.accent,
    }, // tint when showing the answer
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
    flashHint: { fontSize: 12, color: colors.subtle, textAlign: "center" }, // "Tap to see the ..." hint

    // TAB BAR: bottom navigation

    tabBar: {
      flexDirection: "row",
      height: 70,
      paddingVertical: 8,
      backgroundColor: colors.card,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    }, // the bar itself
    tab: { flex: 1, alignItems: "center", justifyContent: "center" }, // one tab button
    tabLabel: { fontSize: 11, marginTop: 2 }, // text under each tab icon

    // SETTINGS POP-UP

    modalBackdrop: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.6)",
      justifyContent: "center",
      padding: 20,
    }, // dark layer behind the pop-up
    modalCard: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 24,
    }, // the pop-up box
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    // title on the left, close icon on the right
    modalTitle: { fontSize: 20, fontWeight: "700", color: colors.text }, // "Settings"
    settingRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 12,
    }, // one setting: label on the left, switch on the right
    settingLabel: { color: colors.text, fontWeight: "600" }, // setting name
    aboutBox: {
      backgroundColor: colors.input,
      borderRadius: 12,
      padding: 16,
      marginTop: 12,
    }, // "About CramWise" box
    aboutTitle: { fontWeight: "700", color: colors.text, marginBottom: 6 }, // heading inside the About box
    aboutBody: { color: colors.muted, fontSize: 13, lineHeight: 20 }, // paragraph inside the About box
    closeButton: { marginTop: 20 }, // extra space above the Close button

    // NEW: CREATE SCREEN (real inputs, deck picker, delete)

    buttonSpaced: { marginTop: 0, marginBottom: 24 }, // Create Deck button spacing
    deckHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    }, // deck name on the left, delete on the right
    deleteText: { color: "#EF4444", fontWeight: "600" }, // red "Delete deck"
    flashTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    }, // QUESTION label + trash icon

    // NEW: HOME deck list

    deckRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: colors.card,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 16,
      marginBottom: 10,
    }, // one deck on Home
    deckRowActive: { borderColor: colors.accent }, // selected deck
    deckRowTitle: { color: colors.text, fontWeight: "700", fontSize: 15 }, // deck name
    deckRowCount: { color: colors.muted, fontSize: 13 }, // "5 cards"
  });
}
