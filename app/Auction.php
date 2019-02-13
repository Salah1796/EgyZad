<?php

namespace App;
use App\Product;
use App\Auth;
use App\User;
use Illuminate\Database\Eloquent\Model;

class Auction extends Model
{
    protected $fillable =[

        'Start_Time','End_Time','city',	'Start_price',
         'product_id','user_id','current_max_Price'
    ];
    public function product()
    {
        //what product in this auction
        return $this->belongsTo(Product::class);
    }
    public function user()
    {
        return $this->hasOne(user::class);
    }
}
