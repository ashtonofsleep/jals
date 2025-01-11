import {ContextInterface as CtxI} from "../../types/context.types";
import {IdType} from "../../types/id.types";
import {HydratedUser} from "../../types/models/user.types";

export default {
	User: {
		id: ({_id}: {_id: IdType}): IdType => { return _id; },
		createdBy: async ({createdBy}: {createdBy: IdType}, _: any, {models: {user}}: CtxI): Promise<HydratedUser|null> => (createdBy) ? await user.findOne({_id: createdBy}) : null,
		updatedBy: async ({updatedBy}: {updatedBy: IdType}, _: any, {models: {user}}: CtxI): Promise<HydratedUser|null> => (updatedBy) ? await user.findOne({_id: updatedBy}) : null,
	},
	Query: {
		user: async (_: any, args, { models: {user}}: CtxI): Promise<HydratedUser|null> => await user.findOne({id: args.userId}),
	},
}