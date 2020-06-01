package com.example.recipe_book;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ImageView;
import android.widget.TextView;

import com.squareup.picasso.Picasso;

public class ViewRecipe extends AppCompatActivity {

    TextView txtTitle;
    TextView txtDescription;
    TextView txtDirections;
    TextView txtPrepTime;
    ImageView coverImage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_view_recipe);

        txtTitle = findViewById(R.id.txtTitle);
        txtDescription = findViewById(R.id.txtDescription);
        txtDirections = findViewById(R.id.txtDirections);
        txtPrepTime = findViewById(R.id.txtPrepTime);
        coverImage = findViewById(R.id.coverImage);

        Intent i = getIntent();
        Recipe recipe = i.getParcelableExtra("recipe");

        String title = recipe.getName();
        String description = recipe.getDescription();
        String directions = recipe.getDirections();
        String prepTime = recipe.getPrep_time();
        String coverImg = recipe.getImg_url();

        txtTitle.setText(title);
        txtDescription.setText(description);
        txtDirections.setText(directions);
        txtPrepTime.setText(prepTime);
        Picasso.get().load(coverImg).resize(700, 550).into(coverImage);

    }
}
