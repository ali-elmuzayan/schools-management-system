<?php

namespace App\Trait;

use App\Models\Scopes\TenantScope;
use App\Models\Tenant;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

trait Tenantable
{

    public function tenant() {
        return $this->belongsTo(Tenant::class);
    }

    public static function tenantBooted() {

        static::addGlobalScope(new TenantScope);

        static::creating(function (Model $model){
    		$model['tenant_id'] =  Auth::user()->tenant_id;

        });
    }
}
