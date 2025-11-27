import { ScrollView, StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function TabTwoScreen() {
  return (
    <ScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type={"subtitle"}>Вычисление X</ThemedText>
        <ThemedText type={"default"}>B * C / A</ThemedText>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type={"subtitle"}>Метеоры</ThemedText>
        <ThemedText type={"default"}>
          В секунду &mdash; 3600 ÷ Метеоров в час
        </ThemedText>
        <ThemedText type={"default"}>
          В минуту &mdash; 60 ÷ Метеоров в час
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type={"subtitle"}>Глубина</ThemedText>
        <ThemedText type={"default"}>
          (9.81 * (Время падения в секундах^2)) ÷ 2
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type={"subtitle"}>Расстояние до молнии</ThemedText>
        <ThemedText type={"default"}>
          334 * Время в секундах от вспышки до грома
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    gap: 8,
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
    padding: 16,
    borderRadius: 16,
    boxShadow:
      "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
  },
});
