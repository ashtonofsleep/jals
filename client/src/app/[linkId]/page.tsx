"use server";

// @todo Refactor into client and server components to capture detailed user agent via hints API

import cx from "classnames";
import React from "react";
import * as motion from "motion/react-client";
import { redirect } from "next/navigation";
import Link from "next/link";

// Metadata
import {Metadata} from "next";
export const generateMetadata = async (
	{ params }
): Promise<Metadata> => {
	const linkId = (await params).linkId;
	return {
		title: `Redirecting ${linkId}...`,
	}
}

import { GET_LINK, CLICK_ADD } from "./queries";
import { getClient, query } from "@lib/apolloClient";
import { getHeaders } from "@lib/auth/session";

// Components
import {Spinner} from "@comp/Spinner/Spinner";
import {Tooltip} from "@comp/Tooltip/Tooltip";
import {Button} from "@comp/Button/Button";
import {LinkNotFound} from "@comp/organisms/NotFound";
import {Badge} from "@comp/Badge/Badge";
import {H2} from "@comp/Typography/H2";
import {P} from "@comp/Typography/P";
import {Card} from "@comp/Card/Card";
import {CardHead} from "@comp/Card/CardHead";
import {CardBody} from "@comp/Card/CardBody";
import {CardFooter} from "@comp/Card/CardFooter";
import {Container} from "@comp/Container/Container"

import {container, item} from "@lib/motion/stagger";

const Page = async (
	{params}
) => {
	const linkId: string = (await params).linkId;
	const requestContext = await getHeaders();

	// @todo: Param validation
	// @todo: Test query and mutation edge cases, error handling
	
	const {data: {link}, loading} = await query({query: GET_LINK, variables: {linkId: linkId}, context: requestContext});

	const registerClick = async () => {
		const {data: {createClick: {click}}} = await getClient().mutate({mutation: CLICK_ADD, variables: {input: {linkId: linkId}}, context: requestContext, errorPolicy: 'all'});
		return click;
	}

	if (!loading && link && link.target) {
		if (!link.caution && link.active) {
			await registerClick();
			redirect(link.target);
		} else if (!link.active) {
			redirect('/');
		} else if (link.caution) {
			await registerClick();
		}
	}

	return (
		<Container>
			{link ? (
				<>
					{loading ? (<Spinner />) : (
						<Card variants={container} structured>
							<CardHead variants={container} className={'items-center'}>
								{/* @ts-ignore workaround for `anchorName` CSS property */}
								<Badge variants={item} badgeType={link.caution ? 'danger' : 'success'} tooltip ping style={{anchorName: "--active-popover"}} popoverTarget={'active-popover'} popoverTargetAction={'toggle'}>
									{link.id}
								</Badge>
								{/* @ts-ignore workaround for `positionAnchor` CSS property */}
								<Tooltip style={{positionAnchor: "--active-popover"}} id={"active-popover"}>
									<p className={cx('font-bold')}>What does that mean?</p>
									<p>Currently, this links
										is {link.active ? "active" : "not active"}{link.active && link.caution && (" and has been flagged.")}.</p>
									<p>When someone uses this short link,
										they <b>{!link.caution ? "will be" : "will not be"}</b> automatically redirected.
									</p>
									<p>For safety purposes automatic redirects only work if the link does not have any
										flags.</p>
								</Tooltip>

								<H2 variants={item} align={'center'}>
									{loading && ("Resolving link...")}
									{!link.caution && (`You will be redirected soon`)}
									{link.caution && ("Confirm your destination")}
								</H2>
							</CardHead>
							<CardBody variants={container}>
									{link.caution &&
										<>
											<P variants={item} className={'font-bold'}>This link has been flagged or is not active.</P>
											<P variants={item}>Check if this is the destination you expected and click the button below to continue.</P>
										</>
									}

									<motion.div variants={item} className={"w-full gap-2 flex flex-col text-left"}>
										<p className={"w-full px-4 py-2 bg-zinc-200 text-zinc-600 rounded-xl border border-transparent font-mono text-wrap break-words overflow-hidden"}>{link.target}</p>
									</motion.div>
							</CardBody>
							<CardFooter variants={container}>
								{link.caution &&
									<>
										<Link href={`/inspect/${link.id}`} passHref>
											<Button variants={item} btnType={'dark'}>Inspect link</Button>
										</Link>
										<Link href={link.target} passHref>
											<Button variants={item} effects={true}>Proceed to destination</Button>
										</Link>
									</>
								}
								{!link.caution && <Spinner/>}
							</CardFooter>
						</Card>
					)}
				</>
			) : (
				<LinkNotFound linkId={linkId} context={'redirect'}/>
			)}
		</Container>
	)
}

export default Page;