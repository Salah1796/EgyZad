<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <!--meta-->
    <meta name="csrf-token" content="{{ csrf_token() }}">


    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
     <meta name="description" content="Easy Auction" />
     <meta charset="utf-8">
    <meta name="generator" content="easyauction 2.0.1" />

          <!--  css  s -->
    <link href="{{asset('mydesign/css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{asset('mydesign/css/front_styles.css') }}" rel="stylesheet">
    <link href="{{asset('mydesign/js/fancybox/jquery.fancybox.css') }}" rel="stylesheet">
    <link href="{{asset('mydesign/css/jquery-ui-1.8.20.custom.css') }}" rel="stylesheet">

    <link href="{{asset('mydesign/css/tabs.css') }}" rel="stylesheet">

    <link href="{{asset('mydesign/css/style7b30.css?v=4') }}" rel="stylesheet">
    <link href="{{asset('mydesign/css/jquery.fancybox.css') }}" rel="stylesheet">
    <link href="{{asset('mydesign/css/responsive.css') }}" rel="stylesheet">
    <link href="{{asset('mydesign/fonts/fa/css/font-awesome.min.css') }}" rel="stylesheet">
    <link href="{{asset('mydesign/css/jquery-ui.min.css') }}" rel="stylesheet">
    <link href="{{asset('mydesign/css/jquery.datetimepicker.css') }}" rel="stylesheet">






    <style>.payment-pro-highlighted { background-color:#fff000 !important; }</style>

    <style>
        /* Make the image fully responsive */
        .carousel-inner img {
            width: 90%;
            height: 80%;
            margin-left: 5%;
        }
        #demo
        {
            margin-top: 40px

        }
    </style>
    <!--js-->
    <script src="{{ asset('mydesign/js/jquery.js') }}" ></script>
    <script src="{{ asset('mydesign/js/jquery.min.js') }}" ></script>
    <script src="{{ asset('mydesign/js/popper.min.js') }}" ></script>
    <script src="{{ asset('mydesign/js/bootstrap.min.js') }}" ></script>
    <script src="{{ asset('mydesign/js/myjs.js') }}" ></script>
    <script src="{{ asset('mydesign/js/jquery.js') }}" ></script>
    <script src="{{ asset('mydesign/js/fancybox/jquery.fancybox.pack.js') }}" defer></script>
    <script src="{{ asset('mydesign/js/jquery.priceFormat.js') }}" ></script>
    <script src="{{ asset('mydesign/js/jquery.sticky-kit.min.js') }}" ></script>
    <script src="{{ asset('mydesign/js/ckeditor/ckeditor.js') }}" ></script>
    <script src="{{ asset('mydesign/js/jquery-ui.min.js') }}" ></script>
    <script src="{{ asset('mydesign/js/global30f4.js?v=3') }}" ></script>



    <script type="text/javascript">
        var cleanCurrentLocale = 'English (US)';
        var fileDefaultText = 'No file selected';
        var fileBtnText     = 'Choose File';
        var cleanHeaderImg = '../../ images/header-icons.png';
        var baseDir = "../../index.html";
        var baseSearchUrl = '../../search.html';
        var baseAjaxUrl = '../../contact88ce.html?ajaxRequest=1';
        var baseAdminDir = '../../ea-admin/index6f31.html';
        var currentLocation = 'item';
        var currentSection = '';
        var adminLogged = '0';
        var cleanItemStick = '1';
        var cleanSearchStick = '1';
        var cleanLazy = '1';
        var cleanBxSlider = '1';
        var cleanBxSliderSlides = '2';
        var cleanMasonry = '0';
        var dimNormalWidth = 640;
        var dimNormalHeight = 400;
        var searchRewrite = '/search';
        var ajaxSearch = '1';
        var ajaxForms = '1';
        var cleanClickOpen = 'Click to open listing';
        var cleanNoMatch = 'No listing match to your criteria';
    </script>
    <script type="text/javascript">

        $(document).on("click","#Upnotif",function () {

            $.ajax({
                url:"upnotif/",
                dataType:'json',
                data:null,
                type:'get',
                beforeSend:function () {

//
                },success:function (data) {




                },error:function (error,exception) {
                   // alert("Enter Number More Thane Cuuren Price")
                    //$("#user_bid_val").attr("value","");
                }


            });


        });





    </script>




    @yield('header')
    <title>{{ config('app.name', 'EgyZad') }}
    @yield('title')

    </title>
</head>
<body id="body-item" class="page-body">

<div id="header-bar" style="margin-top: 0px">
    <div class="inside">


        <a id="h-search" class="header-menu resp is767 tr1" data-link-id="#menu-search">
            <span class="tr1"></span>
        </a>

        <a id="h-user" class="header-menu resp is767 tr1" data-link-id="#menu-user">
            <span class="tr1"></span>
        </a>


        <div class="left-block">
            <div class="logo not767">
                <a class="resp-logo" href="{{ url('/') }}"><img border="0" alt="EgyZad" src="{{asset('mydesign/img/default-logo.jpg') }}" />

                </a>
            </div>
            <div id="top-search" class="non-resp">
                <a href="#"  id="notiflink" class="btn"><i class="fa fa-search"></i><span>Search</span></a>
            </div>

            <a class="logo-text is767" href="index.html"><span>{{ config('app.name', 'EgyZad') }}</span></a>

            <div class="language not767">
            </div>


        </div>

        <div class="right-block not767">

            <div class="account has-border">

            @guest
                    <a class="profile tr1" href="{{ route('login') }}">{{ __('Login') }}</a>

                    @if (Route::has('register'))
                        <a class="profile tr1" href="{{ route('register') }}">{{ __('Register') }}</a>
                    @endif
                    @else


                            <a id="navbarDropdown" class="nav-link dropdown-toggle" href="" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                <img  width="35px" src="{{ asset('mydesign/img/profile-default.png') }}"/>
                            </a>

                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="{{ route('logout') }}"
                                   onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                    {{ __('Logout') }}
                                </a>

                                <a class="dropdown-item" href="{{url('/user/'.Auth::User()->id)}}"  > Profile</a>
                                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                    @csrf
                                </form>
                            </div>




                        @endguest

            </div>

            <div class="notification">

                @if(Auth::User())
                <a class="" title="Add Product" href="{{url("add")}}"><i class="fa fa-plus"></i> <span class="counter">0</span></a>
@endif
                    <a  title="Notifaction" id="Upnotif" class="alert tr1" href="" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                        <i class="fa fa-bell-o"></i> <span class="counter">
                             @if(isset($bidnotifis))

                            {{count($bidnotifis)}}
@endif
                        </span>
                    </a>

                    <div id="upnotif" class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                        @if(isset($bidnotifis))
                         @foreach($bidnotifis as $notf)

                          <a class="dropdown-item " id="" href="{{ url('/auctions/'.$notf->data['auction_id']) }}">
                              The Auction of <span style="color: red;">

                               {{App\Auction::find($notf->data['auction_id'])->product->name}}

                              </span>
                              reach Price = $ {{$notf->data['Price']}}

                         </a>
                       @endforeach
                            @endif

                    </div>
                &nbsp;
            </div>





        </div>
    </div>


</div>

{


            @yield('content')


<!-- PARTNERS SECTION IN FOOTER -->

<!--  FOOTER -->



<div id="footer">
    <div class="inside">
        <div class="left">
            <div class="links">
                <span class="link-span"><a href="tos-p24.html" title="Terms and conditions">Terms and conditions</a></span>

                <span class="link-span contact"><a href="contact.html">Contact</a></span>
            </div>

            <div class="info">
                Widely known as Worlds no. 1 online classifieds platform, our is all about you. Our aim is to empower every person in the country to independently connect with buyers and sellers online. We care about you ďż˝ and the transactions that bring you closer to your dreams. Want to buy your first car? We are here for you. Want to sell commercial property to buy your dream home? We are here for you. Whatever job you have got, we promise to get it done.        </div>

            <div class="about">




                <!--<span class="copy">&copy; 2019 myWebsite.com</span>-->
            </div>
        </div>

        <div class="right">


            <div class="share">

                <div class="header">Follow us</div>


                <span class="facebook"><a href="https://www.facebook.com/sharer/sharer.php?u=/" title="Share us on Facebook" target="_blank"><i class="fa fa-facebook"></i></a></span>
                <span class="pinterest"><a href="img/logo.jpg&amp;media=/&amp;description=" title="Share us on Pinterest" target="_blank"><i class="fa fa-pinterest"></i></a></span>
                <span class="twitter"><a href="https://twitter.com/home?status=/%20-%20your%20auction" title="Tweet us" target="_blank"><i class="fa fa-twitter"></i></a></span>
                <span class="google-plus"><a href="https://plus.google.com/share?url=/" title="Share us on Google+" target="_blank"><i class="fa fa-google-plus"></i></a></span>
                <span class="linkedin"><a href="https://www.linkedin.com/shareArticle?mini=true&amp;url=/&amp;title=My%20auction&amp;summary=&amp;source=" title="Share us on LinkedIn" target="_blank"><i class="fa fa-linkedin"></i></a></span>
            </div>
        </div>
    </div>
</div>

</body>
</html>
