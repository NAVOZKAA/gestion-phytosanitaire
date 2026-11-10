<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
class Maladie extends Model
{
    protected $fillable = [
    'nom',
    'description',
    'symptomes'
];
public function cultures(): BelongsToMany
{
    return $this->belongsToMany(Culture::class, 'cultures_maladies');
}

public function traitements(): BelongsToMany
{
    return $this->belongsToMany(Traitement::class, 'maladies_traitements');
}

public function applications(): HasMany
{
    return $this->hasMany(ApplicationTraitement::class);
}
}
