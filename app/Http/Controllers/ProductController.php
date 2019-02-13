<?php

namespace App\Http\Controllers;

use App\Product;
use App\Auction;
use Illuminate\Http\Request;
use App\Categorie;
use App\User;
use  Illuminate\Support\Facades\Storage;
use Auth;
class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $cats=Categorie::All();
       // $brands=Brand::All();

        return view('add_product',compact('cats'));

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
       // dd($request);
        $n=date('Y-m-d')." ".date("h:i:s");
        $this->validate($request,[


              'img'  =>   ' image|nullable|max:1999',
              //'strtime' => 'required|min:'.$n,
              'endtime' => 'required',
              'name'  => 'required|max:100'

        ]);


        if($request->hasFile('img'))
        {

            // dd($request->post_image->getClientOriginalName());
            //file_eith_extention asd.png
            $file_with_exten=$request->file('img')->getClientOriginalName();
            //file_name_only
            $filName=pathinfo("$file_with_exten",PATHINFO_FILENAME);
            // dd($filName);;

            $extention=$request->file("img")->extension();
            //dd($extention);
            //file name to store
            $file_name_to_stor=$filName."_".time().".".$extention;
            $path=$request->file("img")->storeAs("public/prod_img/",$file_name_to_stor);
            // return response()->download( $file_name_to_stor,'upfile');
        }
        else
        {
            $file_name_to_stor="";

        }

//dd($request['Cat']);
        Product::Create([

            'name'=>$request['name'],
            'Desc'=>$request['desc'],
            'Start_price'=>$request['startPrice'],
            'End_price'=>$request['End_price'],
            'is_used'=>$request['used'],
            'img'=> $file_name_to_stor,
            'categorie_id'=>$request['Cat'],
            'user_id'=>Auth::user()->id





        ]);

        Auction::Create([


            'Start_Time'=>$request['strtime'],
            'End_Time'=>$request['endtime'],
            'Start_price'=>$request['startPrice'],
            'current_max_Price'=>$request['startPrice'],
            'product_id'=>Product::All(['id'])->sort()->max()['id'],





        ]);
        return redirect('/');

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        //
    }
}
