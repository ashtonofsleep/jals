"use client";

import cx from 'classnames';
import React from 'react';
import {motion} from "motion/react";

import {TButtonProps} from "@comp/Button/Button.types";
import {typeStyles} from "@comp/Button/Button.styles";

export const Button = ({
    btnType = 'primary',
    effects = false,
    type = 'button',
    className,
    children,
    ...props
}: TButtonProps): React.ReactNode => {
    return (
        // @ts-ignore: Motion issue with duplicate declaration
        <motion.button
            type={type}
            className={cx(
                "trans px-5 py-3 text-base text-nowrap rounded-xl font-bold",
                {"shadow-xl hover:shadow-md hover:scale-[0.975]": effects},
                typeStyles[btnType],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    )
}