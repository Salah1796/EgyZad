<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Favauc extends Model
{
    protected $fillable = [
        'user_id','auction_id'
    ];
}
