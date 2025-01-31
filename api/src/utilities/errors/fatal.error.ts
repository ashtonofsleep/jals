import {InternalError} from './internal.error';

class FatalError extends InternalError {
	name: string = 'FatalError';
	level: string = 'fatal';

	constructor (msg: string, code: string, domain?: string, stack?: string|boolean, ...payload: any[]) {
		super(msg, code, domain, stack, ...payload);

		// Log error and call sentry
		super.log();
		super.sentry();
		super.axiom();

		// @todo: Call shutdown function

		return this;
	}
}

export default FatalError;