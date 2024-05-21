import { ReactNode } from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { colors } from '../constants/colors';

interface ButtonProps {
  onPress: () => void;
  children: ReactNode;
  style?: ViewStyle;
}

export default function Button({ onPress, children, style }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        { backgroundColor: colors.blue, borderRadius: 8, padding: 8 },
        style ? style : null,
      ]}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
}
