'use client'
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import {useForm, Controller} from 'react-hook-form';
import { Button, Callout, TextField } from '@radix-ui/themes'
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useState } from "react";
import {zodResolver} from '@hookform/resolvers/zod';
import { issueSchema } from "@/app/validationSchemas";
import {z} from 'zod';
import {ErrorMessage, Spinner} from "@/app/components";
import { Issue } from "@prisma/client";

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {ssr: false})

type IssueFormData = z.infer<typeof issueSchema>

interface Props {
	issue?: Issue
}

function IssueForm({issue}: Props) {
	const router = useRouter();
	const {register, control, handleSubmit, formState: {errors}} = useForm<IssueFormData>({
		resolver: zodResolver(issueSchema)
	});

	const [error, setError] = useState('')
	const [isSubmitting, setSubmitting] = useState(false);

	const onSubmit = handleSubmit( async (data)=> {
		try {
			setSubmitting(true);
			if (issue) 
				await axios.patch('/api/issues/' + issue.id, data)
			else
				await axios.post('/api/issues', data)
			router.push('/issues');
			router.refresh();
		} catch(error) {
			setSubmitting(false);
			setError('An unexpected error occured');
		}
	});

  return (
		<div className="max-w-xl ">
			{error && <Callout.Root color="red" className="mb-5">
				<Callout.Text>{error}</Callout.Text>
			</Callout.Root>}
			<form className='space-y-3' onSubmit={onSubmit}>
					<TextField.Root>
						<TextField.Input defaultValue={issue?.title} placeholder='Title' {...register('title')}/>
					</TextField.Root>
					<ErrorMessage>
						{errors?.title?.message}
					</ErrorMessage>
					<Controller 
						defaultValue={issue?.description}
						name="description" 
						control={control} 
						render={({field}) => <SimpleMDE placeholder='description' {...field} />}
					/>
					<ErrorMessage>
						{errors?.description?.message}
					</ErrorMessage>
					<Button disabled={isSubmitting}> 
						{issue? 'Update issue': 'Submit new issue'} {' '} 
						{isSubmitting && <Spinner />} 
					</Button>
			</form>
		</div>
   
  )
}

export default IssueForm