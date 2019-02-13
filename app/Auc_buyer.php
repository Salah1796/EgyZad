<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Auc_buyer extends Model
{
    protected $fillable = [
        'user_id','auction_id','price'
    ];

}
