import {Repository, Schema} from 'redis-om';
import {redisClient} from "./../../../main.js";

const repository = new Repository(new Schema(
	'authCode', {
		userId: { type: 'string' },
		userEmail: { type: 'string' },
		loginCode: { type: 'string' },
		createdAt: { type: 'date' },
	},
	{
		dataStructure: 'JSON'
	}
), redisClient);

redisClient.on('ready', async () => {
	await repository.createIndex();
})

export default repository;