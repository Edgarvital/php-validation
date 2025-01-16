<?php

namespace App\Repositories\Eloquent;

use App\Api\ListFilters;
use App\Repositories\EloquentRepositoryInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class BaseRepository implements EloquentRepositoryInterface
{

    protected $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function create(array $attributes): Model
    {
        return $this->model->create($attributes);
    }

    public function findOrFail($id): ?Model
    {
        return $this->model->findOrFail($id);
    }

    public function find($id): ?Model
    {
        return $this->model->find($id);
    }

    public function update($id, array $attributes): ?Model
    {
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
        return $model;
    }

    public function delete($id): ?Model
    {
        $model = $this->findOrFail($id);
        $model->delete();
        return $model;
    }

    public function all(): ?Collection
    {
        return $this->model->all();
    }

    public function listByFilters($request)
    {
        $params = ListFilters::verifyFilterInputs($request);

        $searchValue = $params['searchValue'];
        $searchColumns = $params['searchColumns'];
        $orderColumn = $params['orderColumn'];
        $sortDirection = $params['sortDirection'];

        $query = $this->model->newQuery();

        if ($searchValue !== null) {
            $query->where(function ($query) use ($searchColumns, $searchValue) {
                foreach ($searchColumns as $column) {
                    $query->orWhere(DB::raw('lower(' . $column . ')'), 'like', "%" . strtolower($searchValue) . "%");
                }
            });
        }

        $query->orderBy($orderColumn, $sortDirection);

        return $query;
    }

}
