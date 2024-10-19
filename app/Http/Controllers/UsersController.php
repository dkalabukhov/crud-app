<?php

namespace App\Http\Controllers;

use App\Models\users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = users::latest()->get();

        return inertia('Home', ['users' => $users]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'email' => ['required', 'email'],
            'name' => ['required', 'min:2'],
            'sex' => ['required'],
            'birthday' => ['required', 'date'],
        ]);

        users::create($fields);

        return redirect('/')->with(
            'message', 'The user was created successfully'
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(users $user)
    {
        return inertia('Show', ['user' => $user]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(users $user)
    {
        return Inertia('Edit', ['user' => $user]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, users $user)
    {
        $fields = $request->validate([
            'email' => ['required', 'email'],
            'name' => ['required', 'min:2'],
            'sex' => ['required'],
            'birthday' => ['required', 'date'],
        ]);

        $user->update($fields);

        return redirect('/')->with(
            'message', 'The user was updated successfully'
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(users $user)
    {
        $user->delete();
        Session::flash('message', 'The user was deleted successfully');
    }
}
