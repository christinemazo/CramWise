// STYLES: all colors and styles of the app, for dark and light mode

// StyleSheet is the React Native tool for creating styles (like CSS)
import { StyleSheet } from "react-native";

// COLORS
// One set for dark mode and one for light mode.
// Both sets use the same names, so the screens never need to know the mode.

// Colors used in dark mode
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
  panel: "#132238", // Progress screen cards
  panelBorder: "#233652", // border of the Progress screen cards
  track: "#24344D", // empty part of the bar on the Progress hero card
  danger: "#EF4444", // red (delete, missed)
  success: "#22C55E", // green (got it)
};

// Colors used in light mode
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
  panel: "#FFFFFF", // Progress screen cards
  panelBorder: "#E2E8F0", // border of the Progress screen cards
  track: "#E2E8F0", // empty part of the bar on the Progress hero card
  danger: "#EF4444", // red (delete, missed)
  success: "#22C55E", // green (got it)
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

    // CARDS: rounded boxes used on Home, Create and Quiz

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

    // PROGRESS BAR: used on Home and Quiz (progressTop is also used on Progress)

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
    }, // filled part (width is set in the screen)

    // FORM AND BUTTONS: inputs and buttons used on the Create and Quiz screens

    input: {
      backgroundColor: colors.input,
      color: colors.text,
      borderRadius: 12,
      padding: 12,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
    }, // typing box
    textArea: { minHeight: 70, textAlignVertical: "top" }, // taller box for question and answer
    fieldText: { color: colors.subtle }, // placeholder-style text (not used by any screen now)
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
    }, // title on the left, close icon on the right
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

    // QUIZ

    buttonRow: { flexDirection: "row", gap: 12, marginTop: 8 }, // two buttons side by side
    buttonFlex: { flex: 1, marginTop: 0 }, // each button takes half the row
    buttonGood: { backgroundColor: "#22C55E" }, // green "Got it"
    buttonBad: { backgroundColor: "#EF4444" }, // red "Missed it"
    buttonGray: { backgroundColor: colors.muted }, // neutral button
    resultScore: {
      fontSize: 56,
      fontWeight: "800",
      color: colors.accent,
      textAlign: "center",
    }, // big % on the result screen
    centerText: { textAlign: "center" }, // centered text

    // CREATE SCREEN EXTRAS: spacing, deck header, delete text, flashcard top row

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

    // DECK ROWS: one row per deck on the Create and Quiz screens

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
    }, // one deck row
    deckRowActive: { borderColor: colors.accent }, // selected deck
    deckRowTitle: { color: colors.text, fontWeight: "700", fontSize: 15 }, // deck name
    deckRowCount: { color: colors.muted, fontSize: 13 }, // "5 cards"

    // PROGRESS SCREEN: average card, score cards and quiz details

    heroCard: {
      backgroundColor: colors.panel,
      borderColor: colors.panelBorder,
      borderRadius: 18,
      borderWidth: 1.5,
      paddingVertical: 24,
      paddingHorizontal: 20,
      marginBottom: 18,
    }, // "Average score" card at the top
    heroTitle: { fontSize: 18, fontWeight: "800", color: colors.text }, // "Average score" label
    heroPercent: { fontSize: 24, fontWeight: "900", color: colors.accent }, // big average %
    heroBar: {
      height: 11,
      backgroundColor: colors.track,
      borderRadius: 999,
      overflow: "hidden",
      marginTop: 16,
    }, // empty bar inside the average card
    heroBarFill: {
      height: "100%",
      backgroundColor: colors.accent,
      borderRadius: 999,
    }, // filled part (width is set in the screen)
    recentSection: { marginTop: 4 }, // wraps the "Latest Scores" list
    recentHeaderRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    }, // row that holds the "Latest Scores" heading
    sectionHeading: { fontSize: 18, fontWeight: "800", color: colors.text }, // "Latest Scores"
    scoreCard: {
      backgroundColor: colors.panel,
      borderColor: colors.panelBorder,
      borderRadius: 14,
      borderWidth: 1,
      paddingVertical: 14,
      paddingHorizontal: 16,
      marginBottom: 10,
    }, // one tappable quiz in the list
    scoreRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    }, // quiz name on the left, percent on the right
    scoreValue: { fontSize: 18, fontWeight: "700", color: colors.accent }, // percent in a score card
    panelCard: {
      backgroundColor: colors.panel,
      borderColor: colors.panelBorder,
      borderRadius: 16,
      borderWidth: 1,
      padding: 18,
      marginBottom: 14,
    }, // message card and answer cards on Progress
    panelTitle: { fontSize: 16, fontWeight: "700", color: colors.text }, // title in those cards, and quiz name
    panelMeta: { fontSize: 12, marginTop: 5, color: colors.muted }, // small gray text (date, answer)
    panelStatus: { fontSize: 13, fontWeight: "700", marginTop: 8 }, // "Got it" / "Missed it" text
    statusGood: { color: colors.success }, // green "Got it"
    statusBad: { color: colors.danger }, // red "Missed it"
    detailHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    }, // back button on the left, delete icon on the right
    backButton: { flexDirection: "row", alignItems: "center", gap: 2 }, // arrow + "Back to Progress"
    backText: { fontSize: 15, fontWeight: "700", color: colors.accent }, // "Back to Progress"
    deleteButton: { padding: 2 }, // tap area around the delete icon
    detailSubtitle: {
      fontSize: 13,
      marginTop: 5,
      marginBottom: 12,
      color: colors.muted,
    }, // "Completed Today · Score: 80%"
  });
}
