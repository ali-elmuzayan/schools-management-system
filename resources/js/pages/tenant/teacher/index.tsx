import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { router, usePage } from '@inertiajs/react';
import React, { useState } from 'react';

interface Teacher {
    id: string;
    name: string;
    subject: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Teachers',
        href: '/teachers',
    },
];

const emptyForm = { name: '', subject: '' };

type FormState = typeof emptyForm & { id?: number };

export default function Index() {
    const { teachers } = usePage<{ teachers?: Teacher[] }>().props;
    const teacherList = teachers ?? [];

    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<FormState>(emptyForm);
    const [isEdit, setIsEdit] = useState(false);

    const handleOpenAdd = () => {
        setForm(emptyForm);
        setIsEdit(false);
        setOpen(true);
    };

    const handleOpenEdit = (teacher: Teacher) => {
        setForm({
            id: teacher.id,
            name: teacher.name,
            subject: teacher.subject,
        });
        setIsEdit(true);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setForm(emptyForm);
        setIsEdit(false);
    };

    const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handelSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit && form.id) {
            router.put(`/teachers/${form.id}`, form, {
                onSuccess: handleClose,
            });
        }
        router.post('/teachers', form, {
            onSuccess: handleClose,
        });
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this teacher?')) {
            router.delete(`/teachers/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Card className="m6-6 p-6">
                <div className="mb-4 flex justify-between">
                    <h1 className="text-2xl font-bold">Teachers</h1>
                    <Button onClick={handleOpenAdd}>Add Teacher</Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full rounded-lg border text-sm">
                        <thead className="bg-gray-100 dark:bg-neutral-800">
                            <tr>
                                <th className="px-4 py-2 text-left font-semibold">Id</th>
                                <th className="px-4 py-2 text-left font-semibold">Name</th>
                                <th className="px-4 py-2 text-left font-semibold">Subject</th>
                                <th className="px-4 py-2 text-left font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teacherList.map((teacher) => (
                                <tr key={teacher.id} className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-neutral-700">
                                    <td className="px-4 py-2">{teacher.id}</td>
                                    <td className="px-4 py-2">{teacher.name}</td>
                                    <td className="px-4 py-2">{teacher.subject}</td>
                                    <td className="px-4 py-2">
                                        <Button onClick={() => handleOpenEdit(teacher)} size="sm" variant="outline">
                                            Edit
                                        </Button>
                                        <Button onClick={() => handleDelete(teacher.id)} size="sm" variant="destructive">
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{isEdit ? 'Edit Teacher' : 'Add Teacher'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handelSubmit}>
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" value={form.name} onChange={handelChange} required />
                        </div>
                        <div>
                            <Label htmlFor="subject">Name</Label>
                            <Input id="name" name="name" value={form.name} onChange={handelChange} required />
                        </div>
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" value={form.name} onChange={handelChange} required />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button type="submit">{isEdit ? 'Update' : 'Create'}</Button>
                            <Button onClick={handleClose} variant="outline">
                                Cancel
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}

