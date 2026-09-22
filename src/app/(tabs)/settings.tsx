import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Modal, Pressable, ScrollView, Text, View } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { ThemeMode, useTheme } from "../../contexts/ThemeContext";

export default function SettingsScreen() {
  const router = useRouter();
  const { theme, actualTheme, setTheme } = useTheme();
  const { session, signOut } = useAuth();
  const [showAbout, setShowAbout] = useState(false);
  const isDark = actualTheme === "dark";
  const colors = isDark
    ? {
        background: "#0F172A",
        text: "#F8FAFC",
        card: "#1E293B",
        border: "#334155",
        muted: "#CBD5E1",
        accent: "#3B82F6",
      }
    : {
        background: "#F9FAFB",
        text: "#0F172A",
        card: "#FFFFFF",
        border: "#D1D5DB",
        muted: "#64748B",
        accent: "#3B82F6",
      };

  const themeOptions: { label: string; value: ThemeMode }[] = [
    { label: "Light Mode", value: "light" },
    { label: "Dark Mode", value: "dark" },
    { label: "System Mode", value: "system" },
  ];

  function confirmSignOut() {
    Alert.alert("Sign out", "You can sign back in any time.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign out",
        style: "destructive",
        onPress: () => signOut(),
      },
    ]);
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: colors.background,
      }}
    >
      <View style={{ width: "100%", maxWidth: 390, flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            padding: 20,
            backgroundColor: colors.background,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 28,
              fontWeight: "800",
              marginBottom: 24,
            }}
          >
            Settings
          </Text>

          <Text
            style={{
              color: colors.muted,
              fontSize: 13,
              fontWeight: "700",
              letterSpacing: 0.5,
              marginBottom: 10,
            }}
          >
            ACCOUNT
          </Text>

          {session ? (
            <View
              style={{
                backgroundColor: colors.card,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: colors.border,
                padding: 16,
                marginBottom: 24,
              }}
            >
              <Text style={{ color: colors.muted, fontSize: 13 }}>
                Signed in as
              </Text>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 16,
                  fontWeight: "600",
                  marginTop: 2,
                }}
              >
                {session.user?.email}
              </Text>
              <Pressable
                onPress={confirmSignOut}
                style={{
                  alignSelf: "flex-start",
                  marginTop: 14,
                  paddingHorizontal: 16,
                  paddingVertical: 9,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#EF4444",
                }}
              >
                <Text style={{ color: "#EF4444", fontWeight: "700" }}>
                  Sign out
                </Text>
              </Pressable>
            </View>
          ) : (
            <View
              style={{
                backgroundColor: colors.card,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: colors.border,
                padding: 16,
                marginBottom: 24,
              }}
            >
              <Text
                style={{ color: colors.text, fontSize: 17, fontWeight: "700" }}
              >
                Do you want to create an account?
              </Text>
              <Text
                style={{
                  color: colors.muted,
                  fontSize: 14,
                  lineHeight: 20,
                  marginTop: 6,
                }}
              >
                CramWise works without one. Sign up to back up your decks and
                sync them across devices.
              </Text>
              <Pressable
                onPress={() => router.push("/welcome")}
                style={{
                  backgroundColor: colors.accent,
                  borderRadius: 10,
                  marginTop: 14,
                  paddingVertical: 12,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#FFFFFF", fontWeight: "700" }}>
                  Create an account
                </Text>
              </Pressable>
              <Pressable
                onPress={() => router.push("/sign-in")}
                style={{ marginTop: 12, alignItems: "center" }}
              >
                <Text style={{ color: colors.accent, fontWeight: "600" }}>
                  I already have an account
                </Text>
              </Pressable>
            </View>
          )}

          <Text
            style={{
              color: colors.muted,
              fontSize: 13,
              fontWeight: "700",
              letterSpacing: 0.5,
              marginBottom: 10,
            }}
          >
            APPEARANCE
          </Text>

          {themeOptions.map((option) => {
            const isSelected = theme === option.value;

            return (
              <Pressable
                key={option.value}
                onPress={() => setTheme(option.value)}
                style={{
                  backgroundColor: isSelected ? colors.accent : colors.card,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: isSelected ? colors.accent : colors.border,
                  padding: 16,
                  marginBottom: 12,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: isSelected ? "#F8FAFC" : colors.text,
                    fontSize: 17,
                    fontWeight: "600",
                  }}
                >
                  {option.label}
                </Text>
                <View
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 9,
                    borderWidth: 2,
                    borderColor: isSelected ? "#FFFFFF" : colors.muted,
                    backgroundColor: isSelected ? "#FFFFFF" : "transparent",
                  }}
                />
              </Pressable>
            );
          })}

          <Pressable
            onPress={() => setShowAbout(true)}
            style={{
              backgroundColor: colors.card,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: colors.border,
              padding: 16,
              marginBottom: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{ color: colors.text, fontSize: 17, fontWeight: "600" }}
            >
              About CramWise
            </Text>
            <Text style={{ color: colors.accent, fontSize: 24 }}>→</Text>
          </Pressable>
        </ScrollView>
      </View>

      <Modal
        visible={showAbout}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAbout(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            padding: 20,
            backgroundColor: "rgba(0, 0, 0, 0.45)",
          }}
        >
          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: colors.border,
              padding: 20,
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontSize: 18,
                fontWeight: "700",
                marginBottom: 14,
              }}
            >
              About CramWise
            </Text>
            <Text style={{ color: colors.text, fontSize: 16, lineHeight: 24 }}>
              CramWise is your smart study buddy that makes cramming less
              stressful. Create flashcards, take quick quizzes, and review
              smarter with spaced repetition to retain more in less time.
            </Text>
            <Text style={{ color: colors.muted, fontSize: 14, marginTop: 12 }}>
              Version 1.0.0
            </Text>
            <Pressable
              onPress={() => setShowAbout(false)}
              style={{
                alignSelf: "flex-end",
                backgroundColor: colors.accent,
                borderRadius: 10,
                marginTop: 20,
                paddingHorizontal: 18,
                paddingVertical: 10,
              }}
            >
              <Text style={{ color: "#FFFFFF", fontWeight: "700" }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
