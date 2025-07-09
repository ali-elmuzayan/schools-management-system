import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import React, { useReducer } from 'react';
import { route } from 'ziggy-js';

interface Teacher {
    id: number;
    name: string;
    subject: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Teachers',
        href: '/ar/teachers',
    },
];

const emptyForm: Teacher = { id: 0, name: '', subject: '' };

type State = {
    open: boolean;
    edit: boolean;
    form: Teacher;
};

type Action =
    | { type: 'OPEN_ADD_FORM' }
    | { type: 'OPEN_EDIT_FORM'; payload: Teacher }
    | { type: 'CLOSE_FORM' }
    | { type: 'UPDATE_FORM_FIELD'; payload: { name: string; value: string } };

const initialState: State = {
    open: false,
    edit: false,
    form: emptyForm,
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'OPEN_ADD_FORM':
            return { ...state, open: true, edit: false, form: emptyForm };
        case 'OPEN_EDIT_FORM':
            return { ...state, open: true, edit: true, form: action.payload };
        case 'CLOSE_FORM':
            return { ...state, open: false, edit: false, form: emptyForm };
        case 'UPDATE_FORM_FIELD':
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.payload.name]: action.payload.value,
                },
            };
        default:
            return state;
    }
}

export default function Index() {
    const { teachers } = usePage<{ teachers?: Teacher[] }>().props;
    const teacherList = teachers ?? [];

    const [{ open, edit, form }, dispatch] = useReducer(reducer, initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: 'UPDATE_FORM_FIELD',
            payload: {
                name: e.target.name,
                value: e.target.value,
            },
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (edit && form.id) {
            router.put(route('teachers.update', form.id), form, {
                onSuccess: () => dispatch({ type: 'CLOSE_FORM' }),
            });
        } else {
            router.post(route('teachers.store'), form, {
                onSuccess: () => dispatch({ type: 'CLOSE_FORM' }),
            });
        }
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this teacher?')) {
            router.delete(route('teachers.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Teachers" />
            <Card className="m-6 p-6">
                <div className="mb-4 flex justify-between">
                    <h1 className="text-2xl font-bold">Teachers</h1>
                    <Button onClick={() => dispatch({ type: 'OPEN_ADD_FORM' })}>Add Teacher</Button>
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
                                    <td className="space-x-2 px-4 py-2">
                                        <Button onClick={() => dispatch({ type: 'OPEN_EDIT_FORM', payload: teacher })} size="sm" variant="outline">
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

            <Dialog open={open} onOpenChange={() => dispatch({ type: 'CLOSE_FORM' })}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{edit ? 'Edit Teacher' : 'Add Teacher'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" value={form.name} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="subject">Subject</Label>
                            <Input id="subject" name="subject" value={form.subject} onChange={handleChange} required />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button type="submit">{edit ? 'Update' : 'Create'}</Button>
                            <Button type="button" onClick={() => dispatch({ type: 'CLOSE_FORM' })} variant="outline">
                                Cancel
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}

// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import AppLayout from '@/layouts/app-layout';
// import { type BreadcrumbItem } from '@/types';
// import { Head, router, usePage } from '@inertiajs/react';
// import React, { useReducer } from 'react';

// interface Teacher {
//     id: number;
//     name: string;
//     subject: string;
// }

// const breadcrumbs: BreadcrumbItem[] = [
//     {
//         title: 'Teachers',
//         href: '/ar/teachers',
//     },
// ];

// const emptyForm = { id: 0, name: '', subject: '' };

// // type FormState = typeof emptyForm & { id?: number };

// const initialState = {
//     open: false,
//     edit: false,
//     form: emptyForm,
// };

// function reducer(state: any, action: any) {
//     switch (action.type) {
//         case 'form/open/add':
//             return { ...state, open: true, form: emptyForm };
//         case 'form/open/edit':
//             return {
//                 ...state,
//                 open: true,
//                 edit: true,
//             };

//         case 'form/close':
//             return { ...state, form: emptyForm, open: false, edit: false };
//         default:
//             return state;
//     }
// }

// export default function Index() {
//     const { teachers } = usePage<{ teachers?: Teacher[] }>().props;
//     const teacherList = teachers ?? [];

//     const [{ open, edit, form }, dispatch] = useReducer(reducer, initialState);

//     const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handelSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (edit && form.id) {
//             router.put(`/teachers/${form.id}`, form, {
//                 onSuccess: () => dispatch({ type: 'form/close' }),
//             });
//         }
//         router.post('/teachers', form, {
//             onSuccess: () => dispatch({ type: 'form/close' }),
//         });
//     };

//     const handleDelete = (id: number) => {
//         if (window.confirm('Are you sure you want to delete this teacher?')) {
//             router.delete(`/teachers/${id}`);
//         }
//     };

//     return (
//         <AppLayout breadcrumbs={breadcrumbs}>
//             <Head title="Teachers" />
//             <Card className="m-6 p-6">
//                 <div className="mb-4 flex justify-between">
//                     <h1 className="text-2xl font-bold">Teachers</h1>
//                     <Button onClick={() => dispatch({ type: 'form/open/add' })}>Add Teacher</Button>
//                 </div>
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full rounded-lg border text-sm">
//                         <thead className="bg-gray-100 dark:bg-neutral-800">
//                             <tr>
//                                 <th className="px-4 py-2 text-left font-semibold">Id</th>
//                                 <th className="px-4 py-2 text-left font-semibold">Name</th>
//                                 <th className="px-4 py-2 text-left font-semibold">Subject</th>
//                                 <th className="px-4 py-2 text-left font-semibold">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {teacherList.map((teacher) => (
//                                 <tr key={teacher.id} className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-neutral-700">
//                                     <td className="px-4 py-2">{teacher.id}</td>
//                                     <td className="px-4 py-2">{teacher.name}</td>
//                                     <td className="px-4 py-2">{teacher.subject}</td>
//                                     <td className="px-4 py-2">
//                                         <Button onClick={() => dispatch({ type: 'form/open/edit', payload: teacher })} size="sm" variant="outline">
//                                             Edit
//                                         </Button>
//                                         <Button onClick={() => handleDelete(teacher.id)} size="sm" variant="destructive">
//                                             Delete
//                                         </Button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </Card>
//             <Dialog open={open} onOpenChange={() => dispatch({ type: 'form/open/add' })}>
//                 <DialogContent>
//                     <DialogHeader>
//                         <DialogTitle>{edit ? 'Edit Teacher' : 'Add Teacher'}</DialogTitle>
//                     </DialogHeader>
//                     <form onSubmit={handelSubmit}>
//                         <div>
//                             <Label htmlFor="name">Name</Label>
//                             <Input id="name" name="name" value={form.name} onChange={handelChange} required />
//                         </div>
//                         <div>
//                             <Label htmlFor="subject">Name</Label>
//                             <Input id="name" name="name" value={form.name} onChange={handelChange} required />
//                         </div>
//                         <div>
//                             <Label htmlFor="name">Name</Label>
//                             <Input id="name" name="name" value={form.name} onChange={handelChange} required />
//                         </div>
//                         <div className="flex justify-end gap-2">
//                             <Button type="submit">{edit ? 'Update' : 'Create'}</Button>
//                             <Button onClick={() => dispatch({ type: 'form/close' })} variant="outline">
//                                 Cancel
//                             </Button>
//                         </div>
//                     </form>
//                 </DialogContent>
//             </Dialog>
//         </AppLayout>
//     );
// }
