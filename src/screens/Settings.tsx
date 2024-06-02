import { View } from 'react-native';
import Typography from '../components/Typography';

export default function () {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
       <Typography>신규 정책은 곧 오픈 예정입니다.</Typography>
    </View>
  );
}
