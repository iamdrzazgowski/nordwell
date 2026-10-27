'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const labelClass =
    'mb-2 block font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground';
const inputClass =
    'h-10 w-full bg-background px-3 text-[13px] shadow-none focus-visible:border-foreground focus-visible:ring-0';

export function ChangePasswordDialog({ onChanged }: { onChanged: () => void }) {
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState('');
    const [next, setNext] = useState('');
    const [confirm, setConfirm] = useState('');

    const tooShort = next.length > 0 && next.length < 8;
    const mismatch = confirm.length > 0 && confirm !== next;
    const canSubmit =
        current.length > 0 && next.length >= 8 && confirm === next;

    const reset = () => {
        setCurrent('');
        setNext('');
        setConfirm('');
    };

    const handleOpenChange = (value: boolean) => {
        setOpen(value);
        if (!value) reset();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit) return;
        onChanged();
        handleOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger
                render={
                    <Button variant='outline' className='h-9 px-3.5'>
                        Change password
                    </Button>
                }
            />

            <DialogContent className='gap-0 p-0 sm:max-w-sm'>
                <DialogHeader className='border-b px-6 py-4'>
                    <DialogTitle>Change password</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-5 p-6'>
                        <div>
                            <Label htmlFor='pw-current' className={labelClass}>
                                Current password
                            </Label>
                            <Input
                                id='pw-current'
                                type='password'
                                autoComplete='current-password'
                                value={current}
                                onChange={(e) => setCurrent(e.target.value)}
                                autoFocus
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <Label htmlFor='pw-new' className={labelClass}>
                                New password
                            </Label>
                            <Input
                                id='pw-new'
                                type='password'
                                autoComplete='new-password'
                                value={next}
                                onChange={(e) => setNext(e.target.value)}
                                aria-invalid={tooShort || undefined}
                                className={inputClass}
                            />
                            <p
                                className={
                                    tooShort
                                        ? 'mt-1 text-[12px] text-destructive'
                                        : 'mt-1 text-[12px] text-muted-foreground'
                                }>
                                At least 8 characters.
                            </p>
                        </div>

                        <div>
                            <Label htmlFor='pw-confirm' className={labelClass}>
                                Confirm new password
                            </Label>
                            <Input
                                id='pw-confirm'
                                type='password'
                                autoComplete='new-password'
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                aria-invalid={mismatch || undefined}
                                className={inputClass}
                            />
                            {mismatch && (
                                <p className='mt-1 text-[12px] text-destructive'>
                                    Passwords don&apos;t match.
                                </p>
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type='button'
                            variant='outline'
                            onClick={() => handleOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type='submit' disabled={!canSubmit}>
                            Update password
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
