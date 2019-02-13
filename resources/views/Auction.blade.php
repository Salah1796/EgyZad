@php
use App\User;

@endphp
@extends('layouts.app')
@section('header')

    <script src="{{ asset('mydesign/js/jquery.lazyload.js') }}" ></script>
    <script src="{{ asset('mydesign/js/jquery.bxslider.js') }}" ></script>
    <script src="{{ asset('mydesign/js/jquery.js') }}" ></script>

<script type="text/javascript">



   function ref () {

       var link=$("#ref").attr("href");
         var val= $("#max").text();
       //var data = {'v': val};
       $.ajax({
           url:link,
           dataType:'json',
           data: { oldVal : val },
            type:'get',
           beforeSend:function () {



           },success:function (data) {

               $("#max").text(data);

           },error:function (error,exception) {
             //  alert("Enter Number More Thane Cuuren Price")
              // $("#user_bid_val").attr("value","");
           }


       });


       return false;
   }


    $(document).on("click","#ref",ref);


     // setInterval(ref, 1000);











   // setInterval(fun,10)
    $(document).on("click","#bid",function () {
   var form=$("#Bidform").serialize();

   var link=$("#Bidform").attr("action");
   //alert(link);
   $.ajax({
      url:link,
       dataType:'json',
       data:form,
       type:'post',
       beforeSend:function () {

//
       },success:function (data) {


             app="<li style=\"font-style: normal;background-color:beige;margin-bottom: 10px;height: 30px;padding: 5px\"><span  class=\"left\" style=\"color: blue;;font-size: 20px\">"+data.username+"</span>  &nbsp; &nbsp; <span class=\"right\" style=\"color: red;;font-size: 20px\">$"+data.price+"</span></li>";
            $('#load_page').prepend(app);
          // $("#max").empty();
          $("#max").text(data.price);
            // ref()
           $("#user_bid_val").attr("value","");


       },error:function (error,exception) {
            alert("Enter Number More Thane Cuuren Price")
           $("#user_bid_val").attr("value","");
              }


   });



   return false;
    });


</script>
    <link href="{{asset('mydesign/css/jquery-ui-1.8.20.cstom.css') }}" rel="stylesheet">
    <link href="{{asset('mydesign/css/bxslider/jquery.bxslider.css') }}" rel="stylesheet">
    <link href="{{asset('mydesign/css/jquery.datetimepicker.css') }}" rel="stylesheet">
    <link href="{{asset('mydesign/css/jquery.datetimepicker.css') }}" rel="stylesheet">


    <script >
        $(document).ready(function(){

            // jQuery methods go here...

            $("#fad").fadeOut(5000);


        });
    </script>
@endsection


@section('title')
   / {{$auc->product->name}}

