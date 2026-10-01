import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";

// Object literals (OOP lesson): a deck is just a plain object, no class needed.
type Deck = { id: string; title: string; terms: number; mastered: number };

// Sample data
const SAMPLE_DECKS: Deck[] = [
  { id: "1", title: "JavaScript ES6 Essentials", terms: 24, mastered: 70 },
  { id: "2", title: "Flexbox Layouts", terms: 15, mastered: 40 },
  { id: "3", title: "React Navigation", terms: 18, mastered: 90 },
  { id: "4", title: "Four Pillars of OOP", terms: 12, mastered: 25 },
];

// Same colors as the Settings tab, so every tab follows the Light/Dark toggle.
const PALETTES = {
  dark: { bg: "#0F172A", card: "#1E293B", border: "#334155", text: "#F8FAFC", muted: "#CBD5E1", accent: "#3B82F6", button: "#2563EB" },
  light: { bg: "#F9FAFB", card: "#FFFFFF", border: "#D1D5DB", text: "#0F172A", muted: "#64748B", accent: "#3B82F6", button: "#2563EB" },
};
type Palette = typeof PALETTES.dark; // button: white text on it passes 4.5:1

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { session } = useAuth();
  const { actualTheme } = useTheme();
  const c = PALETTES[actualTheme];
  const styles = useMemo(() => makeStyles(c), [c]);

  // useState lesson: the screen's "memory".
  const [decks, setDecks] = useState(SAMPLE_DECKS);
  const [query, setQuery] = useState("");

  // Optional chaining lesson: safe even when signed out.
  const name = session?.user?.email?.split("@")[0];

  const visible = decks.filter((deck) =>
    deck.title.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const header = (
    <View style={styles.header}>
      <Text style={styles.greeting}>{name ? `Hi, ${name}` : "Ready to study?"}</Text>
      <Text style={styles.sub}>
        {decks.length} {decks.length === 1 ? "deck" : "decks"} in your library
      </Text>

      {/* Controlled input: the box always shows what `query` holds. */}
      <View style={styles.search}>
        <Ionicons name="search" size={18} color={c.muted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search your decks"
          placeholderTextColor={c.muted}
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
          accessibilityLabel="Search your decks"
        />
      </View>

      <TouchableOpacity
        style={styles.cta}
        onPress={() => router.push("/create")}
        accessibilityRole="button"
      >
        <Ionicons name="add" size={22} color="#fff" />
        <Text style={styles.ctaText}>Create a new deck</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    // FlatList lesson: only visible rows render, so long deck lists stay smooth.
    <FlatList
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}
      data={visible}
      keyExtractor={(d) => d.id}
      ListHeaderComponent={header}
      keyboardShouldPersistTaps="handled"
      ListEmptyComponent={
        <Text style={styles.empty}>
          {query ? `No decks match "${query}"` : "Nothing here yet."}
        </Text>
      }
      renderItem={({ item: { title, terms, mastered } }) => (
        <View style={styles.card}>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardMeta}>{`${terms} terms · ${mastered}% mastered`}</Text>
            <View style={styles.track}>
              <View style={[styles.fill, { width: `${mastered}%` }]} />
            </View>
          </View>
        </View>
      )}
    />
  );
}

const makeStyles = (c: Palette) =>
  StyleSheet.create({
    // Screen and scrolling list
    container: { flex: 1, backgroundColor: c.bg },
    content: { paddingHorizontal: 20, paddingBottom: 40 },

    // Greeting and review summary
    header: { marginBottom: 8 },
    greeting: { color: c.text, fontSize: 28, fontWeight: "800" },
    sub: { color: c.muted, fontSize: 15, marginTop: 4, marginBottom: 20 },

    // Deck search field
    search: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      minHeight: 48,
      backgroundColor: c.card,
      borderRadius: 12,
      paddingHorizontal: 14,
      borderWidth: 1,
      borderColor: c.border,
    },
    searchInput: { flex: 1, color: c.text, fontSize: 16, paddingVertical: 12 },

    // Create-deck button
    cta: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      backgroundColor: c.button,
      borderRadius: 12,
      minHeight: 52,
      marginTop: 16,
      marginBottom: 24,
    },
    ctaText: { color: "#fff", fontSize: 16, fontWeight: "700" },

    // Deck card and mastery progress
    card: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: c.card,
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: c.border,
    },
    cardBody: { flex: 1 },
    cardTitle: { color: c.text, fontSize: 17, fontWeight: "700" },
    cardMeta: { color: c.muted, fontSize: 13, marginTop: 4, marginBottom: 12 },
    track: { height: 6, borderRadius: 3, backgroundColor: c.border },
    fill: { height: 6, borderRadius: 3, backgroundColor: c.accent },
    // No-results message
    empty: { color: c.muted, fontSize: 15, textAlign: "center", marginTop: 32 },
  });
