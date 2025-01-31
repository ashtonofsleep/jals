"use client";

import cx from "classnames";
import React from "react";
import {motion} from "motion/react";

import {TProps, styles} from "@comp/typography/common";

export const H3 = (
	{align, className, children, ...props}: TProps
): React.ReactNode => {
	return (
		<motion.h3 className={cx(
			'font-bold text-base/tight sm:text-base/tight',
			(align && `text-${align}`),
			styles,
			className,
			'text-zinc-900',
			'dark:text-zinc-100',
		)} {...props}>
			{children}
		</motion.h3>
	)
}