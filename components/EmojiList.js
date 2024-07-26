import { useState } from "react";
import {
  View,
  Pressable,
  StyleSheet,
  Image,
  FlatList,
  Platform,
} from "react-native";

export default function EmojiList({ onSelect, onCloseModal }) {
  const [emoji] = useState([
    require("../assets/emoji/emoji1.png"),
    require("../assets/emoji/emoji2.png"),
    require("../assets/emoji/emoji3.png"),
    require("../assets/emoji/emoji4.png"),
    require("../assets/emoji/emoji5.png"),
    require("../assets/emoji/emoji6.png"),
  ]);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === "web"}
      data={emoji}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            onSelect(item);
            onCloseModal();
          }}
        >
          <Image source={item} key={index} style={styles.emoji} />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  emoji: {
    width: 100,
    height: 100,
    margin: 20,
  },
});
