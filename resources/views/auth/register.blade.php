@php
    use Illuminate\Http\Request;
@endphp
@extends('layouts.app')
@section('header')



@endsection
@section('content')

    <div class="container-outer register-register">


        <div class="container">





            <div id="i-forms" class="content">
                <br>

                <div id="register" class="box"  style="margin-top: 0px">
        <div class="user_forms register round3">
            <div  class="inner">
                <form method="POST" action="{{ route('register') }}" name="register" id="register" >
                    @csrf
                    <fieldset>




                        <label for="username"><span>{{ __('Username') }}</span><span class="req">*</span></label>
                        <input  class="form-control{{ $errors->has('username') ? ' is-invalid' : '' }}" id="s_username" type="text" name="username" value=""  />
                        @if ($errors->has('username'))
                            <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('username') }}</strong>
                                    </span>
                        @endif



                        <label for="Full_Name">
                            <span>{{ __('Full Name') }}</span><span class="req">*</span>
                        </label>
                        <input  class="form-control{{ $errors->has('Full_Name') ? ' is-invalid' : '' }}" id="name" type="text" name="Full_Name" value="" />
                        @if ($errors->has('Full_Name'))
                            <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('Full_Name') }}</strong>
                                    </span>
                        @endif



                        <label for="email"><span>{{ __('Email') }}</span><span class="req">*</span></label>
                        <input  class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" id="email" type="email" name="email" value="" />
                        @if ($errors->has('email'))
                            <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                        @endif


                        <label for="password"><span>{{ __('Password') }}</span><span class="req">*</span></label>
                        <input class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" id="s_password" type="password" name="password" value="" autocomplete="off" />
                        @if ($errors->has('password'))
                            <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                        @endif


                        <label for="password-confirm" class="">{{ __('Confirm Password') }}</label>
                        <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required>





                        <label for="Paypalemail"><span>{{ __('Paypal email') }}</span><span class="req">*</span></label>
                        <input class="form-control{{ $errors->has('Paypalemail') ? ' is-invalid' : '' }}" id="s_password" type="email" name="Paypalemail" value="" autocomplete="off" />


                        @if ($errors->has('Paypalemail'))
                            <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('Paypalemail') }}</strong>
                                    </span>
                        @endif


                        <label for="phoneNum">
                                {{ __('Phone Number') }}        </label>
                        <input  class="form-control{{ $errors->has('phoneNum') ? ' is-invalid' : '' }}" id="s_phone_mobile" type="number" name="phoneNum" value="" />                                                    <div class="req-what"><div class="req">*</div><div class="small-info">This field is required</div></div>
                        @if ($errors->has('phoneNum'))
                            <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('phoneNum') }}</strong>
                                    </span>
                        @endif


                     <!--   <label  for="img" class="form-check-label">
                            {{ __('Profile image') }}        </label>

                        <input  class="form-control{{ $errors->has('img') ? ' is-invalid' : '' }}" type="file"  class=" form-control" name="img">
                        @if ($errors->has('img'))
                            <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('img') }}</strong>
                                    </span>
                        @endif
-->
                        <label  for="gender" class="label">
                            {{ __('Gender') }} &nbsp;:        </label>
                        Male<input   type="radio" name="gender" value="male" checked>
                        Female <input type="radio" name="gender" value="female">

                        <button type="submit" class="btn btn-primary">
                            {{ __('Register') }}
                        </button>

                        <div class="swap">
                            Already registered? <a href="{{url("login")}}" class="swap-log-reg to-log">Log in</a>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>

    </div>
            </div>
        </div>
    </div>


@endsection
