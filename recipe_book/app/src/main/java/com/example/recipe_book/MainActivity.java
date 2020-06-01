package com.example.recipe_book;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.tabs.TabLayout;

import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;


import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    RecyclerView recyclerView;
    TabLayout tabLayout;
    List<Recipe> recipes;
    private static String JSON_URL = "http://192.168.1.2:8080/recipes";
    Adapter adapter;

    @Override
    public void onResume(){
        super.onResume();
            tabLayout = findViewById(R.id.activity_main_tab_layout);
            TabLayout.Tab tab = tabLayout.getTabAt(0);
            tab.select();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        recipes = new ArrayList<>();
        recyclerView = findViewById(R.id.recipes_list);
        tabLayout = findViewById(R.id.activity_main_tab_layout);

        tabLayout.clearOnTabSelectedListeners();
        //initializeOnTabSelectListener();


        /*Intent myIntent = getIntent();
        int validator = myIntent.getIntExtra("validation", 0);


        switch (validator) {
            case 1:
                initializeOnTabSelectListener(1);
                break;
            case 0:
                initializeOnTabSelectListener(0);
                break;
        }*/
        initializeOnTabSelectListener();
        extractRecipes();




    }

    private void initializeOnTabSelectListener(/*final int a*/) {
        tabLayout.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                switch (tab.getPosition()) {
                    case 1:
                        Intent i = getIntent();
                        Integer ajme = i.getIntExtra("validation", 0);
                        switch (ajme) {
                            case 0:
                                profile();
                                break;
                            case 1:
                                cont();
                                break;
                        }
                        break;
                    default:
                        Log.i("MainActivity", "Unknown tab selected");
                }
            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {

            }

            @Override
            public void onTabReselected(TabLayout.Tab tab) {

            }
        });
    }

    private void login() {
        Intent i = new Intent(MainActivity.this, Login.class);
        startActivity(i);
    }

    private void cont() {
        finish();
    }

    private void profile() {
        Intent i = new Intent(MainActivity.this, ProfileActivity.class);
        startActivity(i);
    }


    private void extractRecipes() {
        RequestQueue queue = Volley.newRequestQueue(this);
        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(Request.Method.GET, JSON_URL, null, new Response.Listener<JSONArray>() {

            @Override
            public void onResponse(JSONArray response) {
                for (int i = 0; i < response.length(); i++) {
                    try {

                        JSONObject recipeObject = response.getJSONObject(i);

                        Recipe recipe = new Recipe();
                        //recipe.setId(recipeObject.getInt("id"));
                        recipe.setName(recipeObject.getString("name").toString());
                        recipe.setDescription(recipeObject.getString("description").toString());
                        recipe.setDirections(recipeObject.getString("directions").toString());
                        recipe.setImg_url(recipeObject.getString("img_url").toString());
                        recipe.setPrep_time(recipeObject.getString("prep_time").toString());
                        recipe.setAuthor(recipeObject.getString("authorId").toString());

                        recipes.add(recipe);

                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }

                recyclerView.setLayoutManager(new LinearLayoutManager(getApplicationContext()));
                adapter = new Adapter(getApplicationContext(), recipes);
                recyclerView.setAdapter(adapter);
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.d("tag" ,"onErrorResponse: " + error.getMessage());
            }
        });

        queue.add(jsonArrayRequest);

    }
}
