<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request){

        $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:5',
            ]);
        
        try {
            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
            ]);

            if($user->save()){

                $token = $user->createToken(env('TOKEN_KEY'))->plainTextToken;

                return response()->json([
                        'message' => 'User successfully registered',
                        'token' => $token,
                        'currentUserId' => $user->id,
                        'name' => $user->name
                ]);
            }
        } catch (\Throwable $th) {
            throw $th;
        }    

    }

    public function login(Request $request){
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
            'message' => 'Invalid login details'
                       ], 401);
                   }
            
            $user = User::where('email', $request['email'])->firstOrFail();
            
            $token = $user->createToken(env('TOKEN_KEY'))->plainTextToken;
            
            return response()->json([
                        'message' => 'Login successful',
                       'token' => $token,
                       'currentUserId' => $user->id,
                       'name' => $user->name
            ]);

    }

    public function getUserInfo(){

        return response()->json(auth()->user());
    }

    public function autherror(){
        return response()->json(["message" => 'You are not allowed to access this route']);
    }
}
