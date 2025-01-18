"use server";

import {REQUEST_AUTH_CODE} from "../../shared/auth/shared.auth.query";
import {getClient} from "../../../lib/apollo-client";
import {ResponseType} from "@type/data/Response";
import {getSessionHeader} from "../../../lib/auth/session";

export const RegisterRequestAction = async (
    state: ResponseType,
    formData: FormData
) => {
    const email = formData.get('email');

    const {data: {requestAuthCode: data}} = await getClient().mutate({
        mutation: REQUEST_AUTH_CODE,
        variables: {
            input: {
                email: email,
                action: 'REGISTER',
            }
        },
        context: await getSessionHeader(true),
    })

    return {
        ...data,
        email
    };
}