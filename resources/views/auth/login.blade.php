@extends('layouts.app')

@section('content')

    <div class="container-outer register-register">


        <div class="container">





            <p id="back-top-right">
                <a href="#"><span></span></a>
            </p>

            <div class="clear"></div>


            <div class="flash-wrap">
            </div>



    <div id="i-forms" class="content">
       <br>

        <div id="login" class="box">
            <div class="user_forms login round3">
                <div class="inner">
                   {{ __('Login') }}
                    <form  action="{{ route('login') }}" method="POST" >

                        @csrf
                            <label for="email"><span>{{ __('E-Mail Address') }}</span></label>
                        <span class="input-box"><i class="fa fa-user"></i> <input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required autofocus></span>

                        @if ($errors->has('email'))
                            <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                        @endif
                            <label for="password"><span>{{ __('Password') }}</span></label>
                        <span class="input-box"><i class="fa fa-lock"></i> <input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required></span>
                        @if ($errors->has('password'))
                            <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                        @endif
                            <div class="login-line">
                                <div class="input-box-check">
                                    <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                                    <label  for="remember">
                                        {{ __('Remember Me') }}
                                    </label>
                                </div>
                                <a class="more-login tr1" href="{{ route('password.request') }}">
                                    {{ __('Forgot Your Password?') }}
                                </a>

                            </div>
                        <button type="submit" id="blue">
                            {{ __('Login') }}
                        </button>



                            <div class="swap">
                                Don't you have account? <a href="register" class="swap-log-reg to-reg">Register now</a>
                            </div>

                    </form>
                </div>
            </div>
        </div>


    </div>
        </div>
    </div>

@endsection
