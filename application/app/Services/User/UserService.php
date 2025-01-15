<?php

namespace App\Services\User;

use App\Api\ListFilters;
use App\Repositories\UserRepositoryInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class UserService implements UserServiceInterface
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(
        UserRepositoryInterface $userRepository,
    )
    {
        $this->userRepository = $userRepository;
    }

    public function getAuthUser($user_id): ?Model
    {
        $user = $this->userRepository->getAuthUserInfos($user_id);
        if (!$user)
            throw new \Exception('User not found or not authenticated', 404);

        return $user;
    }

    public function getAllUsersInfos($request): ?LengthAwarePaginator
    {
        $list = $this->userRepository->listByFilters($request);
        return ListFilters::paginate($list, $request);
    }

    public function getUserDetails($user_id): ?Model
    {
        try {
            $user = $this->userRepository->getUserDetails($user_id);
        } catch (\Exception) {
            throw new \Exception('Usuário não encontrado', 404);
        }

        return $user;
    }

    public function delete($user_id): ?Model
    {
        try {
            $user = $this->userRepository->getUserDetails($user_id);
        } catch (\Exception) {
            throw new \Exception('Usuário não encontrado', 404);
        }
        if ($user->role->name != "Admin") {
            return $this->userRepository->delete($user_id);
        }
        throw new \Exception('Não é possivel deletar um administrador', 403);

    }

    public function store($request): ?Model
    {
        $attributes = $request->all();
        $attributes['is_active'] = true;

        return $this->userRepository->create($attributes);
    }

    public function update($user_id, $request): ?Model
    {
        try {
            $user = $this->userRepository->getUserDetails($user_id);
        } catch (\Exception) {
            throw new \Exception('Usuário não encontrado', 404);
        }

        if ($user->role->name != "Admin") {
            $attributes = $request->all();
            return $this->userRepository->update($user_id, $attributes);
        }
        throw new \Exception('Não é possivel alterar um administrador', 403);
    }

    public function switchIsActiveFlag($user_id): ?string
    {
        try {
            $user = $this->userRepository->getUserDetails($user_id);
        } catch (\Exception) {
            throw new \Exception('Usuário não encontrado', 404);
        }

        if ($user->role->name != "Admin") {
            $attributes['is_active'] = !$user->is_active;
            $user = $this->userRepository->update($user_id, $attributes);

            $str_is_active = "Desativado";
            if ($user->is_active) {
                $str_is_active = "Ativado";
            }

            return "Usuário $user->name $str_is_active com sucesso!";
        }
        throw new \Exception('Não é possivel desativar um administrador', 403);
    }

    public function massDelete($request): ?string
    {
        $user_ids = $request['user_ids'];
        foreach ($user_ids as $user_id) {
            try {
                $user = $this->userRepository->getUserDetails($user_id);
                $this->userRepository->delete($user->id);
            } catch (\Exception) {
                throw new \Exception("Deleção interrompida, usuário de id: $user_id não encontrado", 404);
            }
        }
        return "Usuários deletados com sucesso!";
    }
}
