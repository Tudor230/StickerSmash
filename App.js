import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ImageViewer from "./components/ImageViewer";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

import Placeholder from "./assets/background-image.png";
import Button from "./components/Button";

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("No image selected");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeholder={Placeholder} selectedImage={selectedImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button theme={"primary"} title="Choose a photo" onPress={pickImage} />
        <Button title="Use this photo" />
      </View>
      <StatusBar style="auto" />
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
  },
  footerContainer: {
    flex: 1 / 2,
    alignItems: "center",
  },
});
