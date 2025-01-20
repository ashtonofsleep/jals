"use client";

import React, {useContext} from "react";
import {ThemeContext} from "@ctx/theme/theme.context";
import cx from "classnames";

type TProps = {
    version: string | undefined
}

export const Footer = ({version}: TProps): React.ReactNode => {
    const {handleTheme} = useContext(ThemeContext);

    return (
        <footer className={cx(
            'flex flex-row w-full mt-8 px-8 py-4 gap-8 items-center',
            'bg-white border-t border-zinc-900/15',
            'dark:bg-gray-900 dark:border-gray-700',
            'c-trans-4',
        )}>
            <div className={cx('flex w-full')}>

                <p className="text-zinc-400 text-sm">
                    Made by Sebastian Wirkijowski. {version && (` Version ${version}.`)}
                </p>

            </div>
            <div className={cx('flex items-end')}>
                <button onClick={() => handleTheme()}>Switch theme</button>
            </div>
        </footer>
    )
}