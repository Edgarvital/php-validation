<?php

namespace App\Services\User;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

interface UserServiceInterface
{
    public function getAllUsersInfos($request): ?LengthAwarePaginator;

    public function getAuthUser($user_id): ?Model;

    public function getUserDetails($user_id): ?Model;

    public function delete($user_id): ?Model;

    public function massDelete($request): ?String;

    public function store($request): ?Model;

    public function switchIsActiveFlag($user_id): ?String;

    public function update($user_id, $request): ?Model;

}
