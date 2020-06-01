package com.example.recipe_book;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.google.gson.Gson;
import com.squareup.picasso.Picasso;

public class ProfileActivity extends AppCompatActivity {

    TextView username;
    TextView email;
    ImageView imageView;
    ImageView back;
    Button logout;

    User user = new User();

    String name, mail, password, profilePicture;

    private Button btn_login;

    @Override
    public void onSaveInstanceState(Bundle outState) {
        Toast.makeText(getApplicationContext(), "saved instance", Toast.LENGTH_LONG).show();
        super.onSaveInstanceState(outState);
        outState.putParcelable("userState", user);
    }

    @Override
    protected final void onRestoreInstanceState(final Bundle outState)
    {
        // Restore saved variables and reshow activities if they were open.
        Toast.makeText(getApplicationContext(), "restoring instance", Toast.LENGTH_LONG).show();
        user = outState.getParcelable("userState");
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);


       Intent i = getIntent();
        if (i.hasExtra("user")) {
            user = i.getParcelableExtra("user");
            Toast.makeText(getApplicationContext(), "got intent", Toast.LENGTH_LONG).show();
        }

        else {

            if ( savedInstanceState != null ) {
                user = savedInstanceState.getParcelable("userState");
                Toast.makeText(getApplicationContext(), "there is saved instance", Toast.LENGTH_LONG).show();
            }

            else {
                Toast.makeText(getApplicationContext(), "no intent", Toast.LENGTH_LONG).show();
                Intent intent = new Intent(ProfileActivity.this, Login.class);
                startActivity(intent);
                finish();
            }
        }

        setContentView(R.layout.activity_profile);

        username = findViewById(R.id.txtUsername);
        email = findViewById(R.id.txtEmail);
        imageView = findViewById(R.id.profilePicture);
        back = findViewById(R.id.imgBack);
        logout = findViewById(R.id.btnLogOut);


        name = user.getName();
            mail = user.getEmail();
            password = user.getPassword();
            profilePicture = user.getImage();

            username.setText(name);
            email.setText(mail);
            Picasso.get().load(profilePicture).into(imageView);


        back.setOnClickListener(new View.OnClickListener() {
            //@Override
            public void onClick(View v) {
                goBack();
            }
        });

        logout.setOnClickListener(new View.OnClickListener() {
            //@Override
            public void onClick(View v) {
                Intent i = new Intent(ProfileActivity.this, Login.class);
                startActivity(i);
            }
        });
    }

    @Override
    public void onBackPressed() {
        goBack();
    }


    public void goBack() {
        Intent i = new Intent(ProfileActivity.this, MainActivity.class);
        i.putExtra("validation", 1);
        startActivity(i);
    }
}
