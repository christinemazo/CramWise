// TAB BAR (bottom navigation)

// Icons from Expo
import { Ionicons } from "@expo/vector-icons";
// Building blocks: text, pressable button, box
import { Text, TouchableOpacity, View } from "react-native";
// Functions that give the colors and styles for dark or light mode
import { getColors, getStyles } from "../../styles";

// The buttons in the bottom tab bar
// key = internal name, label = text shown, icon = Ionicons icon name
export const TABS = [
  { key: "home", label: "Home", icon: "home" },
  { key: "create", label: "Create", icon: "add-circle" },
  { key: "quiz", label: "Quiz", icon: "school" },
  { key: "progress", label: "Progress", icon: "stats-chart" },
];

// active = open tab, onChange = called when a tab is pressed
export default function TabBar({ active, onChange, isDark }) {
  // Styles and colors that match the current mode
  const styles = getStyles(isDark);
  const colors = getColors(isDark);

  return (
    // The bar that holds all the tab buttons
    <View style={styles.tabBar}>
      {/* Make one button for each item in TABS */}
      {TABS.map((tab) => {
        // Blue for the open tab, gray for the others
        const color = active === tab.key ? colors.accent : colors.tabInactive;
        return (
          // One tab button
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            activeOpacity={0.7}
            onPress={() => onChange(tab.key)}
          >
            {/* Tab icon */}
            <Ionicons name={tab.icon} size={26} color={color} />
            {/* Tab name */}
            <Text style={[styles.tabLabel, { color }]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
