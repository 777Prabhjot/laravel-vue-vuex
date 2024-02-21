<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

use Plank\Mediable\Mediable;

class Vlogs extends Model
{
    use HasFactory;
    use Mediable;

    protected $fillable = [
        'title',
        'description',
        'image',
        'posted_by'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'posted_by');
    }
}
