import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ImageViewer from "./components/ImageViewer";
import * as ImagePicker from "expo-image-picker";
import { useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";

import Placeholder from "./assets/background-image.png";
import Button from "./components/Button";
import IconButton from "./components/IconButton";
import CircleButton from "./components/CircleButton";
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from "./components/EmojiList";
import EmojiSticker from "./components/EmojiSticker";

export default function App() {
  const [isSaving, setIsSaving] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef();

  if (status === null) {
    requestPermission();
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("No image selected");
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
    setPickedEmoji(null);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onSaveImage = async () => {
    setIsSaving(true);
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
        format: "png",
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Image saved successfully");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={styles.imageContainer}>
        <View
          ref={imageRef}
          collapsable={false}
          style={[styles.imageWrapper, isSaving && styles.savingImageWrapper]}
        >
          <ImageViewer
            placeholder={Placeholder}
            selectedImage={selectedImage}
          />
          {pickedEmoji && (
            <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
          )}
        </View>
      </GestureHandlerRootView>

      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" text="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" text="Save" onPress={onSaveImage} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            theme={"primary"}
            title="Choose a photo"
            onPress={pickImage}
          />
          <Button
            title="Use this photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <EmojiPicker
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      >
        <EmojiList
          onSelect={setPickedEmoji}
          onCloseModal={() => setIsModalVisible(false)}
        />
      </EmojiPicker>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
    height: 440,
  },
  imageWrapper: {
    width: 320,
    height: 440,
    borderRadius: 18,
    overflow: "hidden",
  },
  savingImageWrapper: {
    borderRadius: 0,
  },
  footerContainer: {
    flex: 1 / 2,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
