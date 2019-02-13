<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Auth::routes();;

Route::get('/',"HomeController@index");


Route::get('/home',"HomeController@index");
Route::get('/upnotif/',"HomeController@upnotif")->middleware('auth');

//productModel
Route::get('/add',"ProductController@create")->middleware('auth');;
Route::post('/save',"ProductController@store")->middleware('auth');;

//auction Model
Route::get('/auctions/{id}',"HomeController@show");
Route::post('/Bid/{id}',"HomeController@Bid")->middleware('auth');
Route::get('/rem/{id}',"HomeController@rem")->middleware('auth');
Route::get('/up/{id}',"HomeController@update")->middleware('auth');


//usermodel
Route::get('/user/{id}',"userController@show");

//Route::get('/home', 'HomeController@index')->name('home');
//php artisan make:model product
