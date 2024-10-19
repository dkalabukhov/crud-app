<?php

use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

Route::get('/', [UsersController::class, 'index']);

Route::get('/about', function () {
    return inertia('About');
});

Route::resource('users', UsersController::class)->except('index');
