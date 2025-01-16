<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('user')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/{user_id}', [UserController::class, 'show'])->middleware('ability:admin');
        Route::get('', [UserController::class, 'index'])->middleware('ability:admin');
        Route::post('', [UserController::class, 'store']);
        Route::post('/massDelete', [UserController::class, 'massDelete'])->middleware('ability:admin');
        Route::delete('/{user_id}', [UserController::class, 'delete'])->middleware('ability:admin');
        Route::post('/{user_id}', [UserController::class, 'update'])->middleware('ability:admin');
        Route::post('switchIsActive/{user_id}', [UserController::class, 'switchIsActiveFlag'])->middleware('ability:admin');
        Route::post('/logout', [AuthController::class, 'logout']);
    });

});
