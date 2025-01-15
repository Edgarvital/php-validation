<?php

namespace App\Api;

use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ListFilters
{
    public static function verifyFilterInputs($request): ?array
    {

        $params = [];
        $searchColumns = $request['search_columns'];
        $searchValue = $request['search_value'];
        $orderColumn = $request['order_by_column'];
        $sortDirection = $request['column_sort_direction'];

        if (!empty($searchValue)) {
            $params['searchValue'] = $searchValue;
        } else {
            $params['searchValue'] = null;
        }

        if (!empty($searchColumns)) {
            $params['searchColumns'] = Request::commaSeparatedStringToArray($searchColumns);
        } else {
            $params['searchColumns'] = ['id'];
        }

        if (!empty($orderColumn)) {
            $params['orderColumn'] = $orderColumn;
        } else {
            $params['orderColumn'] = 'id';
        }


        if (!empty($sortDirection)) {
            $params['sortDirection'] = $sortDirection;
        } else {
            $params['sortDirection'] = 'desc';
        }

        return $params;

    }

    public static function paginate($list, $request): ?LengthAwarePaginator
    {
        $page = $request['page'];
        $perPage = $request['per_page'];
        if (empty($perPage)) {
            $perPage = 10;
        }

        $currentItems = array_slice($list->toArray(), $perPage * ($page - 1), $perPage);

        return new LengthAwarePaginator(
            $currentItems,
            $list->count(),
            $perPage,
            $page,
            ['path' => request()->url(), 'query' => request()->query()]
        );
    }

    public static function collectionFilters($collection, $request): ?Collection
    {
        $params = ListFilters::verifyFilterInputs($request);

        $searchValue = $params['searchValue'];
        $searchColumns = $params['searchColumns'];
        $orderColumn = $params['orderColumn'];
        $sortDirection = $params['sortDirection'];

        $filteredCollection = $collection->filter(function ($model) use ($searchValue, $searchColumns) {
            if (!$searchValue) {
                return true;
            }

            $searchValueLower = strtolower($searchValue);

            foreach ($searchColumns as $column) {
                $columnValueLower = $model;
                $columnAttributes = explode('.', $column);

                foreach ($columnAttributes as $attribute) {
                    $columnValueLower = $columnValueLower->$attribute;
                }

                $columnValueLower = strtolower($columnValueLower);

                if (stripos($columnValueLower, $searchValueLower) !== false) {
                    return true;
                }
            }

            return false;
        });

        return $filteredCollection->sortBy($orderColumn, SORT_REGULAR, $sortDirection === 'desc')->values();
    }


    public static function queryFilters($query, $request, $relations_table = [])
    {

        $params = ListFilters::verifyFilterInputs($request);

        $searchValue = $params['searchValue'];
        $searchColumns = $params['searchColumns'];
        $orderColumn = $params['orderColumn'];
        $sortDirection = $params['sortDirection'];

        if ($searchValue !== null) {
            $query->where(function ($query) use ($searchColumns, $searchValue) {
                foreach ($searchColumns as $column) {
                    if (str_contains($column, '.')) {
                        $relationAttribute = explode('.', $column);
                        $relation = $relationAttribute[0];
                        $relationColumn = $relationAttribute[1];

                        $query->orWhereHas($relation, function ($query) use ($relationColumn, $searchValue) {
                            $query->whereRaw('CAST(' . $relationColumn . ' AS TEXT) ILIKE ?', ["%" . strtolower($searchValue) . "%"]);
                        });
                    } else {
                        $query->orWhereRaw('CAST(' . $column . ' AS TEXT) ILIKE ?', ["%" . strtolower($searchValue) . "%"]);
                    }
                }
            });
        }

        if (str_contains($orderColumn, '.')) {
            $modelTable = $query->getModel()->getTable();
            $relationAttribute = explode('.', $orderColumn);
            $relation = $relationAttribute[0];

            $relationColumn = $relationAttribute[1];

            $query->orderBy(function ($query) use ($relation, $relationColumn, $sortDirection, $modelTable, $relations_table) {

                $relation_table = ListFilters::verifyRelationTable($relations_table, $relation);

                $query->select($relationColumn)
                    ->from($relation_table)
                    ->whereColumn($relation_table . '.id', $modelTable . '.' . $relation . '_id');
            }, $sortDirection);
        } else {
            $query->orderBy($orderColumn, $sortDirection);
        }


        return $query->get();
    }

    private static function verifyRelationTable($relations_table, $relation)
    {
        $relation_table = Str::plural($relation);
        if (!empty($relations_table)) {
            if (isset($relations_table[$relation])) {
                $relation_table = $relations_table[$relation];
            }
        }
        return $relation_table;
    }

}
