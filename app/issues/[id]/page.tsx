import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'

interface Props {
    params: { id: string},

}

const IssueDetailPage = async ({params}: Props) => {
	if (typeof parseInt(params.id) !== 'number') notFound()
	const issue = await prisma.issue.findUnique({
		where: {id: parseInt(params.id)}
	})

	if (!issue) 
		notFound();

  return (
    <div>
			<Heading>{issue.title}</Heading>
			<Flex gap='3' my='2'>
				<IssueStatusBadge status={issue.status} />
				<p>{issue.created_at.toDateString()}</p>
			</Flex>
			<Card>
				<Text>{issue.description}</Text>
			</Card>
		</div>
  )
}

export default IssueDetailPage