<?php

namespace App\Api;

use Illuminate\Http\JsonResponse;

class Responses
{

    public static function successResponse($data, $status_code=200): JsonResponse
    {
        return new JsonResponse($data, $status_code);
    }

    public static function errorResponse($exception): JsonResponse
    {
        return new JsonResponse([
            'message' => $exception->getMessage()
        ], is_numeric($exception->getCode()) && $exception->getCode() >= 100 && $exception->getCode() <= 599 ? $exception->getCode() : 500);
    }

    public static function errorResponseWithData($message, $data, $status_code): JsonResponse
    {
        return new JsonResponse([
            'message' => $message,
            'data' => $data
        ], $status_code);
    }

}
