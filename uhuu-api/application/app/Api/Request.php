<?php

namespace App\Api;

class Request
{

    public static function commaSeparatedStringToArray($string): ?array
    {
        $array = explode(',', str_replace(' ', '', $string));
        $array = array_filter($array);
        return $array ?? null;
    }

}
