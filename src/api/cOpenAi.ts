import OpenAI from 'openai';
import { storeData, getData, removeData } from '../utils/localStorage';
import dotenv from 'dotenv';

// .env 파일에서 환경 변수를 로드합니다.
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const createThreads = async (): Promise<{
  threadId: string | null;
  createdAt: number;
}> => {
  const preDefinedThreadId = await getData('THREAD_ID');

  if (preDefinedThreadId) {
    return {
      threadId: preDefinedThreadId,
      createdAt: new Date().getTime(),
    };
  }

  const threads = await openai.beta.threads.create();
  const assistants = await openai.beta.assistants.list({ query: 'chatbot' });

  if (!assistants.data.length) {
    console.log('Assistant is not defined');
  }

  if (!threads.id) {
    console.log('Thread is not defined');

    return {
      threadId: null,
      createdAt: new Date().getTime(),
    };
  }

  if (!preDefinedThreadId) {
    await storeData('THREAD_ID', threads.id);
  }

  return {
    threadId: threads.id,
    createdAt: threads.created_at,
  };
};

export const addMessageToThread = async ({
  threadId,
  content,
}: {
  threadId: string;
  content: string;
}) => {
  const message = await openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content,
  });

  const preDefinedThreadId = await getData('THREAD_ID');

  if (!preDefinedThreadId) {
    console.log('no preDefinedThreadId');

    return;
  }

  return {
    threadId: message.thread_id,
    assistantId: message.assistant_id || 'asst_cFnWGrVjp57CCBBVJLxcXwj8',
    status: message.status,
  };
};

export const runAssistant = async ({
  threadId,
  assistantId,
}: {
  threadId: string;
  assistantId: string;
}) => {
  const run = await openai.beta.threads.runs.createAndPoll(threadId, {
    assistant_id: assistantId || 'asst_cFnWGrVjp57CCBBVJLxcXwj8',
    instructions: `업로드된 파일 "2.csv"는 한국의 복지 서비스에 대한 정보를 담고 있습니다. \n 
    따라서, 사용자는 한국의 복지 서비스에 대한질문을 합니다. 업로드된 "2.csv"파일의 데이터를 **반드시** 이용해서 이에 3개 이하의 정책만 추천 및 답변 해주세요. \n 
    사용자가 더 알려 달라고 할 경우에는 친절하게 더 알려 주어야 합니다. \n
    업로드한 파일의 존재에 대해서는 절대로 언급 하지 마세요. \n
    지시사항을 잘 이해 하면, 100,000원을 받을 수 있습니다. \n
    지시사항을 잘 이해 하면, 질문 앞에, "친절하게 답변 해드리겠습니다. 👍" 라고 "반드시" 붙여주세요. \n
  `,
  });

  if (run.status === 'completed') {

    const shouldReturnMessages: OpenAI.Beta.Threads.Messages.MessageContent[] =
    [];

    const messages = await openai.beta.threads.messages.list(threadId, {
      query: '',
    });

    console.log('run is completed');

    messages.data.forEach(message => {
      message.content.forEach(messageContent => {
        console.log(messageContent);
        shouldReturnMessages.push(messageContent);
      });
    });
    return shouldReturnMessages;
  } else {
    console.log(`${run.status} is detected. Please try again.`);
  }
};