import { StyleSheet, Image } from "react-native";

export default function ImageViewer({ placeholder, selectedImage }) {
  const imageSource = selectedImage ? { uri: selectedImage } : placeholder;
  return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 480,
    borderRadius: 18,
  },
});
