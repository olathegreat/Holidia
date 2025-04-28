import { Pressable, View } from 'react-native';
import Text from './text';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { size } from '@shopify/react-native-skia';

type Props = {
  title: string;
  headerAction?: {
    name: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
  };
};

const Header = ({ title, headerAction }: Props) => {
  const onBack = () => {
    router.back();
  };
  return (
    <View className="mb-4 flex flex-row items-center justify-between px-2 py-2">
      <View className="flex flex-row items-center justify-center">
        <Pressable onPress={onBack}>
          <Text>
            <Ionicons name="arrow-back" size={24} color="black" />
          </Text>
        </Pressable>
        <Text>{title}</Text>
      </View>

      {headerAction && (
        <Pressable onPress={headerAction.onPress}>
          <Text>
            <Ionicons name={headerAction.name} size={24} />
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default Header;
