'use client';

import {useRouter} from "next/navigation";
import {useActionState} from "react";
import {LogOutAction} from "./LogOIut.action";

// Components
import {Button} from "@comp/Button/Button";
import {Spinner} from "@comp/Spinner/Spinner";


export const LogOutButton = () => {
	const router = useRouter()
	const [state, action, pending] = useActionState(LogOutAction, undefined);

	if (!pending && state?.result?.success) {
		router.back();
	}

	return (
		<Button onClick={action} btnType={'theme'}>{pending ? (<Spinner/>) : ("Log Out")}</Button>
	)
}