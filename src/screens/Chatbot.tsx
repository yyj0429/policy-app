import OpenAI from 'openai';
import { useEffect, useState } from 'react';
import { Dimensions, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Markdown from 'react-native-markdown-display';
import {
  addMessageToThread,
  createThreads,
  runAssistant,
} from '../api/cOpenAi';
import Button from '../components/Button';
import Spacer from '../components/Spacer';
import Typography from '../components/Typography';
import { colors } from '../constants/colors';
import { removeData } from '../utils/localStorage';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default function CardList() {
  const [text, setText] = useState('');
  const [answers, setAnswers] = useState<
    OpenAI.Beta.Threads.Messages.MessageContent[]
  >([]);

  // useEffect(() => {
  //   const inner = async () => {
  //     await removeData('THREAD_ID');
  //   };

  //   inner();

  //   console.log('Cold brew');
  // }, []);

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

    const messages = await runAssistant({
      threadId: message.threadId,
      assistantId: message.assistantId,
    });

    console.log('-'.repeat(50));

    if (messages?.length) {
      // console.log(messages[0].text);

      const mapped = messages.map(message => {
        
        return message.text.value;
      });

      console.log(mapped);

      setAnswers(mapped);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: height * 0.8,
          paddingBottom: 32,
        }}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{ height: '100%' }}>
          {answers.map((answer, index) => {
            return (
              <>
                <Markdown key={index.toString()}>{answer.toString()}</Markdown>

                <Spacer height={16} />
              </>
            );
          })}
        </ScrollView>
      </View>

      <View
        style={{
          position: 'absolute',
          width: width,
          bottom: 0,
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
           <Typography style={{ fontSize: 16, color: colors.white }}>
            전송
          </Typography>
        </Button>
      </View>
    </View>
  );
}
