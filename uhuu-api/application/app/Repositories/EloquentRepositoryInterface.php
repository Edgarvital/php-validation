<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

/**
 * Interface EloquentRepositoryInterface
 * @package App\Repositories
 */
interface EloquentRepositoryInterface
{
    public function create(array $attributes): Model;

    public function update($id, array $attributes): ?Model;

    public function find($id): ?Model;

    public function findOrFail($id): ?Model;

    public function delete($id): ?Model;

    public function all(): ?Collection;

    public function listByFilters($request);

}
