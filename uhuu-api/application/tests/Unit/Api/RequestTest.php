<?php

namespace Tests\Unit\Api;


use App\Api\Request;
use PHPUnit\Framework\TestCase;


class RequestTest extends TestCase
{

    public function test_successfully_comma_separated_string_to_array()
    {
        $string = 'value1, value2, value3, value4';
        $result = Request::commaSeparatedStringToArray($string);
        $this->assertEquals(['value1', 'value2', 'value3', 'value4'], $result);
    }

    public function test_comma_separated_string_to_array_with_single_value()
    {
        $string = 'value1';
        $result = Request::commaSeparatedStringToArray($string);

        $this->assertEquals(['value1'], $result);
    }

    public function test_comma_separated_string_to_array_with_duplicate_values()
    {
        $string = 'value1, value2, value3, value2';
        $result = Request::commaSeparatedStringToArray($string);

        $this->assertNotEquals(['value1', 'value2', 'value3'], $result);
    }

    public function test_comma_separated_string_to_array_with_spaces()
    {
        $string = ' value1 ,value2, value3 , value4 ';
        $result = Request::commaSeparatedStringToArray($string);

        $this->assertEquals(['value1', 'value2', 'value3', 'value4'], $result);
    }


}
