<?php

namespace Tests\Unit\Api;

use App\Api\Responses;
use PHPUnit\Framework\TestCase;
use Illuminate\Http\JsonResponse;


class ResponsesTest extends TestCase
{

    public function test_successfully_response_returns_json_response_with_given_data_and_status_code()
    {
        $data = ['key' => 'value'];
        $status_code = 200;

        $response = Responses::successResponse($data, $status_code);

        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals($data, $response->getData(true));
        $this->assertEquals($status_code, $response->getStatusCode());
    }

    public function test_error_response_returns_json_response_with_given_exception_message_and_default_status_code()
    {
        $exception = new \Exception('Test exception message');

        $response = Responses::errorResponse($exception);

        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(['message' => $exception->getMessage()], $response->getData(true));
        $this->assertEquals(500, $response->getStatusCode());
    }

    public function test_error_response_returns_json_response_with_given_exception_message_and_big_status_code()
    {
        $exception = new \Exception('Test exception message', 50000000);

        $response = Responses::errorResponse($exception);

        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(['message' => $exception->getMessage()], $response->getData(true));
        $this->assertEquals(500, $response->getStatusCode());
    }

    public function test_error_response_returns_json_response_with_given_exception_message_and_code_as_status_code()
    {
        $exception = new \Exception('Test exception message', 404);

        $response = Responses::errorResponse($exception);

        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(['message' => $exception->getMessage()], $response->getData(true));
        $this->assertEquals(404, $response->getStatusCode());
    }

    public function test_error_response_with_data_returns_json_response_with_given_message_data_and_status_code()
    {
        $message = 'Test error message';
        $data = ['key' => 'value'];
        $status_code = 404;

        $response = Responses::errorResponseWithData($message, $data, $status_code);

        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(['message' => $message, 'data' => $data], $response->getData(true));
        $this->assertEquals($status_code, $response->getStatusCode());
    }

}
