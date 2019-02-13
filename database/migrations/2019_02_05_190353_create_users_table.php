<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('Full_Name');

            $table->string('username');
            $table->string('email')->unique();
            $table->boolean('is_admin')->default(0);

            $table->integer('phoneNum');
            $table->string('Paypalemail');
            $table->string('img')->default('user.png');
            $table->enum('gender',['male','female']);
            $table->enum('Rate',['0','1','2','3','4','5'])->default(0);
            $table->integer('votes')->default(0);//number of votes
            $table->string('password');
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
