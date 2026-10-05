import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ThemeMode, useTheme } from "../contexts/ThemeContext";

// Dark palette matches the Home / Create / Progress screens.
const darkColors = {
  background: "#0F1629",
  card: "#17263A",
  border: "#25364D",
  iconBox: "#0F1629",
  text: "#F8FAFC",
  muted: "#94A3B8",
  subtle: "#78879B",
  accent: "#208AEF",
};

const lightColors = {
  background: "#F8FAFC",
  card: "#FFFFFF",
  border: "#E2E8F0",
  iconBox: "#EEF2F7",
  text: "#0F172A",
  muted: "#64748B",
  subtle: "#94A3B8",
  accent: "#208AEF",
};

type Colors = typeof darkColors;

const themeOptions: {
  label: string;
  value: ThemeMode;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { label: "Light Mode", value: "light", icon: "sunny-outline" },
  { label: "Dark Mode", value: "dark", icon: "moon-outline" },
];

export default function SettingsScreen() {
  const router = useRouter();
  const { theme, actualTheme, setTheme } = useTheme();
  const [showAbout, setShowAbout] = useState(false);

  const colors = actualTheme === "dark" ? darkColors : lightColors;
  const styles = useMemo(() => makeStyles(colors), [colors]);

  function showComingSoon() {
    Alert.alert("Coming soon", "Accounts aren't available yet.");
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable
            onPress={() =>
              router.canGoBack() ? router.back() : router.replace("/")
            }
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={10}
          >
            <Ionicons name="arrow-back" size={22} color={colors.accent} />
          </Pressable>

          <View>
            <Text style={styles.title}>Settings</Text>
            <Text style={styles.subtitle}>Manage your preferences</Text>
          </View>
        </View>

        {/* ACCOUNT */}
        <Text style={styles.sectionLabel}>Account</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Do you want to create an account?
          </Text>
          <Text style={styles.cardBody}>
            CramWise works without one. Sign up to back up your decks and sync
            them across devices.
          </Text>

          <Pressable
            onPress={showComingSoon}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.primaryButtonText}>Create an account</Text>
          </Pressable>

          <Pressable onPress={showComingSoon} style={styles.linkButton}>
            <Text style={styles.linkText}>I already have an account</Text>
          </Pressable>
        </View>

        {/* APPEARANCE */}
        <Text style={styles.sectionLabel}>Appearance</Text>

        <View style={styles.listCard}>
          {themeOptions.map((option, index) => {
            const isSelected = theme === option.value;

            return (
              <Pressable
                key={option.value}
                onPress={() => setTheme(option.value)}
                style={[
                  styles.row,
                  index === themeOptions.length - 1 && styles.lastRow,
                ]}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
              >
                <View style={styles.rowIcon}>
                  <Ionicons
                    name={option.icon}
                    size={18}
                    color={colors.accent}
                  />
                </View>

                <Text style={styles.rowLabel}>{option.label}</Text>

                <View
                  style={[styles.radio, isSelected && styles.radioSelected]}
                >
                  {isSelected && (
                    <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* ABOUT */}
        <Text style={styles.sectionLabel}>About</Text>

        <View style={styles.listCard}>
          <Pressable
            onPress={() => setShowAbout(true)}
            style={[styles.row, styles.lastRow]}
          >
            <View style={styles.rowIcon}>
              <Ionicons
                name="information-circle-outline"
                size={18}
                color={colors.accent}
              />
            </View>

            <Text style={styles.rowLabel}>About CramWise</Text>

            <Ionicons name="chevron-forward" size={18} color={colors.subtle} />
          </Pressable>
        </View>
      </ScrollView>

      {/* ABOUT MODAL */}
      <Modal
        visible={showAbout}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAbout(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>About CramWise</Text>

            <Text style={styles.modalBody}>
              CramWise is your smart study buddy that makes cramming less
              stressful. Create flashcards, take quick quizzes, and review
              smarter with spaced repetition to retain more in less time.
            </Text>

            <Text style={styles.modalVersion}>Version 1.0.0</Text>

            <Pressable
              onPress={() => setShowAbout(false)}
              style={({ pressed }) => [
                styles.modalButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.primaryButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function makeStyles(c: Colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: c.background,
    },
    content: {
      paddingHorizontal: 20,
      paddingTop: 48,
      paddingBottom: 40,
    },

    // Header
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      marginBottom: 28,
    },
    backButton: {
      width: 44,
      height: 44,
      borderRadius: 14,
      backgroundColor: c.card,
      borderWidth: 1,
      borderColor: c.border,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 30,
      fontWeight: "800",
      color: c.text,
    },
    subtitle: {
      fontSize: 14,
      color: c.muted,
      marginTop: 2,
    },

    sectionLabel: {
      fontSize: 18,
      fontWeight: "700",
      color: c.text,
      marginBottom: 12,
    },

    // Account card
    card: {
      backgroundColor: c.card,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: c.border,
      padding: 20,
      marginBottom: 28,
    },
    cardTitle: {
      fontSize: 17,
      fontWeight: "700",
      color: c.text,
    },
    cardBody: {
      fontSize: 14,
      lineHeight: 20,
      color: c.muted,
      marginTop: 6,
    },
    primaryButton: {
      backgroundColor: c.accent,
      borderRadius: 12,
      paddingVertical: 12,
      alignItems: "center",
      marginTop: 16,
    },
    primaryButtonText: {
      color: "#FFFFFF",
      fontWeight: "700",
    },
    linkButton: {
      alignItems: "center",
      marginTop: 14,
    },
    linkText: {
      color: c.accent,
      fontWeight: "600",
    },
    pressed: {
      opacity: 0.8,
    },

    // List rows (appearance + about)
    listCard: {
      backgroundColor: c.card,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: c.border,
      overflow: "hidden",
      marginBottom: 28,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: c.border,
    },
    lastRow: {
      borderBottomWidth: 0,
    },
    rowIcon: {
      width: 36,
      height: 36,
      borderRadius: 10,
      backgroundColor: c.iconBox,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },
    rowLabel: {
      flex: 1,
      fontSize: 15,
      fontWeight: "700",
      color: c.text,
    },
    radio: {
      width: 22,
      height: 22,
      borderRadius: 11,
      borderWidth: 2,
      borderColor: c.subtle,
      alignItems: "center",
      justifyContent: "center",
    },
    radioSelected: {
      backgroundColor: c.accent,
      borderColor: c.accent,
    },

    // Modal
    modalBackdrop: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
      backgroundColor: "rgba(0, 0, 0, 0.55)",
    },
    modalCard: {
      backgroundColor: c.card,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: c.border,
      padding: 24,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: c.text,
      marginBottom: 12,
    },
    modalBody: {
      fontSize: 14,
      lineHeight: 22,
      color: c.muted,
    },
    modalVersion: {
      fontSize: 12,
      color: c.subtle,
      marginTop: 14,
    },
    modalButton: {
      alignSelf: "flex-end",
      backgroundColor: c.accent,
      borderRadius: 12,
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginTop: 20,
    },
  });
}
