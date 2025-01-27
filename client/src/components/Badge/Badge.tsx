"use client";

import cx from "classnames";
import React from "react";
import {motion} from "motion/react";

import {styles} from "@comp/Badge/Badge.styles";

import {TBadgeProps} from "@comp/Badge/Badge.types";

import {Ping} from "@comp/Badge/Ping/Ping";

export const Badge = (
	{tooltip = false, ping = false, badgeType = 'light', children, ...props}: TBadgeProps
): React.ReactNode => {
	return (
		<motion.button disabled={!tooltip} {...props} className={cx(
			'c-trans-4 border font-bold flex flex-row gap-2 items-center rounded-full py-1 px-2 text-sm float-end text-nowrap overflow-hidden shadow-none',
			'shadow-md shadow-transparent w-fit',
			'dark:shadow-gray-900/20',
			{'cursor-help': tooltip},
			styles[badgeType],
        )}>
			{ping && <Ping pingType={badgeType} />}
			{children}
		</motion.button>
	)
}