<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFavaucsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('favaucs', function (Blueprint $table) {
            $table->increments('id');
            $table->integer("user_id")->unsigned();;
            $table->foreign("user_id")->references('id')->on("users")->onDelete('cascade');
            $table->integer("auction_id")->unsigned();;
            $table->foreign("auction_id")->references('id')->on("auctions")->onDelete('cascade');
            $table->unique(['user_id', 'auction_id']);
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
        Schema::dropIfExists('favaucs');
    }
}
