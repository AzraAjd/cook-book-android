package com.example.recipe_book;

import android.content.Context;
import android.content.Intent;
import android.os.Parcelable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;


import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.squareup.picasso.Picasso;

import java.util.List;

public class Adapter extends RecyclerView.Adapter<Adapter.ViewHolder> {

    LayoutInflater inflater;
    List<Recipe> recipes;


    //how we receive data from the main activity
    public Adapter(Context ctx, List<Recipe> recipes) {
        this.inflater = LayoutInflater.from(ctx);
        this.recipes = recipes;
    }


    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        //binding data to view
        View view = inflater.inflate(R.layout.recipes_list, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        //binding data to the custom view components
        holder.recipeTitle.setText(recipes.get(position).getName());
        holder.description.setText(recipes.get(position).getDescription());
        Picasso.get().load(recipes.get(position).getImg_url()).resize(380, 330).into(holder.coverImage);
    }

    @Override
    public int getItemCount() {
        return recipes.size();
    }

    public class ViewHolder extends  RecyclerView.ViewHolder {
        //attach resources to variables
        TextView recipeTitle, description;
        ImageView coverImage;


        public ViewHolder(@NonNull View itemView) {
            super (itemView);

            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent i = new Intent(v.getContext(),ViewRecipe.class);
                    i.putExtra("recipe",recipes.get(getAdapterPosition()));
                    v.getContext().startActivity(i);
                }
            });

            recipeTitle = itemView.findViewById(R.id.txtRecipeTitle);
            description = itemView.findViewById(R.id.description);
            coverImage = itemView.findViewById(R.id.coverImage);
        }

    }
}
