<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{

    public function index()
    {
        return Book::all();
    }

    public function store(Request $request)
    {

        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'year' => 'required'
        ]);

        return Book::create($request->all());
    }

    public function show($id)
    {
        return Book::find($id);
    }

    public function update(Request $request, $id)
    {
        $book = Book::find($id);
        $book->update($request->all());
        return $book;
    }

    public function destroy($id)
    {
       return Book::destroy($id);
    }

    public function search($title)
    {
       return Book::where('title', 'like', '%'.$title.'%')->get();
    }
}
