@extends('layouts.app')
@section('header')
    <style>
        .left,.right{


        }
        .left{
            font-size: 17px;

            font-family:"Times New Roman";

        }
        .right{

            font-size: 17px;
            font-family: Monospaced;

        }


    </style>
    @endsection
@section('content')


    <div class="container-outer user-pub_profile">


        <div class="container">





            <p id="back-top-right">
                <a href="#"><span></span></a>
            </p>

            <div class="clear"></div>


            <div class="flash-wrap">
            </div>





            <div class="content user_public_profile">
                <!-- RIGHT BLOCK -->
                <div id="right-block" style="">
                    <!-- SELLER INFORMATION -->
                    <div id="description">
                        <div class="pp-img"><img id="profile_picture_img" src="{{ asset('mydesign/img/no-user.png') }}" width="120" height="" alt="Seller's picture"></div>

                        <ul id="user_data" style="">
                            <li ><span class="left">Username</span> &nbsp;  &nbsp; <span class="right" style="color: #721c24">{{$user->username}}</span></li>
                            <li><span class="left">Mobile </span> &nbsp;  &nbsp; <span class="right">{{$user->phoneNum}}</span></li>
                            <li><span class="left">Email</span>  &nbsp; &nbsp; <span style=" color: #111;font-weight: 600;">{{$user->email}}</span></li>
                            <li><span class="left">Rate</span>
                           <span class="right">
                               @for($i=0;$i<$user->Rate;$i++)
                                <img title="{{$user->Rate}}" src="{{ asset('mydesign/img/ico_vot_ov.gif') }}">

                                   @endfor

                                   @for($i=$user->Rate;$i<5;$i++)
                   <img title="Without information" src="{{ asset('mydesign/img/ico_vot_no.gif') }}">
@endfor


                            </span>

                            </li>
                            <li>
                            <span class="left"> votes   </span>   &nbsp;  &nbsp;  <span class="right"> {{$user->votes}}</span>
                            </li>
                            <li><span class="" style="font-weight: 500;color: #777;">Registered on:&nbsp;&nbsp;&nbsp;&nbsp;:</span>
                                <span class="right"> {{$user->created_at->toFormattedDateString()}}</span>
                            </li>
                        </ul>
                    </div>



                    <div class="pub-contact-wrap">
                        <div class="ins">
                             <a id="pub-contact" href="#" class="btn btn-primary" rel="8">Contact seller</a>

                         </div>
                     </div>

                </div>


                <!-- Item Banner #1 -->
                <div id="public-items" class="white" style="">
                    <h1 class="left"> All Products Add by: <span class="right" style="color: #721c24;font-size: 16px">{{$user->username}}</span></h1>
                    @if($cuurent_prod!=null)

                    <div class="block">
                        <h1>Products  Currently in  Auction : </h1>

                        <div class="wrap">

                            @foreach($cuurent_prod as $prod)





                            <div class="simple-prod o1">
                                <div class="simple-wrap">

                                    <div class="item-img-wrap">

                                        <div class="category-link"><span><i class="fa fa-newspaper-o"></i> {{$prod->Categorie->name}}</span></div>

                                        <a class="img-link" href="{{url("/auctions/".$prod->auction->id)}}">
                                            <img class="lazy link0" src="/storage/prod_img/{{$prod->img}}" data-original="../../img/0/30_thumbnail.jpg" title="Enjoy Ibiza" alt="Enjoy Ibiza" />
                                            <img class="lazy link1" src="/storage/prod_img/{{$prod->img}}" data-original="../../img/0/31_thumbnail.jpg" title="Enjoy Ibiza" alt="Enjoy Ibiza" />
                                        </a>
                                        <a class="title" href="{{url("/auctions/".$prod->auction->id)}}">{{$prod->name}}</a>

                                    </div>





                                    <div class="price" style="text-align:center;">


                                        <div id="item20" class="atimer auction-time text-center timer-loop" data-endtime="618" data-id="20" data-end-time="2017-10-27 18:09:04" data-start-time="2017-10-27 17:44:04"> </div>





                                        <br />
                                        <span style="font-size: 15px;color: #0f6674" title="{{$prod->auction->current_max_Price}}">Max Price: </span><span style="color: red;">${{$prod->auction->current_max_Price}}</span>
                                    </div>
                                </div>
                            </div>


 @endforeach





                        </div>
                    </div>


                    @endif
                    @if($selled_prod!=null)

                        <div class="block">
                        <h1> Products Successfully  Sold: </h1>

                        <div class="wrap">

                            @foreach($selled_prod as $prod)

                         <div class="simple-prod o1">
                                    <div class="simple-wrap">

                                        <div class="item-img-wrap">

                                            <div class="category-link"><span><i class="fa fa-newspaper-o"></i> {{$prod->Categorie->name}}</span></div>

                                            <a class="img-link" href="#">
                                                <img class="lazy link0" src="/storage/prod_img/{{$prod->img}}" data-original="../../img/0/30_thumbnail.jpg" title="Enjoy Ibiza" alt="Enjoy Ibiza" />
                                                <img class="lazy link1" src="/storage/prod_img/{{$prod->img}}" data-original="../../img/0/31_thumbnail.jpg" title="Enjoy Ibiza" alt="Enjoy Ibiza" />
                                            </a>
                                            <a class="title" href="#">{{$prod->name}}</a>

                                        </div>





                                        <div class="price" style="text-align:center;">







                                            <br />
                                            <span style="font-size: 15px;color: #0f6674" title="{{$prod->auction->current_max_Price}}"> End Price: </span><span style="color: red;">${{$prod->auction->End_price}}</span>
                                        </div>
                                    </div>
                                </div>


                            @endforeach





                        </div>
                    </div>

                    @endif
                    @if($futer_prod!=null)
                        <div class="block">
                            <h1> future Products: </h1>

                            <div class="wrap">

                                @foreach($futer_prod as $prod)





                                    <div class="simple-prod o1">
                                        <div class="simple-wrap">

                                            <div class="item-img-wrap" >
                                                <div class="category-link"><span><i class="fa fa-newspaper-o"></i>{{$prod->Categorie->name}}</span></div>



                                                <img class="" src="/storage/prod_img/{{$prod->img}}" title="Holiday in Africa" alt="Holiday in Africa" />




                                            </div>



                                            <p  class ="text-center"style="color:blue;font-family:'Courier New, Courier, monospace';font-size:19px;">{{$prod->name}}</p>


                                            <div class="price" style="text-align:center;">

               <span style="color:red;font-family: 'Times New Roman';font-size: 16px" >
                   Start Price:
               </span>
                                                <span style="color: blue">$&nbsp;{{$prod->auction->Start_price}}</span><br>

                                                <span style="color:red;font-family: 'Times New Roman';font-size: 16px" >
                    Start Time:</span>
                                                <span >{{$prod->auction->Start_Time}}</span><br>

                                                <span style="color:red;font-family: 'Times New Roman';font-size: 16px" >
                            End Time:
                        </span><span >{{$prod->auction->End_Time}}</span>

                                                <br>
                                                <a  href="{{url('rem/'.$prod->auction->id)}}"><button class="button-blue" style="width: 100%;font-family: 'Times New Roman';font-size: medium" ><i class="fa fa fa-heart active"></i></button> </a>

                                            </div>

                                        </div>
                                    </div>


                                @endforeach





                            </div>
                        </div>
                    @endif

                </div>
        </div>
    </div>




@endsection