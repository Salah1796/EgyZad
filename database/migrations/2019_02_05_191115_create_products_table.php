<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{


     /**
      *
     * Run the migrations.
     *
     * @return void
      *
     */

    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->text('Desc');
            $table->double('Start_price');
            $table->double('End_price')->default(0);

            $table->boolean("is_used");
            $table->boolean("is_available")->default(1);//1 =>available   0=>not available(slod)
            $table->string('img');




            $table->integer("categorie_id")->unsigned();
            $table->foreign("categorie_id",'cat_id')->references('id')->on("categories");

              //seller
            $table->integer("user_id")->unsigned();
            $table->foreign("user_id")->references('id')->on("users");



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
        Schema::dropIfExists('products');
    }
}
