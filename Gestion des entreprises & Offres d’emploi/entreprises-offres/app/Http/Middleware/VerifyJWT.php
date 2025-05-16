<?php

namespace App\Http\Middleware;

use Closure;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyJWT
{
    public function handle(Request $request, Closure $next)
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['error' => 'Token non fourni'], 401);
        }

        try {
            $publicKey = file_get_contents(storage_path('oauth-public.key'));

            $decoded = JWT::decode($token, new Key($publicKey, 'RS256'));

            // Ajouter les infos du user à la request
            $request->merge(['user_id' => $decoded->sub]);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Token invalide : '.$e->getMessage()], 401);
        }

        return $next($request);
    }
}
