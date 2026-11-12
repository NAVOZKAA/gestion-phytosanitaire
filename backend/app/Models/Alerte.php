<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Alerte extends Model
{
    protected $fillable = [
        'titre',
        'message',
        'type',
        'date_alerte',
        'lue',
        'application_traitement_id',
        'utilisateur_id'
    ];

    public function applicationTraitement(): BelongsTo
    {
        return $this->belongsTo(ApplicationTraitement::class);
    }

    public function utilisateur(): BelongsTo
    {
        return $this->belongsTo(User::class, 'utilisateur_id');
    }
}