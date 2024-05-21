import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useState } from 'react';
import {
  Alert,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Button from '../components/Button';
import Spacer from '../components/Spacer';
import Typography from '../components/Typography';
import { colors } from '../constants/colors';

type Locations = '서울특별시' | '인천광역시';

export default function Register() {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'남자' | '여자'>('남자');
  const [region, setRegion] = useState<Locations>('서울특별시');
  const [interest, setInterest] = useState<string>('');

  const checkInfo = () => {
    if (!email) {
      Alert.alert('', '이메일을 입력 해주세요.');

      return false;
    }

    if (!password) {
      Alert.alert('', '패스워드을 입력 해주세요.');

      return false;
    }

    if (!rePassword) {
      Alert.alert('', '패스워드 확인을 입력 해주세요.');

      return false;
    }

    if (password !== rePassword) {
      Alert.alert('', '동일한 패스워드를 입력해주세요.');

      return false;
    }

    return true;
  };

  const registerAccount = async () => {
    if (checkInfo()) {
      try {
        const result = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );

        // Early return
        if (!result.user) {
          return;
        }

        await firestore()
          .collection('users')
          .doc(result.user.uid)
          .set({
            email,
            age: Number(age),
            gender,
            region,
            interest,
          });

        Alert.alert('', `${email}로 성공적으로 회원가입에 성공 했어요!`);
      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('', '이미 사용중인 이메일이에요.');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('', '이메일 주소가 올바르지 않아요.');
        }

        Alert.alert('', '회원가입에 실패 했습니다!');
      }
    }
  };

  const moveToLoginScreen = () => {
    navigation.push('LoginScreen');
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 25,
        paddingVertical: 25,
      }}>
      <Typography>회원가입 페이지</Typography>

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
          onChange={ev => {
            setEmail(ev.nativeEvent.text);
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
          onChange={ev => {
            setPassword(ev.nativeEvent.text);
          }}
        />
      </View>

      <Spacer height={8} />

      <View>
        <Typography fontSize={16}>패스워드 확인</Typography>

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
          onChange={ev => {
            setRePassword(ev.nativeEvent.text);
          }}
        />
      </View>

      <Spacer height={8} />

      <View>
        <Typography fontSize={16}>나이</Typography>

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
          keyboardType="number-pad"
          secureTextEntry
          onChange={ev => {
            setAge(ev.nativeEvent.text as string);
          }}
          value={age}
        />
      </View>

      <Spacer height={8} />

      <View>
        <Typography fontSize={16}>성별</Typography>

        <Spacer height={4} />

        <RNPickerSelect
          onValueChange={value => {
            setGender(value as '남자' | '여자');
          }}
          items={[
            { label: '남자', value: '남자' },
            { label: '여자', value: '여자' },
          ]}
        />
      </View>

      <Spacer height={8} />

      <View>
        <Typography fontSize={16}>지역</Typography>

        <Spacer height={4} />

        <RNPickerSelect
          onValueChange={value => {
            setRegion(value as Locations);
          }}
          items={[
            { label: '서울특별시', value: '서울특별시' },
            { label: '인천광역시', value: '인천광역시' },
          ]}
        />
      </View>

      <Spacer height={8} />

      <View>
        <Typography fontSize={16}>관심사</Typography>

        <Spacer height={4} />

        <RNPickerSelect
          onValueChange={value => {
            setInterest(value as string);
          }}
          items={[
            { label: '관심사1', value: '관심사1' },
            { label: '관심사2', value: '관심사2' },
          ]}
        />
      </View>

      <Spacer height={16} />

      <Button onPress={registerAccount}>
        <Typography fontSize={18} style={{ color: colors.white }}>
          회원가입
        </Typography>
      </Button>

      <Spacer height={16} />

      <TouchableOpacity onPress={moveToLoginScreen}>
        <Typography
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: colors.blue,
            textDecorationLine: 'underline',
          }}>
          로그인은 이쪽으로...
        </Typography>
      </TouchableOpacity>
    </ScrollView>
  );
}
