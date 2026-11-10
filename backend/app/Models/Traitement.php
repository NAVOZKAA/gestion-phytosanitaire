<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
class Traitement extends Model
{
    protected $fillable = [
    'nom',
    'description',
    'produit',
    'dosage'
];
public function maladies(): BelongsToMany
{
    return $this->belongsToMany(Maladie::class, 'maladies_traitements');
}

public function applications(): HasMany
{
    return $this->hasMany(ApplicationTraitement::class);
}
}
