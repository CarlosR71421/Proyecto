<?php

use Illuminate\Support\Facades\Route;

Route::get('/welcome', function () {
    return view('welcome');
})->name('welcome');

Route::get('/log', fn() 
=> view('log'))->name('log');

Route::get('/register', fn() 
=> view('registrar'))->name('register');
