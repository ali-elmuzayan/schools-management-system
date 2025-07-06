import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Courses',
        href: '/courses',
    },
];
interface Course {
    id: number;
    name: string;
    description: string;
    duration: number;
}

const emptyForm = { name: '', description: '', duration: 0 };
type FormState = typeof emptyForm & { id?: number };

export default function Index() {
    const { courses } = usePage<{ courses?: Course[] }>().props;
    const courseList = courses ?? [];

    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [form, setForm] = useState<FormState>(emptyForm);

    // functions
    const handelOpenAdd = () => {
        setForm(emptyForm);
        setIsEdit(false);
        setIsOpen(true);
    };

    const handelOpenEdit = (course: Course) => {
        setForm({
            id: course.id,
            name: course.name,
            description: course.description,
            duration: course.duration,
        });
        setIsEdit(true);
        setIsOpen(true);
    };

    const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handelClose = () => {
        setIsOpen(false);
        setIsEdit(false);
        setForm(emptyForm);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            router.delete(`/course/${form.id}`);
        }
    };

    const handelSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit && form.id) {
            // router put
        }
        router.post('/courses', form, {
            onSuccess: handelClose,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Courses" />
            <Card className="m-6 p-6">
                <div className="mb-4 flex justify-between">
                    <h1>Courses</h1>
                    <Button onClick={handelOpenAdd}>Add Course</Button>
                </div>
                <div className="mt-4 overflow-x-auto">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courseList.map((course) => (
                                <tr key={course.id}>
                                    <td>{course.name}</td>
                                    <td>{course.description}</td>
                                    <td>{course.duration}</td>
                                    <td>
                                        <Button onClick={() => handelOpenEdit(course)} variant="outline" size="sm">
                                            Edit
                                        </Button>
                                        <Button onClick={() => handleDelete(course.id)} variant="destructive" size="sm">
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{isEdit ? 'Edit Course' : 'Add Course'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handelSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input type="text" id="name" value={form.name} onChange={handelChange} required />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Input type="text" id="description" value={form.description} onChange={handelChange} required />
                        </div>
                        <div>
                            <Label htmlFor="duration">Duration</Label>
                            <Input type="text" id="duration" value={form.duration} onChange={handelChange} required />
                        </div>
                        <hr />
                        <div className="flex justify-end gap-2">
                            <Button type="submit">{isEdit ? 'Update' : 'Create'}</Button>
                            <Button onClick={handelClose} variant="outline">
                                Cancel
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
