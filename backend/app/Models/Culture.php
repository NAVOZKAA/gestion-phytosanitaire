<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class Culture extends Model
{protected $fillable = [
    'nom',
    'type',
    'superficie'
];
    public function maladies(): BelongsToMany
{
    return $this->belongsToMany(Maladie::class, 'cultures_maladies');
}

public function applications(): HasMany
{
    return $this->hasMany(ApplicationTraitement::class);
}
}
