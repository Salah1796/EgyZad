<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Notifications\NewBid;

class User extends Authenticatable
{
    use Notifiable;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'Full_Name','username', 'email','phoneNum','Paypalemail','img'
        ,'gender','password'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */

    protected $hidden = [
        'password', 'remember_token',
    ];

    public function products()
    {
           //what user sell
        return $this->hasMany(product::class);
    }

    public function auctions()
    {
        //what user buy
        return $this->hasMany(auction::class);
    }
    public function auc_buyers()
    {
        //what user bids
        return $this->hasMany(Auc_buyer::class);
    }

}
