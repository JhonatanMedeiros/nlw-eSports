import { config as dotConfig } from 'dotenv';
import { join } from 'path';

dotConfig({
	path: join(process.cwd(), `.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`),
});
