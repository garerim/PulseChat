"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useModal } from '@/hooks/use-modal-store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


const formSchema = z.object({
    title: z.string().min(1, {
        message: 'Poll title is required',
    }),
    description: z.string().min(1, {
        message: 'Poll description is required',
    }),
    choice1: z.string().min(1, {
        message: 'Poll description is required',
    }),
    choice2: z.string().min(1, {
        message: 'Poll description is required',
    }),
    isPublic: z.boolean().default(false),
})

export const EditSondageModal = () => {
    const { isOpen, onClose, type, data } = useModal()
    const router = useRouter()

    const isModalOpen = isOpen && type === 'editSondage'
    const {sondage} = data;

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            choice1: '',
            choice2: '',
            isPublic: false,
        },
    })

    useEffect(() => {
        if (sondage) {
          form.setValue("title", sondage.title);
          form.setValue("description", sondage.description);
          form.setValue("choice1", sondage.choice1);
          form.setValue("choice2", sondage.choice2);
          form.setValue("isPublic", sondage.isPublic);
        }
      }, [form, sondage])

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/sondage/${sondage?.id}`, values);

            form.reset()
            router.refresh()
            onClose();
        } catch (error) {
            console.log(error);
        }
    }

    const handleClose = () => {
        form.reset()
        onClose()
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className='bg-white text-black p-0 overflow-hidden'>
                <DialogHeader className='pt-8 px-6'>
                    <DialogTitle className='text-2xl text-center font-bold'>Edit your poll</DialogTitle>
                    <DialogDescription className='text-center text-zinc-500'>
                        Edit the <span className='font-bold text-indigo-500'>{sondage?.title}</span> poll
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                        <div className='space-y-8 px-6'>

                            <FormField control={form.control}
                                name='title'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'>Poll Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className='bg-zinc-300/50 border-0 focus-visible :ring-0 text-black focus-visible:ring-offset-0'
                                                placeholder='Enter Poll Title'
                                                {...field} />
                                        </FormControl>
                                    </FormItem>
                                )} />

                            <FormField control={form.control} name='description' render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'>Poll Description</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            className='bg-zinc-300/50 border-0 focus-visible :ring-0 text-black focus-visible:ring-offset-0'
                                            placeholder='Enter server name'
                                            {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <div className='flex items-center justify-between gap-x-2'>
                                <FormField control={form.control} name='choice1' render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'>Choice 1</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className='bg-zinc-300/50 border-0 focus-visible :ring-0 text-black focus-visible:ring-offset-0'
                                                placeholder='Enter the choice 1'
                                                {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name='choice2' render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'>Choice 2</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className='bg-zinc-300/50 border-0 focus-visible :ring-0 text-black focus-visible:ring-offset-0'
                                                placeholder='Enter the choice 2'
                                                {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                        </div>
                        <DialogFooter className='bg-grey-100 px-6 py-4'>
                            <FormField control={form.control} name='isPublic' render={({ field }) => (
                                <FormItem className='w-full flex items-center gap-x-2'>
                                    <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70 mt-2'>Is the poll public ?</FormLabel>
                                    <FormControl className=''>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <Button disabled={isLoading}>Edit</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    )
}