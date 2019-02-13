@extends('layouts.app')
@section('header')
    <script src="{{ asset('mydesign/js/jquery.js') }}" ></script>

    <script >
        $(document).ready(function(){

            // jQuery methods go here...

            $("#fad").fadeOut(3000);


        });
    </script>
@endsection
@section('content')

    @if ($errors->any())
         <div id="" class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif
    <div class="container-outer register-register">


        <div class="container">





            <div id="i-forms" class="content">
                <br>

                <div id="register" class="box"  style="margin-top: 0px">
                    <div class="user_forms register round3">
                        <div  class="inner">
                            <form method="POST" action="{{ url('save') }}" name="register" id="register"  enctype="multipart/form-data"   role="form" >
                                @csrf





                                    <label for="name" class="col-form-label"><span>{{ __('Product Name') }}</span><span class="req">*</span></label>
                                    <input type="text" name="name" class="form-control"  required/>




                                    <label for="desc" class="col-form-label"><span>{{ __('Product Description') }}</span><span class="req">*</span></label>
                                   <textarea name="desc" class="form-control text" placeholder="Enter Full Product Description" required></textarea>

                                     <label for="startPrice" class="col-form-label">
                                        {{ __('Start Price') }}        </label>


                              <input   class="input-box" type="number" name="startPrice" value="" />                                                    <div class="req-what"><div class="req">*</div><div class="small-info">This field is required</div></div>

                                    <label for="Cat" class="col-form-label-sm">
                                        {{ __('Product Categorie') }}        </label>

                                    <select class="form-control " name="Cat" required>

                                        @foreach($cats as $cat)
                                            <option class="option" value="{{$cat->id}}">{{$cat->name}}</option>
                                        @endforeach
                                    </select>
                                    <label for="used" class="col-form-label">
                                        {{ __('used Or New:') }}        </label>



                                    Used<input  class="radio_button"  type="radio" name="used" value="1" checked>
                                    New <input class="radio_button" type="radio" name="used" value="0">                                                    <div class="req-what"><div class="req">*</div><div class="small-info">This field is required</div></div>

                                    <label  for="img" class="col-form-label">
                                        {{ __('Prroduct image') }}        </label>

                                    <input  class="form-control-file" type="file"  class=" form-control" name="img">



                                <label for="strtime" class="col-form-label-sm">
                                    {{ __('Auction Start Date & Time') }}        </label>

                                        <input type="datetime-local" class="form-control" required name="strtime">

                                <label for="endtime" class="col-form-label-sm">
                                    {{ __('Auction End Date & Time') }}        </label>

                                <input type="datetime-local" class="form-control" required name="endtime">


                                <button type="submit" class="button-blue">
                                        {{ __('Save') }}
                                    </button>



                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>



@endsection