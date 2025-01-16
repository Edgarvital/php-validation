<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    protected Role $adminRole;
    protected Role $userRole;

    protected function setUp(): void
    {
        parent::setUp();

        $this->adminRole = Role::create(['name' => 'Admin']);
        $this->userRole = Role::create(['name' => 'User']);
    }

    protected function authenticate_user($args = []): string
    {
        $userData = array_merge([
            'role_id' => $this->adminRole->id,
        ], $args);

        $user = User::factory()->create($userData);

        $token = $user->createToken('admin', ['admin'])->plainTextToken;

        return $token;
    }

    public function test_store_a_client_with_valid_data(): void
    {
        $token = $this->authenticate_user();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ])->postJson('/api/user', [
            'name' => 'Teste',
            'email' => 'teste' . rand(1, 1000) . '@gmail.com',
            'cpf' => '123.456.789-00',
            'phone_number' => '(11) 98765-4321',
            'birth_date' => '1990-01-01',
            'state' => 'São Paulo',
            'city' => 'São Paulo',
            'password' => '12345678',
            'role_id' => $this->userRole->id,
        ]);

        $response->assertStatus(201);

        $this->assertDatabaseHas('users', [
            'email' => $response['email'],
            'cpf' => '123.456.789-00',
            'role_id' => $this->userRole->id,
        ]);
    }

    public function test_store_a_client_with_invalid_data(): void
    {
        $token = $this->authenticate_user();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/json',
        ])->postJson('/api/user', [
            'name' => 'A',
            'email' => 'email_invalido',
            'cpf' => '12345678900',
            'phone_number' => '987654321',
            'birth_date' => '2025-01-01',
            'state' => '',
            'city' => '',
            'password' => '123',
            'role_id' => 999,
        ]);

        $response->assertStatus(422);

        $this->assertDatabaseMissing('users', [
            'email' => 'email_invalido',
        ]);
    }
}
