<?php

namespace Tests\Unit\Api;

use Illuminate\Http\Request;
use PHPUnit\Framework\TestCase;
use App\Api\ListFilters;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class ListFiltersTest extends TestCase
{

    public function test_verifyFilterInputs_with_empty_request()
    {
        $request = new Request();
        $request->setMethod('POST');

        $result = ListFilters::verifyFilterInputs($request);

        $this->assertNotNull($result);
        $this->assertNull($result['searchValue']);
        $this->assertSame(['id'], $result['searchColumns']);
        $this->assertSame('id', $result['orderColumn']);
        $this->assertSame('desc', $result['sortDirection']);
    }

    public function test_verifyFilterInputs_with_valid_request()
    {
        $request = new Request();
        $request->setMethod('POST');
        $request->request->add([
            'search_columns' => 'name,email',
            'search_value' => 'john',
            'order_by_column' => 'created_at',
            'column_sort_direction' => 'asc'
        ]);

        $expected = [
            'searchValue' => 'john',
            'searchColumns' => ['name', 'email'],
            'orderColumn' => 'created_at',
            'sortDirection' => 'asc'
        ];

        $result = ListFilters::verifyFilterInputs($request);
        $this->assertEquals($expected, $result);
    }

    public function test_verifyFilterInputs_with_empty_searchValue()
    {
        $request = new Request();
        $request->setMethod('POST');
        $request->request->add([
            'search_columns' => 'name,email',
            'search_value' => '',
            'order_by_column' => 'created_at',
            'column_sort_direction' => 'asc'
        ]);

        $expected = [
            'searchValue' => null,
            'searchColumns' => ['name', 'email'],
            'orderColumn' => 'created_at',
            'sortDirection' => 'asc'
        ];

        $result = ListFilters::verifyFilterInputs($request);
        $this->assertEquals($expected, $result);
    }

    public function test_verifyFilterInputs_with_empty_SearchColumns()
    {
        $request = new Request();
        $request->setMethod('POST');
        $request->request->add([
            'search_columns' => '',
            'search_value' => 'john',
            'order_by_column' => 'created_at',
            'column_sort_direction' => 'asc'
        ]);

        $expected = [
            'searchValue' => 'john',
            'searchColumns' => ['id'],
            'orderColumn' => 'created_at',
            'sortDirection' => 'asc'
        ];

        $result = ListFilters::verifyFilterInputs($request);
        $this->assertEquals($expected, $result);
    }

    public function test_verifyFilterInputs_with_empty_orderColumn_and_sortDirection()
    {
        $request = new Request();
        $request->setMethod('POST');
        $request->request->add([
            'search_columns' => 'name,email',
            'search_value' => 'john',
            'order_by_column' => '',
            'column_sort_direction' => ''
        ]);

        $expected = [
            'searchValue' => 'john',
            'searchColumns' => ['name', 'email'],
            'orderColumn' => 'id',
            'sortDirection' => 'desc'
        ];

        $result = ListFilters::verifyFilterInputs($request);
        $this->assertEquals($expected, $result);
    }


}
