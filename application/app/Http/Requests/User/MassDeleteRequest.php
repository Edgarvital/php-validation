<?php

namespace App\Http\Requests\User;

use App\Api\Responses;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class MassDeleteRequest extends FormRequest
{

    public function rules()
    {
        return [
            'user_ids' => 'required|array',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(Responses::errorResponseWithData('Validation errors', $validator->errors(), 422));
    }
}
