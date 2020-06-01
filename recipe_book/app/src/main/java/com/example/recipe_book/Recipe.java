package com.example.recipe_book;

import android.os.Parcel;
import android.os.Parcelable;

public class Recipe implements Parcelable {

    private String name;
    private String img_url;
    private String description;
    private String directions;
    private String prep_time;
    private String author;

    public Recipe(){}
    public Recipe( String name, String img_url, String description, String directions, String prep_time,String author) {

        this.name = name;
        this.img_url = img_url;
        this.description = description;
        this.directions = directions;
        this.prep_time = prep_time;
        this.author = author;
    }

    protected Recipe(Parcel in) {
        name = in.readString();
        img_url = in.readString();
        description = in.readString();
        directions = in.readString();
        prep_time = in.readString();
        author = in.readString();
    }

    public static final Creator<Recipe> CREATOR = new Creator<Recipe>() {
        @Override
        public Recipe createFromParcel(Parcel in) {
            return new Recipe(in);
        }

        @Override
        public Recipe[] newArray(int size) {
            return new Recipe[size];
        }
    };

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String getImg_url() {
        return img_url;
    }

    public void setImg_url(String img_url) {
        this.img_url = img_url;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDirections() {
        return directions;
    }

    public void setDirections(String directions) {
        this.directions = directions;
    }

    public String getPrep_time() {
        return prep_time;
    }

    public void setPrep_time(String prep_time) {
        this.prep_time = prep_time;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(name);
        dest.writeString(img_url);
        dest.writeString(description);
        dest.writeString(directions);
        dest.writeString(prep_time);
        dest.writeString(author);
    }
}