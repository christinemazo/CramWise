import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { styles } from "./index.styles";

const stats = [
  { label: "Streak", value: "12d", icon: "flame-outline" as const, tone: "#FFE3A7" },
  { label: "Accuracy", value: "89%", icon: "trending-up-outline" as const, tone: "#D9F4E7" },
  { label: "Cards due", value: "12", icon: "albums-outline" as const, tone: "#DDE7FF" },
];

const reviewQueue = [
  { title: "Biology review", detail: "12 cards ready", icon: "leaf-outline" as const, tone: "#D9F4E7" },
  { title: "Spanish verbs", detail: "8 cards ready", icon: "language-outline" as const, tone: "#DDE7FF" },
];

const publishedSets = [
  { title: "Biology fundamentals", detail: "24 questions · Published today" },
  { title: "Spanish verbs", detail: "18 flashcards · Published yesterday" },
];

const recentScores = [
  { title: "Biology review", score: "92%", time: "12 min ago" },
  { title: "Spanish verbs", score: "88%", time: "1 day ago" },
  { title: "History recap", score: "95%", time: "2 days ago" },
];

const quickLinks = [
  { label: "Start review", icon: "play-outline" as const, tone: "#F08C45", route: "/create" as const },
  { label: "Create set", icon: "add-outline" as const, tone: "#41A77C", route: "/create" as const },
  { label: "See scores", icon: "trophy-outline" as const, tone: "#5D8FE8", route: "/scores" as const },
];

