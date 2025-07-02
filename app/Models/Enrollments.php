<?php

namespace App\Models;

use App\Trait\Tenantable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enrollments extends Model
{
    /** @use HasFactory<\Database\Factories\EnrollmentsFactory> */
    use HasFactory;
    use Tenantable;
    protected $guarded = [];

}
