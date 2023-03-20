import { Configuration, OpenAIApi } from 'openai';
import { ORG as organization, SK as apiKey } from '../secrets';
import type { ConfigurationParameters } from 'openai';
// import { createReadStream } from 'fs';

async function bootstrap(conf: ConfigurationParameters): Promise<void> {
  const configuration = new Configuration(conf);
  const openai = new OpenAIApi(configuration);

  // const image = createReadStream('untitled.png');
  // const response = await openai.createImageEdit(
  //   image as any,
  //   'put the helmet on the head of the guy',
  //   undefined,
  //   2,
  //   '512x512'
  // );
  // console.log(response.status);
  // console.log(response.data.data);

  const prompt =
    'create a set of 5 random questions with 3 incorrect and one correct answer options about features and the universe of For Honor Ubisoft game';

  console.log(`sending prompt: ${prompt}`);
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    temperature: 0.7,
    max_tokens: 1024,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  response.data.choices.forEach((choice) => {
    if (typeof choice.text === 'string') {
      process.stdout.write(choice.text);
    }
  });
  process.stdout.write('\n');
  console.log(JSON.stringify(response.data, null, 2));
}

void bootstrap({
  organization,
  apiKey,
});
