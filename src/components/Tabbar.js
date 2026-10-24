// TAB BAR (bottom navigation)

import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { getColors, getStyles } from "../styles";

// The three buttons in the bottom tab bar.
export const TABS = [
  { key: "home", label: "Home", icon: "home" },
  { key: "create", label: "Create", icon: "add-circle" },
  { key: "progress", label: "Progress", icon: "stats-chart" },
];

export default function TabBar({ active, onChange, isDark }) {
  const styles = getStyles(isDark);
  const colors = getColors(isDark);

  return (
    <View style={styles.tabBar}>
      {TABS.map((tab) => {
        const color = active === tab.key ? colors.accent : colors.tabInactive;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            activeOpacity={0.7}
            onPress={() => onChange(tab.key)}
          >
            <Ionicons name={tab.icon} size={26} color={color} />
            <Text style={[styles.tabLabel, { color }]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
