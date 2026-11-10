<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ApplicationTraitement extends Model
{
    protected $fillable = [
        'culture_id',
        'maladie_id',
        'traitement_id',
        'utilisateur_id',
        'date_application',
        'date_suivi',
        'observations',
        'resultat'
    ];

    public function culture(): BelongsTo
    {
        return $this->belongsTo(Culture::class);
    }

    public function maladie(): BelongsTo
    {
        return $this->belongsTo(Maladie::class);
    }

    public function traitement(): BelongsTo
    {
        return $this->belongsTo(Traitement::class);
    }

    public function utilisateur(): BelongsTo
    {
        return $this->belongsTo(User::class, 'utilisateur_id');
    }
}