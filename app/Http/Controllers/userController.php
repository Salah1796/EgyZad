<?php

namespace App\Http\Controllers;
use Auth;
use App\Auction;
use App\Product;
use App\User;
use App\Auc_buyer;
use Illuminate\Http\Request;
class userController extends Controller
{
    public  function  show($id)
    {
        $user=User::find($id);

        $add_prod=$user->products;
        $selled_prod=null;
        $futer_prod=null;
        $cuurent_prod=null;
//dd($add_prod);
        $n=date('Y-m-d')." ".date("h:i:s");
        if($add_prod!=null)
        {
           foreach ($add_prod as $prod) {
              // echo $prod->auction;
                  if($prod->auction)
                  {
               if ($prod->auction->Start_Time <= $n && $prod->auction->End_Time >$n) {
                   $cuurent_prod[] = $prod;

               }

               if ($prod->auction->End_Time <= $n) {
                   $selled_prod[] = $prod;

               }

               if ($prod->auction->Start_Time > $n) {

                   $futer_prod[] = $prod;

               }
                  }
           }
           }
    return view("profile",compact('user','selled_prod','futer_prod','cuurent_prod'));

    }
}