export default function Home() {
  const router = useRouter();
  const { session } = useAuth();
  const { actualTheme, setTheme } = useTheme();
  const isDark = actualTheme === "dark";
  const email = session?.user?.email ?? null;
  const firstName = email ? email.split("@")[0].split(".")[0] : "there";
  const { width } = useWindowDimensions();
  const isCompact = width < 380;
  const isWide = width >= 900;

  const palette = isDark
    ? {
        background: "#17151B",
        panel: "#24202A",
        panelStrong: "#30273A",
        panelSoft: "#211D27",
        border: "#3A3044",
        text: "#FFF9F0",
        muted: "#D0C4D2",
        secondary: "#B3A5B7",
        accent: "#F08C45",
        accentCool: "#41A77C",
        accentSoft: "#FFF0C9",
        iconOnSoft: "#17151B",
        iconOnAccent: "#17151B",
        iconOnHero: "#F08C45",
        toggle: "#24202A",
        toggleText: "#FFF9F0",
        pageGlow: "#1B1520",
      }
    : {
        background: "#FFFEFA",
        panel: "#FFFFFF",
        panelStrong: "#FFE3A7",
        panelSoft: "#F1F5FF",
        border: "#ECE8DF",
        text: "#171717",
        muted: "#655F59",
        secondary: "#867E75",
        accent: "#F08C45",
        accentCool: "#41A77C",
        accentSoft: "#FFF0C9",
        iconOnSoft: "#171717",
        iconOnAccent: "#171717",
        iconOnHero: "#171717",
        toggle: "#171717",
        toggleText: "#FFFFFF",
        pageGlow: "#FFF7DF",
      };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: palette.background }]}
      contentContainerStyle={[styles.content, isWide && styles.contentWide]}
    >
      <View style={styles.topbar}>
        <View>
          <Text style={[styles.greetingKicker, { color: palette.secondary }]}>GOOD AFTERNOON</Text>
          <Text style={[styles.greeting, { color: palette.text }]}>
            {email ? `Welcome back, ${firstName}` : "Welcome"}
          </Text>
        </View>

        <Pressable
          accessibilityLabel="Toggle light and dark mode"
          accessibilityRole="switch"
          accessibilityState={{ checked: isDark }}
          onPress={() => setTheme(isDark ? "light" : "dark")}
          style={[styles.themeToggle, { backgroundColor: palette.toggle, borderColor: palette.border }]}
        >
          <Text style={[styles.themeToggleLabel, styles.themeToggleLight, { color: isDark ? palette.secondary : palette.toggleText }]}>Light</Text>
          <Text style={[styles.themeToggleLabel, styles.themeToggleDark, { color: isDark ? palette.toggleText : palette.secondary }]}>Dark</Text>
          <View style={[styles.themeToggleThumb, isDark ? styles.themeToggleThumbRight : styles.themeToggleThumbLeft, { backgroundColor: isDark ? palette.accent : palette.accentCool }]}>
            <Ionicons name={isDark ? "moon" : "sunny"} size={13} color={palette.iconOnAccent} />
          </View>
        </Pressable>
      </View>

      <View style={[styles.heroCard, { backgroundColor: isDark ? "#30273A" : "#6542C7" }]}>
        <View style={styles.heroKickerRow}>
          <Ionicons name="leaf-outline" size={16} color="#FFE3A7" />
          <Text style={[styles.heroKicker, { color: "#FFE3A7" }]}>THIS WEEK IN STUDY</Text>
        </View>
        <Text style={[styles.heroTitle, { color: "#FFFFFF" }]}>Keep your biology streak alive</Text>
        <Text style={[styles.heroSubtitle, { color: "#F0EAFE" }]}>
          12 flashcards are ready for a quick review today.
        </Text>

        <View style={[styles.heroActions, isCompact && styles.heroActionsCompact]}>
          <Pressable
            onPress={() => router.push("/create")}
            style={[
              styles.primaryButton,
              { backgroundColor: "#41A77C" },
            ]}
          >
            <Text style={[styles.primaryButtonText, { color: "#FFFFFF" }]}>
              Start review
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/history")}
            style={[
              styles.secondaryButton,
              { backgroundColor: "rgba(255,255,255,0.14)", borderColor: "rgba(255,255,255,0.26)" },
            ]}
          >
            <Text style={[styles.secondaryButtonText, { color: "#FFFFFF" }]}>Review history</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.quickLinks}>
        {quickLinks.map((link) => (
          <Pressable key={link.label} onPress={() => router.push(link.route)} style={[styles.quickLink, { backgroundColor: link.tone }]}>
            <Ionicons name={link.icon} size={22} color="#FFFFFF" />
            <Text style={styles.quickLinkText}>{link.label}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.progressHeader}>
        <Text style={[styles.progressTitle, { color: palette.text }]}>Your progress</Text>
        <Text style={[styles.progressUpdated, { color: palette.secondary }]}>Updated today</Text>
      </View>

      <View style={[styles.statsRow, { borderTopColor: palette.border, borderBottomColor: palette.border }]}>
        {stats.map((stat, index) => (
          <View
            key={stat.label}
            style={[styles.statCard, index < stats.length - 1 && styles.statCardDivider, { borderRightColor: palette.border }]}
          >
            <View style={[styles.statIcon, { backgroundColor: isDark ? palette.accentSoft : stat.tone }]}>
              <Ionicons name={stat.icon} size={15} color={palette.iconOnSoft} />
            </View>
            <Text style={[styles.statValue, { color: palette.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: palette.secondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.desktopColumns, isWide && styles.desktopColumnsWide]}>
        <View style={styles.primaryColumn}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionLabel, { color: palette.text }]}>Published sets</Text>
            <Ionicons name="checkmark-circle" size={18} color={palette.accentCool} />
          </View>

          <View style={styles.publishedList}>
            {publishedSets.map((item) => (
              <View key={item.title} style={[styles.publishedRow, { borderBottomColor: palette.border }]}>
                <View style={[styles.publishedMark, { backgroundColor: isDark ? palette.accentSoft : "#D9F4E7" }]}>
                  <Ionicons name="checkmark" size={16} color={palette.iconOnSoft} />
                </View>
                <View style={styles.reviewCopy}>
                  <Text style={[styles.scoreTitle, { color: palette.text }]}>{item.title}</Text>
                  <Text style={[styles.scoreMeta, { color: palette.muted }]}>{item.detail}</Text>
                </View>
                <Text style={[styles.publishedLabel, { color: palette.accentCool }]}>PUBLISHED</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.secondaryColumn}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionLabel, { color: palette.text }]}>Ready to review</Text>
            <Pressable onPress={() => router.push("/create")}>
              <Text style={[styles.linkText, { color: palette.accent }]}>New set</Text>
            </Pressable>
          </View>

          <View style={styles.reviewList}>
            {reviewQueue.map((item) => (
              <Pressable
                key={item.title}
                onPress={() => router.push("/create")}
                style={[styles.reviewRow, { borderBottomColor: palette.border }]}
              >
                <View style={[styles.reviewIcon, { backgroundColor: isDark ? palette.accentSoft : item.tone }]}>
                  <Ionicons name={item.icon} size={20} color={palette.iconOnSoft} />
                </View>
                <View style={styles.reviewCopy}>
                  <Text style={[styles.scoreTitle, { color: palette.text }]}>{item.title}</Text>
                  <Text style={[styles.scoreMeta, { color: palette.muted }]}>{item.detail}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={palette.text} />
              </Pressable>
            ))}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionLabel, { color: palette.text }]}>Recent scores</Text>
            <Pressable onPress={() => router.push("/scores")}>
              <Text style={[styles.linkText, { color: palette.accent }]}>View all</Text>
            </Pressable>
          </View>

          <View style={[styles.scoreCard, { borderTopColor: palette.border }]}>
            {recentScores.map((item) => (
              <View key={item.title} style={styles.scoreRow}>
                <View>
                  <Text style={[styles.scoreTitle, { color: palette.text }]}>{item.title}</Text>
                  <Text style={[styles.scoreMeta, { color: palette.muted }]}>{item.time}</Text>
                </View>
                <Text style={[styles.scoreValue, { color: palette.accent }]}>{item.score}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

