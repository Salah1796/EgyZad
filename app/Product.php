<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

    protected $fillable = [
        'name','Desc', 'Start_price', 'is_used',
        'categorie_id','user_id','img'
    ];
    public function Categorie()
    {
        return $this->belongsTo(Categorie::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function auction()
    {
        //what product prod auction
        return $this->hasOne(Auction::class);
    }

}
