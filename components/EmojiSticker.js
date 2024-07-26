import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export default function EmojiSticker({ imageSize, stickerSource }) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scaleImage = useSharedValue(imageSize);
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2;
      }
    });
  const drag = Gesture.Pan().onChange((event) => {
    // Calculate new position
    let newX = translateX.value + event.changeX;
    let newY = translateY.value + event.changeY;

    // Boundary checks
    if (newX < 0) newX = 0;
    if (newY < 0) newY = 0;
    if (newX > 320 - imageSize) newX = 320 - imageSize;
    if (newY > 440 - imageSize) newY = 440 - imageSize;

    // Update position
    translateX.value = newX;
    translateY.value = newY;
  });
  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });
  return (
    <GestureDetector gesture={drag}>
      <Animated.View style={[containerStyle, { top: -440 }]}>
        <GestureDetector gesture={doubleTap}>
          <Animated.Image
            source={stickerSource}
            resizeMode="contain"
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}
