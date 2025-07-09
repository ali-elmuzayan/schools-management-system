<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use App\Http\Requests\StoreTeacherRequest;
use App\Http\Requests\UpdateTeacherRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teachers = Teacher::all();


        return Inertia::render('tenant/teacher/index', compact('teachers'));
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTeacherRequest $request)
    {
        dump(Auth::user()->tenant);
        dd($request->all());
        $validated = $request->validated();
        $validated = array_merge($validated, ['school_id' => auth()->user()->school_id]);
        Teacher::create($validated);

        return redirect()->route('teachers.index');
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTeacherRequest $request,  $lang,  $teacher)
    {

        $validated = $request->validated();

        $teacher = Teacher::findOrFail($teacher);


        $teacher->update($validated);

        return redirect()->route('teachers.index');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($lang, Teacher $teacher)
    {

        $teacher->delete();
        return redirect()->route('teachers.index');
    }
}
