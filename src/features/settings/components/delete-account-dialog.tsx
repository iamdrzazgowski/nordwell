'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const CONFIRM_WORD = 'DELETE';

export function DeleteAccountDialog() {
    const [open, setOpen] = useState(false);
    const [typed, setTyped] = useState('');

    const handleOpenChange = (value: boolean) => {
        setOpen(value);
        if (!value) setTyped('');
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger
                render={
                    <Button variant='destructive' className='h-9 px-3.5'>
                        Delete account
                    </Button>
                }
            />

            <DialogContent className='gap-0 p-0 sm:max-w-sm'>
                <DialogHeader className='border-b px-6 py-4'>
                    <DialogTitle>Delete account</DialogTitle>
                </DialogHeader>

                <div className='flex flex-col gap-5 p-6'>
                    <DialogDescription>
                        This permanently removes your portfolio, transactions
                        and watchlist. This can&apos;t be undone.
                    </DialogDescription>

                    <div>
                        <Label
                            htmlFor='delete-confirm'
                            className='mb-2 block font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground'>
                            Type {CONFIRM_WORD} to confirm
                        </Label>
                        <Input
                            id='delete-confirm'
                            value={typed}
                            onChange={(e) => setTyped(e.target.value)}
                            autoComplete='off'
                            autoFocus
                            className='h-10 w-full bg-background px-3 font-mono text-[13px] shadow-none focus-visible:border-foreground focus-visible:ring-0'
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        type='button'
                        variant='outline'
                        onClick={() => handleOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button
                        type='button'
                        variant='destructive'
                        disabled={typed !== CONFIRM_WORD}
                        onClick={() => handleOpenChange(false)}>
                        Delete permanently
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
