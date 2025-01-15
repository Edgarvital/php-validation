<?php

namespace App\Http\Controllers;

use App\Api\Responses;
use App\Http\Requests\User\MassDeleteRequest;
use App\Http\Requests\User\StoreRequest;
use App\Http\Requests\User\UpdateRequest;
use App\Services\User\UserServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    protected $userService;

    public function __construct(UserServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    public function index(Request $request)
    {
        try {
            $users = $this->userService->getAllUsersInfos($request);
        } catch (\Exception $e) {
            return Responses::errorResponse($e);
        }

        return Responses::successResponse($users);
    }

    public function show($user_id)
    {
        try {
            $user = $this->userService->getUserDetails($user_id);
        } catch (\Exception $e) {
            return Responses::errorResponse($e);
        }

        return Responses::successResponse($user);
    }

    public function delete($user_id)
    {
        try {
            $user = $this->userService->delete($user_id);
        } catch (\Exception $e) {
            return Responses::errorResponse($e);
        }

        return Responses::successResponse($user);
    }

    public function massDelete(MassDeleteRequest $request)
    {
        try {
            $user = $this->userService->massDelete($request);
        } catch (\Exception $e) {
            return Responses::errorResponse($e);
        }

        return Responses::successResponse($user);
    }

    public function store(StoreRequest $request)
    {
        try {
            $user = $this->userService->store($request);
        } catch (\Exception $e) {
            return Responses::errorResponse($e);
        }

        return Responses::successResponse($user, 201);
    }

    public function update($user_id, UpdateRequest $request)
    {
        try {
            $user = $this->userService->update($user_id, $request);
        } catch (\Exception $e) {
            return Responses::errorResponse($e);
        }

        return Responses::successResponse($user);
    }

    public function switchIsActiveFlag($user_id)
    {
        try {
            $user = $this->userService->switchIsActiveFlag($user_id);
        } catch (\Exception $e) {
            return Responses::errorResponse($e);
        }

        return Responses::successResponse($user);
    }

}