@endsection
@section('content')
    <div class="container-outer item">
        <div class="container">
            <div class="breadcrumb"></div>
            <div id="listing" class="content list">

                <!--  product BODY -->
                <div id="main">

                    <div id="left" class="round3 i-shadow">

                        <!-- product Block top title +time-->
                        <div class="top-details">
                            <h2 class="top">{{$auc->product->name}}</h2>

                            <div class="bot">


                                <div class="published">
                                    Published <span title="August 12, 2017">{{$auc->product->created_at}}</span>
                                </div>

                                <div class="published">Start date: <strong>{{$auc->Start_Time}}</strong></div>
                                <div class="published">End date: <strong>{{$auc->End_Time}}</strong></div>
                            </div>

                        </div>


                        <!-- IMAGE BOX -->
                        <div id="images">
                            <div id="pictures" class="item-pictures" >
                                <ul class="item-bxslider">
                                    <li>
                                        <a rel="image_group" href="/storage/prod_img/{{$auc->product->img}}" title="Holiday in Africa - Image 1/2">
                                            <img src="/storage/prod_img/{{$auc->product->img}}" alt="Holiday in Africa - 1/2"/>
                                        </a>
                                    </li>
                                    <li>
                                        <a rel="image_group" href="storage/prod_img/{{$auc->product->img}}" title="Holiday in Africa - Image 2/2">
                                            <img src="/storage/prod_img/{{$auc->product->img}}" alt="Holiday in Africa - 2/2"/>
                                        </a>
                                    </li>
                                </ul>



                            </div>

                        </div>

                        <!-- for mobile -->
                        <div id="swap" class="is767">
                            <a href="#" class="details active">Details</a>
                            <a href="#" class="contact">Contact</a>
                        </div>

                        <!-- for mobile -->
                        <div class="is767">
                            <div id="item-basics" class="is_detail">

                                <div class="price round2">$ {{$auc->current_max_Price}}</div>
                                <div class="clear"></div>




                                <div class="title">{{$auc->product->name}}</div>


                                <div class="published">
                                    <span title="August 12, 2017">{{$auc->product->created_at}}</span>
                                </div>

                            </div>
                        </div>


                        <!-- product Description -->
                        <div class="item-desc is_detail">
                            <h2>Description</h2>

                            <div class="text">
                                <p>{{$auc->product->name}}</p><br />
                                <br />
                                {{$auc->product->Desc}}
                                <span class="show-desc"><i class="fa fa-ellipsis-h"></i></span>
                            </div>
                        </div>


                    </div>
                </div>

                <!-- RIGHT SIDEBAR -->
                <div id="side-right">

                    <div id="price" class="round i-shadow" style="height: auto">

                        <div id="item7" class="atimer auction-time text-center timer-loop" data-endtime="618" data-id="7" data-end-time="" data-start-time="2019-02-01 12:06:04">
                            end {{$auc->End_Time}}


                        </div>
                        <span class="long-price-fix price-f " >$</span><span class="long-price-fix price-f " id="max">{{$auc->current_max_Price}}</span>
                      <br>  <a    id="ref" href="{{url('up/'.$auc->id)}}" style=""> <button class="button-success " style="width: 100%;font-size: 18px;font-family:Arial">Refresh</button></a>

                    </div>
                    <!-- bid derails -->
                    <div id="seller" class="round3 i-shadow">
                        <h2 class="sc-click">
                            Bidding form          </h2>


                        <div class="sc-block body">
                            <div class="inside">

                                <div class="text">
                                    <div id="message" style="position:relative;"> </div>
                                    <div id="message1" style="position:relative;"> </div>
                                    @if (Auth::User())

                                        <form method="post" action="{{"/Bid/".$auc->id}}" name="register" id="Bidform"  enctype="multipart/form-data"   role="form" >
                                            @csrf
                                         <input  id="user_bid_val" type="number"  class="form-control" name="Price" placeholder="Enter New Price" required>
                                        <br>
                                         <br>
                                             <button id="bid"  type="submit"  style="width: 100% ;border-radius: 3%;font-family: 'Times New Roman';font-size: 19px">Bid</button>
                                    </form>


                                        @else

                                        <h2><a href="{{url('register')}}">Register</a> Or

                                            <a href="{{url('login')}}">Login</a> To Bid</h2>

                                     @endif




                                </div>



                            </div>
                        </div>
                    </div>
                    <!-- bids list -->
                    <div id="seller" class="round3 i-shadow">
                        <h2 class="sc-click">
                            Bidding history          </h2>


                        <div class="sc-block body">
                            <div class="inside">

                                <div class="name bid-history">


                                    <div style="height: 180px;overflow-y: scroll;margin-top: 10px;float: left;width: 100%;">
                                        <ul  class="h-bid-history" id="load_page">
                                          @foreach($auc_byers as $buyer)
                                                <li style="font-style: normal;background-color:beige;margin-bottom: 10px;height: 30px;padding: 5px"  >
                                                    <span  class="left" style="color: blue;;font-size: 20px">{{User::find($buyer->user_id)->username}}</span> &nbsp;  &nbsp;
                                                    <span  class="right" style="color: red;;font-size: 20px">$ {{$buyer->price}}</span>

                                                    </li>

                                            @endforeach
                                        </ul>
                                    </div>

                                </div>



                            </div>
                        </div>
                    </div>
                    <!-- SELLER INFO -->
                    <div id="seller" class="round3 i-shadow">
                        <h2 class="sc-click">
                            Seller's info                      </h2>


                        <div class="sc-block body">
                            <div class="inside">

                                <!-- IF USER OWN THIS LISTING, SHOW SELLER TOOLS -->

                                <!-- USER IS NOT OWNER OF LISTING -->
                                <a class="side-prof" href="{{url('/user/'.$auc->product->user->id)}}" title="Check profile of this user">
                                    <img id="profile_picture_img" src="{{asset('mydesign/img/no-user.png') }}" width="auto" height="200" alt="Seller's picture">                    </a>

                                <div class="name">

                                    <a href="{{url('/user/'.$auc->product->user->id)}}" title="Check profile of this user">
                                       {{$auc->product->user->username}}                 </a>
                                </div>



                                <div class="elem type">
                                    <span><i class="fa fa-user"></i> Private person</span>
                                </div>

                                <div class="elem regdate">

                                    Registered on {{$auc->product->created_at->toFormattedDateString()}}                                                    </div>

                                <div class="seller-bottom">

                                    <a href="{{url('/user/'.$auc->product->user->id)}}">Dashboard</a>
                                </div>
                            </div>


                            <!-- ITEM BUTTONS - SEND TO FRIEND / PRINT / MAKE FAVORITE
                            <div id="item-buttons">

                                <a id="send-friend" href="../../item/send-friend/7.html" class="tr1" title="Send this listing to your friend"><i class="fa fa-users tr1"></i></a>




                                <div id="report" class="noselect tr1">
                                    <a href="#" title="Report item"><i class="fa fa-flag-o"></i></a>

                                    <div class="cont-wrap">
                                        <div class="cont">
                                            <a id="item_spam" class="reports" href="holiday-in-africa_7.html" rel="nofollow">spam</a>
                                            <a id="item_bad_category" class="reports" href="holiday-in-africa_7.html" rel="nofollow">misclassified</a>
                                            <a id="item_repeated" class="reports" href="holiday-in-africa_7.html" rel="nofollow">duplicated</a>
                                            <a id="item_expired" class="reports" href="holiday-in-africa_7.html" rel="nofollow">expired</a>
                                            <a id="item_offensive" class="reports" href="holiday-in-africa_7.html" rel="nofollow">offensive</a>
                                        </div>
                                    </div>
                                </div>

                            </div>
-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>













@endsection