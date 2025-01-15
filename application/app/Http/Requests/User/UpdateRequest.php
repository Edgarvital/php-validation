<?php

namespace App\Http\Requests\User;

use App\Api\Responses;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateRequest extends FormRequest
{
    protected function prepareForValidation()
    {
        $this->merge([
            'email' => strtolower($this->email),
        ]);
    }

    public function rules()
    {
        $userId = $this->route('user_id');
        return [
            'name' => 'min:4|max:250',
            'email' => 'max:250|regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/|unique:users,email,'.$userId,
            'cpf' => 'max:250|regex:/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/|unique:users,cpf,'.$userId,
            'phone_number' => [
                'required',
                'regex:/^\(\d{2}\) \d{4,5}\-\d{4}$/',
            ],
            'birth_date' => [
                'required',
                'date',
                'before:today',
            ],
            'state' => 'required|string|max:100',
            'city' => 'required|string|max:150',
            'password' => 'required|string|min:8|max:250',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(Responses::errorResponseWithData('Validation errors', $validator->errors(), 422));
    }
}
