import { Configuration, OpenAIApi } from 'openai';
import { ORG as organization, SK as apiKey } from '../secrets';
import type { ConfigurationParameters } from 'openai';
import { createReadStream } from 'fs';

async function bootstrap(conf: ConfigurationParameters): Promise<void> {
  const configuration = new Configuration(conf);
  const openai = new OpenAIApi(configuration);

  const image = createReadStream('untitled.png');
  const response = await openai.createImageEdit(
    image as any,
    'put the helmet on the head of the guy',
    undefined,
    2,
    '512x512'
  );
  console.log(response.status);
  console.log(response.data.data);
}

void bootstrap({
  organization,
  apiKey,
});
