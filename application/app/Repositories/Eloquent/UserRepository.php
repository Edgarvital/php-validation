<?php

namespace App\Repositories\Eloquent;

use App\Models\User;
use App\Repositories\UserRepositoryInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class UserRepository extends BaseRepository implements UserRepositoryInterface
{

    /**
     * UserRepository constructor.
     *
     * @param User $model
     */
    public function __construct(User $model)
    {
        parent::__construct($model);
    }

    /**
     * @return Collection
     */
    public function all(): Collection
    {
        return $this->model->all();
    }

    public function getAuthUserInfos($user_id): ?Model
    {
        $authUser = $this->model->where('id', $user_id)
            ->with('role')
            ->firstOrFail();

        return $authUser;
    }

    public function getUserDetails($user_Id): ?Model
    {
        return $this->model
            ->with('role')
            ->findOrFail($user_Id);
    }

    public function listByFilters($request)
    {
        $query =  parent::listByFilters($request)
            ->where('role_id', '!=', 1);

        return $query->get();
    }

}
