<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAuctionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('auctions', function (Blueprint $table) {
            $table->increments('id');
            $table->dateTime('Start_Time');
            $table->dateTime('End_Time');
            $table->string('city')->default("");
            $table->double('Start_price');
            $table->double('End_price')->default(0);
            $table->double('current_max_Price')->default(0);
            $table->boolean("state")->default(1);

            $table->integer("product_id")->unsigned();
            $table->foreign("product_id")->references('id')->on("products");



             //last_buyer
            $table->integer("user_id")->unsigned();
            $table->foreign("user_id","buyer_id")->references('id')->on("users")->onDelete('cascade');


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('auctions');
    }
}
