<?php

use App\Http\Controllers\Tenant\CourseController;
use App\Http\Controllers\Tenant\StudentController;
use App\Http\Controllers\Tenant\TeacherController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::prefix('{locale}')->middleware('locale')->group(function () {

Route::get('/', function () {

    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});


Route::middleware('auth')->group(function() {
    Route::resource('teachers', TeacherController::class)->only(['index', 'update', 'store', 'destroy']);
    Route::resource('students', StudentController::class)->only(['index', 'update', 'store', 'destroy']);
    Route::resource('courses', CourseController::class)->only(['index', 'update', 'store', 'delete']);
});





require __DIR__.'/settings.php';
require __DIR__.'/auth.php';


});


Route::fallback(function () {
    return to_route('home');
});
