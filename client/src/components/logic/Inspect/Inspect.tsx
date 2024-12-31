'use client'

import {useRef} from "react";
import {redirect} from "next/navigation";
import cx from "classnames";

export const Inspect = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className={cx('flex w-full flex-col gap-8')}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    redirect('inspect/'+inputRef?.current?.value, 'push');
                }}

                className={cx(
                    'flex group',
                    'w-full',
                    'rounded-xl',
                    'transition-all',
                    'duration-150',
                    'shadow-md',
                    'relative',
                    'shadow-zinc-900/20',
                    'focus-within:shadow-lg hover:shadow-lg',
                )}>

                <input
                    required
                    type={"text"}
                    ref={inputRef}
                    className={cx(
                        'flex-1',
                        'bg-white',
                        'transition-all duration-150',
                        'text-zinc-600 text-md caret-orange-500',
                        'outline-none',
                        'rounded-xl rounded-r-none',
                        'border border-transparent border-r-0 px-4 py-2 pr-7 -mr-3',
                        'placeholder:text-zinc-600/50',
                        'group-focus-within:border-orange-500',
                    )} placeholder="Input your URL code or paste the full link"/>
                <button
                    type="submit"
                    className={cx("bg-zinc-900 group-focus-within:bg-orange-500 group-focus-within:hover:bg-orange-400 hover:bg-zinc-700 transition-all duration-150 text-white text-sm font-bold px-5 py-3 rounded-xl flex-0")}>
                    Inspect
                </button>
            </form>
        </div>
    )
}