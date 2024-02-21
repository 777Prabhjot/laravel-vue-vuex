<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VlogsController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(
    ['middleware' => ['authtoken','auth:sanctum']],
    function () {
        Route::post('/create', [VlogsController::class, 'store']);
        Route::put('/update/{id}', [VlogsController::class, 'update']);
        Route::delete('/delete/{id}', [VlogsController::class, 'delete']);
        Route::get('/getUserInfo', [AuthController::class, 'getUserInfo']);
   }
);

Route::get('/', [VlogsController::class, 'index']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::any('/autherror', [AuthController::class, 'autherror'])->name('autherror');
