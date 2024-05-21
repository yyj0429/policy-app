import { Alert, TextInput, TouchableOpacity, View } from 'react-native';
import Typography from '../components/Typography';
import Spacer from '../components/Spacer';
import Button from '../components/Button';
import { colors } from '../constants/colors';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const checkInfo = () => {
    if (!email) {
      Alert.alert('', '이메일을 입력 해주세요.');

      return false;
    }

    if (!password) {
      Alert.alert('', '패스워드을 입력 해주세요.');

      return false;
    }

    return true;
  };

  const loginAccount = async () => {
    if (checkInfo()) {
      try {
        const result = await auth().signInWithEmailAndPassword(email, password);

        // TODO: Redirect to main page
      } catch (error: any) {}
    }
  };

  const moveToRegisterScreen = () => {
    navigation.push('RegisterScreen');
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Typography>로그인 페이지</Typography>

      <Spacer height={16} />

      <View>
        <Typography fontSize={16}>이메일</Typography>

        <Spacer height={4} />

        <TextInput
          style={{
            width: 320,
            height: 36,
            borderWidth: 1,
            textAlign: 'center',
            borderRadius: 4,
            fontSize: 16,
          }}
        />
      </View>

      <Spacer height={8} />

      <View>
        <Typography fontSize={16}>패스워드</Typography>

        <Spacer height={4} />

        <TextInput
          style={{
            width: 320,
            height: 36,
            borderWidth: 1,
            textAlign: 'center',
            borderRadius: 4,
            fontSize: 16,
          }}
          secureTextEntry
        />
      </View>

      <Spacer height={8} />

      <Button onPress={() => {}}>
        <Typography fontSize={18} style={{ color: colors.white }}>
          로그인
        </Typography>
      </Button>

      <Spacer height={16} />

      <TouchableOpacity onPress={moveToRegisterScreen}>
        <Typography
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: colors.blue,
            textDecorationLine: 'underline',
          }}>
          회원 가입은 이쪽으로...
        </Typography>
      </TouchableOpacity>
    </View>
  );
}
