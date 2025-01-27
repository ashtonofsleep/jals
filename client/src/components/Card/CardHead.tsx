"use client";

import cx from "classnames";
import React from "react";
import {SCompProps} from "@type/common";
import {MotionProps} from "framer-motion";

type TProps = {
	flex?: boolean
} & SCompProps.TBase<true> & SCompProps.THTMLDiv<["className"]> & MotionProps

export const CardHead = (
	{flex = true, className, children, ...props}: TProps
): React.ReactNode => {
	return (
		<div className={cx(
			'p-8',
			{'flex flex-col gap-4': flex},
			className,
		)} {...props}>
			{children}
		</div>
	)
}