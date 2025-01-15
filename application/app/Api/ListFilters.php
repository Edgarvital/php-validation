<?php

namespace App\Api;

use Illuminate\Pagination\LengthAwarePaginator;

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
            $perPage = 20;
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

}
