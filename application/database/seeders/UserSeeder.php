<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = User::where('email', 'admin@admin.com')
            ->first();

        if (!$admin) {
            User::create([
                'name' => 'Administrador',
                'email' => 'admin@admin.com',
                'password' => Hash::make('password'),
                'cpf' => '000.000.000-00',
                'phone_number' => '(00) 0000-0000',
                'birth_date' => '1990-01-01',
                'state' => 'Pernambuco',
                'city' => 'Garanhuns',
                'is_active' => true,
                'role_id' => 1
            ]);
        }

    }
}
