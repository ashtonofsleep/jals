"use client";

import cx from "classnames";
import React from "react";
import {motion} from "motion/react";

import {TProps, styles} from "@comp/typography/common";

export const P = (
	{align, className, children, ...props}: TProps
): React.ReactNode => {
	return (
		<motion.p className={cx(
			'text-zinc-600',
			'dark:text-gray-300',
			(align && `text-${align}`),
			styles,
			className,
		)} {...props}>
			{children}
		</motion.p>
	)
}