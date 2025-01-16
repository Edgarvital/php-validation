<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

interface UserRepositoryInterface
{

    public function all(): Collection;

    public function getAuthUserInfos($user_id): ?Model;

    public function getUserDetails($user_Id): ?Model;

}
