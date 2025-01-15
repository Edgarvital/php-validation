<?php

namespace Database\Seeders;

use App\Models\Profile;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->create([
            ['name' => 'Admin'],
            ['name' => 'User'],
        ]);
    }

    private function create($data)
    {
        foreach ($data as $item) {
            $profile = Role::where('name', $item['name'])->first();

            if (!$profile) {
                Role::create($item);
            }
        }
    }
}
