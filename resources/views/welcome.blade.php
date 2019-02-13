@extends('layouts.app')

@section('content')



<div id="demo" class="carousel slide" data-ride="carousel">
    <ul class="carousel-indicators">
        <li data-target="#demo" data-slide-to="0" class="active"></li>
        <li data-target="#demo" data-slide-to="1"></li>
        <li data-target="#demo" data-slide-to="2"></li>
    </ul>
    <div class="carousel-inner">
        <div class="carousel-item active">
            <img src="{{ asset('mydesign/img/la.jpg') }}" alt="Los Angeles" width="1100" height="500">
            <div class="carousel-caption">
                <h3>Los Angeles</h3>
                <p>We had such a great time in LA!</p>
            </div>
        </div>
        <div class="carousel-item">
            <img src="{{ asset('mydesign/img/la.jpg') }}" alt="Chicago" width="1100" height="500">
            <div class="carousel-caption">
                <h3>Chicago</h3>
                <p>Thank you, Chicago!</p>
            </div>
        </div>
        <div class="carousel-item">
            <img src="{{ asset('mydesign/img/la.jpg') }}" alt="New York" width="1100" height="500">
            <div class="carousel-caption">
                <h3>New York</h3>
                <p>We love the Big Apple!</p>
            </div>


        </div>
    </div>
    <a class="carousel-control-prev" href="#demo" data-slide="prev">
        <span class="carousel-control-prev-icon"></span>
    </a>
    <a class="carousel-control-next" href="#demo" data-slide="next">
        <span class="carousel-control-next-icon"></span>
    </a>
</div>



<div class="clear"></div>


<div class="flash-wrap">
</div>

<!-- products Block -->
<div class="home-container hc-latest">
    <div class="inner" >

         <div id="latest" class="white">
            <h2 class="home">
                Finshed Auctions        </h2>


            <div class="block">
                <div class="wrap">
@php
$x=1;
@endphp
  @foreach($endAuc as $auc)
                    <div class="simple-prod o{{$x}}">
                        <div class="simple-wrap">

                            <div class="item-img-wrap">

                                <div class="category-link"><span><i class="fa fa-newspaper-o"></i> {{$auc->product->name}}</span></div>


                                    <img class="" src="storage/prod_img/{{$auc->product->img}}" title="Holiday in Africa" alt="Holiday in Africa" />

                            </div>



                            <p  class ="text-center"style="color:blue;font-family:'Courier New, Courier, monospace';font-size:19px;">{{$auc->product->name}}</p>


                            <div class="price" style="text-align:center;">







                                <span style="color:red">End Price:</span> <span title="$999.00">$&nbsp;{{$auc->End_price}}</span>
                            </div>
                        </div>
                    </div>
                        @php
                            $x++;
                        @endphp
@endforeach








                </div>
            </div>

            <div class="home-container hc-latest">
                <div class="inner">

                    <div id="latest" class="white">
                        <h2 class="home">
                            future Auctions       </h2>


                        <div class="block">
                            <div class="wrap">

@foreach($futureAuc as $fauc)



                                <div class="simple-prod o1">
                                    <div class="simple-wrap">

                                        <div class="item-img-wrap" >
                                            <div class="category-link"><span><i class="fa fa-newspaper-o"></i>{{$fauc->product->name}}</span></div>



                                                <img class="" src="storage/prod_img/{{$fauc->product->img}}" title="Holiday in Africa" alt="Holiday in Africa" />




                                        </div>



                                        <p  class ="text-center"style="color:cornflowerblue;font-size:14px;">{{$fauc->product->name}}</p>


                                        <div class="price" style="text-align:center;">

               <span style="color:red;font-family: 'Times New Roman';font-size: 16px" >
                   Start Price:
               </span>
              <span style="color: blue">$&nbsp;{{$fauc->Start_price}}</span><br>

                <span style="color:red;font-family: 'Times New Roman';font-size: 16px" >
                    Start Time:</span>
                      <span >{{$fauc->Start_Time}}</span><br>

                        <span style="color:red;font-family: 'Times New Roman';font-size: 16px" >
                            End Time:
                        </span><span >{{$fauc->End_Time}}</span>

                                            <br>
                                            <a  href="{{url('rem/'.$fauc->id)}}"><button class="button-blue" style="width: 100%;font-family: 'Times New Roman';font-size: medium" ><i class="fa fa fa-heart active"></i></button> </a>

                                        </div>

                                        </div>
                                </div>

@endforeach





                            </div>
                        </div>


                        <div class="home-container hc-latest">
                            <div class="inner">

                                <div id="latest" class="white">
                                    <h2 class="home">
                                        Current Auctions       </h2>


                                    <div class="block">
                                        <div class="wrap">
                                            @foreach($currentAuc as $curauc)
                                            <div class="simple-prod o1">
                                                <div class="simple-wrap">

                                                    <div class="item-img-wrap">

                                                        <div class="category-link"><span><i class="fa fa-newspaper-o"></i>{{$curauc->product->name}}</span></div>

                                                        <a class="img-link" href="{{url("/auctions/$curauc->id")}}"><img class="lazy" src=" storage/prod_img/{{$curauc->product->img}}" data-original="img/0/6_thumbnail.jpg" title="Trip to the zoo" alt="Trip to the zoo" /></a>


                                                    </div>



                                                    <a class="title" href="{{url("/auctions/$curauc->id")}}">{{$curauc->product->name}}</a>


                                                    <div class="price" style="text-align:center;">


                                                        <div id="item5" class="atimer auction-time text-center timer-loop" data-endtime="618" data-id="5" data-end-time="2019-02-03 12:00:06" data-start-time="2019-02-01 12:00:06"> </div>






                                                        <span style=";font-family: 'Times New Roman';font-size: 16px" >
                    Current Price:</span>     <span style="color:red" >${{$curauc->current_max_Price}}</span>
                                                    </div>
                                                </div>
                                            </div>
@endforeach





                                        </div>
                                    </div>

                                </div>
                            </div>


</div>
                    </div>
                </div>
            </div>
         </div>
    </div>
</div>
@endsection










