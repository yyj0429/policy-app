import { Text, TextStyle } from 'react-native';
import { colors } from '../constants/colors';

interface TypographyProps {
  fontSize?: number;
  children: string;
  style?: TextStyle;
}

export default function Typography({
  fontSize,
  children,
  style,
}: TypographyProps) {
  return (
    <Text
      style={[
        { fontSize: fontSize ? fontSize : 32, color: colors.black },
        style ? style : null,
      ]}>
      {children}
    </Text>
  );
}
