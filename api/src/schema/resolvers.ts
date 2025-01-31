import {
	DateTimeResolver,
	EmailAddressResolver,
	IPResolver,
} from 'graphql-scalars';
import { DateTime } from "luxon";
import {IContext} from "@type/context.types";

export default {
	DateTime: DateTimeResolver,
	EmailAddress: EmailAddressResolver,
	IPAddress: IPResolver,
	PageInfo: {
		total: (pageInfo) => pageInfo.total,
		perPage: (pageInfo) => pageInfo.perPage,
		pageCount: (pageInfo) => pageInfo.pageCount,
		currentPage: (pageInfo) => pageInfo.currentPage,
		hasNextPage: (pageInfo, _, __, {pagination}: IContext) => (pageInfo.currentPage < pageInfo.pageCount),
		hasPreviousPage: (pageInfo, _, __, {pagination}: IContext) => (pageInfo.currentPage <= pageInfo.pageCount + 1 && pageInfo.currentPage > 1),
	},
	Result: {
		success: (obj) => ((typeof obj === 'boolean' && obj === true) || obj?.success === true),
		errors: (obj) => (typeof obj === 'boolean' && obj === true) ? [] : obj?.errors,
	},
	InternalStatus: {
		mongo: (_, __, {systemStatus}) => systemStatus.mongo,
		redis: (_, __, {systemStatus}) => systemStatus.redis,
		requestCount: (_, __, {internal}) => internal.statistics.counters.get('requests'),
		warningCount: (_, __, {internal}) => internal.statistics.counters.get('warnings'),
		errorCount: (_, __, {internal}) => internal.statistics.counters.get('errors'),
		timeStartup: (_, __, {internal}) => internal.statistics.timeStartup,
		timeOnline: (_, __, {internal}) => {
			const start = DateTime.fromISO(internal.statistics.timeStartup.toISOString());
			const now = DateTime.now();

			const diff = now.diff(start, ['seconds', 'minutes', 'hours', 'days', 'months', 'years'])
				.normalize()
				.toObject();

			diff.seconds = Math.floor(diff.seconds)

			return diff;
		},
	},
	HealthCheck: {
		timestamp: () => new Date().toISOString(),
		internal: () => true,
	},
	Query: {
		healthCheck: () => true,
	},
}