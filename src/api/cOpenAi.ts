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

  console.log('1');

  console.log('2');

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
  console.log('3');

  const preDefinedThreadId = await getData('THREAD_ID');

  if (!preDefinedThreadId) {
    console.log('no preDefinedThreadId');

    return;
  }

  console.log('4');

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
    instructions: 'Please respond to the user message',
  });

  console.log('running is done');

  if (run.status === 'completed') {
    console.log(threadId);

    const messages = await openai.beta.threads.messages.list(threadId, {
      query: '',
    });

    console.log('run is completed');

    messages.data.forEach(message => {
      message.content.forEach(messageContent => {
        console.log(messageContent);
      });
    });
  } else {
    console.log(`${run.status} is detected. Please try again.`);
  }
};