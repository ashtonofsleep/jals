import React from "react";

export namespace SCompProps {
	/**
	 * Universal base for all components
	 */
	export type TBase<children extends boolean = false> = {
		className?: string | Array<string>
	} & (children extends true ? {children?: React.ReactNode} : {})

	/**
	 * Local type shorthands
	 */
	type Button = React.ButtonHTMLAttributes<HTMLButtonElement>
	type Input = React.InputHTMLAttributes<HTMLInputElement>
	type Textarea = React.TextareaHTMLAttributes<HTMLTextAreaElement>
	type Div = React.HTMLAttributes<HTMLDivElement>

	/**
	 * Specific HTML elements with optional inline omits
	 */
	export type THTMLButton<omits extends (keyof Button)[]=[]> = Omit<Button, omits[number]>;
	export type THTMLInput<omits extends (keyof Input)[]=[]> = Omit<Input, omits[number]>;
	export type THTMLTextarea<omits extends (keyof Textarea)[]=[]> = Omit<Textarea, omits[number]>;
	export type THTMLDiv<omits extends (keyof Div)[]=[]> = Omit<Div, omits[number]>
}