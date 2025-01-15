<?php

namespace App\Http\Controllers;

use App\Api\Responses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{


    public function login(Request $request)
    {
        if (Auth::attempt($request->only('email', 'password'))) {
            if (!$request->user()->is_active) {
                return Responses::errorResponseWithData("Not Authorized",
                    'Usuário desativado pelo administrador, entre em contato.', 403);
            }

            if ($request->user()->role->name == "Admin") {
                return Responses::successResponse([
                    'token' => $request->user()->createToken('admin', ['admin'])->plainTextToken
                ]);
            } else if ($request->user()->role->name == "User") {
                return Responses::successResponse([
                    'token' => $request->user()->createToken('user', [])->plainTextToken
                ]);
            }
            return Responses::errorResponseWithData("Not Authorized", 'Tipo de usuário não autorizado', 403);

        }
        return Responses::errorResponseWithData("Not Authorized", 'Verifique suas credenciais', 403);
    }


    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return Responses::successResponse('Token Revoked');
    }
}
