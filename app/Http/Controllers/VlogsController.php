<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Vlogs;

class VlogsController extends Controller
{
    /**
     * Get all vlogs
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $vlogs = Vlogs::with('user')->get();

        return response()->json($vlogs);
    }

    public function getVlogsByUser()
    {


        $userId = auth()->user()->id;

        $vlogs = Vlogs::with('user')
            ->where('posted_by', $userId)
            ->get();

        return response()->json($vlogs);
    }

    public function store(Request $request)
    {

        $request->validate([
            'title' => 'required',
            'description' => 'required'
        ]);

        $imageName = null;

        if ($request->hasFile('image')) {
            $imageName = $request->file('image')->store('images', 'public');
        }


        try {
            $vlogs = Vlogs::create([
                'title' => $request->title,
                'description' => $request->description,
                'image' => $imageName,
                'posted_by' => auth()->user()->id,
            ]);

            if ($vlogs->save()) {
                $newVlog = [
                    'id' => $vlogs->id,
                    'title' => $vlogs->title,
                    'description' => $vlogs->description,
                    'image' => $vlogs->image,
                    'posted_by' => $vlogs->posted_by,
                    'user' => ['name' => auth()->user()->name]
                ];

                return response()->json($newVlog);
            } else {
                return response()->json(['message' => 'somehting went wrong',], 500);
            }
        } catch (\Throwable $th) {
            throw $th;
        }
    }


    public function update(Request $request, int $id)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required'
        ]);

        $vlog = Vlogs::find($id);

        if (!$vlog) {
            return response()->json(['message' => 'Vlog not found'], 404);
        }

        if (auth()->user()->id === $vlog->posted_by) {
            if ($request->hasFile('image')) {
                Storage::disk('public')->delete($vlog->image);
                $imageName = $request->file('image')->store('images', 'public');
                $vlog->image = $imageName;
            }

            $vlog->title = $request->title;
            $vlog->description = $request->description;

            try {
                if ($vlog->save()) {
                    return response()->json(['message' => 'Vlog updated successfully'], 200);
                } else {
                    return response()->json(['message' => 'Failed to update vlog'], 500);
                }
            } catch (\Throwable $th) {
                throw $th;
            }
        } else {
            return response()->json(['message' => 'Vlog not belongs to you'], 401);
        }
    }


    public function delete(int $id)
    {
        $vlog = Vlogs::find($id);

        if (!$vlog) {
            return response()->json(['message' => 'Vlog not found'], 404);
        }

        $imageName = $vlog->image;

        if (auth()->user()->id === $vlog->posted_by) {
            try {
                if ($vlog->delete()) {
                    if ($imageName) {
                        Storage::disk('public')->delete($imageName);
                    }
                    return response()->json(['message' => 'Vlog deleted successfully'], 200);
                }
            } catch (\Throwable $th) {
                throw $th;
            }
        } else {
            return response()->json(['message' => 'Vlog does not belong to you'], 401);
        }
    }
}
