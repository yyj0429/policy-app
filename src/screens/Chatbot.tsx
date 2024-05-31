import { View, TextInput, Dimensions } from 'react-native';
import Typography from '../components/Typography';
import { useState } from 'react';
import { colors } from '../constants/colors';
import Button from '../components/Button';
import { ScrollView } from 'react-native-gesture-handler';
import Spacer from '../components/Spacer';
import {
  createThreads,
  addMessageToThread,
  runAssistant,
} from '../api/cOpenAi';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default function CardList() {
  const [text, setText] = useState('');

  const requestToOpenAI = async (content: string) => {
    if (!content) {
      return;
    }

    const threads = await createThreads();

    if (!threads.threadId) {
      console.log('Running: No threadId');

      return;
    }

    const message = await addMessageToThread({
      threadId: threads.threadId,
      content,
    });

    if (!message?.assistantId) {
      console.log('Assistant is not defined');

      return;
    }

    const running = await runAssistant({
      threadId: message.threadId,
      assistantId: message.assistantId,
    });

    console.log('-'.repeat(50));
    console.log(running);
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: height * 0.8,
          paddingBottom: 32,
        }}>
        <ScrollView>
          <Typography>1</Typography>
          <Typography>1</Typography>
          <Typography>1</Typography>
          <Typography>1</Typography>
          <Typography>1</Typography>
          <Typography>1</Typography>
          <Typography>1</Typography>
          <Typography>1</Typography>
          <Typography>1</Typography>
          <Typography>12</Typography>
          <Typography>12</Typography>
          <Typography>12</Typography>
          <Typography>12</Typography>
          <Typography>12</Typography>
          <Typography>12</Typography>
          <Typography>12</Typography>
          <Typography>13</Typography>
          <Typography>12</Typography>
        </ScrollView>
      </View>

      <View
        style={{
          position: 'absolute',
          width: width,
          bottom: 16,
          height: 48,
          backgroundColor: colors.charcoal,
          flexDirection: 'row',
        }}>
        <TextInput
          style={{
            width: width * 0.8,
            fontSize: 16,
            borderColor: colors.gray333,
            color: colors.white,
            padding: 8,
          }}
          onChange={e => {
            setText(e.nativeEvent.text);
          }}
          multiline
          value={text}
        />

        <Spacer width={12} />

        <Button
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={async () => {
            setText('');

            const a = await requestToOpenAI(text);
          }}>
          <Typography style={{ fontSize: 16 }}>Send</Typography>
        </Button>
      </View>
    </View>
  );
}
