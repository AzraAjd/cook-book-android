package com.example.recipe_book;

import android.os.Parcel;
import android.os.Parcelable;


public class User implements Parcelable {

    private String name;
    private String email;
    private String password;
    private String image;


    public User(){}
    public User(String name, String email, String password, String image) {

        this.name = name;
        this.email = email;
        this.password = password;
        this.image = image;

    }

    protected User(Parcel in) {
        name = in.readString();
        email = in.readString();
        password = in.readString();
        image = in.readString();
    }

    public static final Creator<User> CREATOR = new Creator<User>() {
        @Override
        public User createFromParcel(Parcel in) {
            return new User(in);
        }

        @Override
        public User[] newArray(int size) {
            return new User[size];
        }
    };

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }


    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(name);
        dest.writeString(email);
        dest.writeString(password);
        dest.writeString(image);
    }
}