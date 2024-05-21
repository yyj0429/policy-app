import { View } from 'react-native';

interface SpacerProps {
  width?: number;
  height?: number;
}

export default function Spacer({ width, height }: SpacerProps) {
  return (
    <View
      style={{
        width: width ? width : null,
        height: height ? height : null,
      }}
    />
  );
}
