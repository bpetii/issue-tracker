'use client'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export const DeleteIssueButton = ({issueId}: {issueId: number}) => {
	const router = useRouter();

  return (
    <AlertDialog.Root>
			<AlertDialog.Trigger>
				<Button color='red'>Delete issue</Button>
			</AlertDialog.Trigger>
			<AlertDialog.Content>
				<AlertDialog.Title>
					Confirm deletion
				</AlertDialog.Title>
				<AlertDialog.Description>
					Are you sure you want to delete this issue? This issue cannot be undone
				</AlertDialog.Description>
				<Flex className='mt-4' gap="3">
					<AlertDialog.Cancel>
						<Button variant='soft' color='gray'>Cancel</Button>
					</AlertDialog.Cancel>
					<AlertDialog.Action>
						<Button 
						color='red' 
						onClick={async () => {
							await axios.delete('/api/issues/' + issueId);
							router.push('/issues')
							router.refresh();
						}}>Delete issue</Button>
					</AlertDialog.Action>
				</Flex>
			</AlertDialog.Content>
    </AlertDialog.Root>
  )
}
