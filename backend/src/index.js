import { makeExecutableSchema } from "@graphql-tools/schema";

import link from './link';
import click from './click';

import { query, utils } from './types';
import { mutation } from './mutations';

export const schema = makeExecutableSchema({
	typeDefs: [
		query,
		mutation,
		utils,
		link.types,
		click.types
	],
	resolvers: [
		link.resolvers,
		click.resolvers
	]
})

export const models = {
	link: link.model,
	click: click.model
}