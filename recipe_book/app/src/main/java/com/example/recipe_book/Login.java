package com.example.recipe_book;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.service.autofill.UserData;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;

public class Login extends AppCompatActivity {

    private RequestQueue requestQueue;
    private EditText et_email, et_password;
    private Button btn_login;

    private User user = new User();

    private static String JSON_URL = "http://192.168.1.12:8080/users";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_login);

        et_email = findViewById(R.id.txtEmail);
        et_password = findViewById(R.id.txtPassword);

        btn_login = findViewById(R.id.btnLogin);

        btn_login.setOnClickListener(new View.OnClickListener() {

             @Override
             public void onClick(View v) {
                 String data = "{"+
                         "\"email\"" + ":" + "\"" + et_email.getText().toString() + "\","+
                         "\"password\"" +":"+ "\"" + et_password.getText().toString() + "\""+
                         "}";
                 Submit(data);
                 finish();
             }
         }
        );
    }


    private void Submit(String data)
    {
        final String saveData = data;
        String URL = "http://192.168.1.2:8080/login";

        requestQueue = Volley.newRequestQueue(getApplicationContext());
        StringRequest stringRequest = new StringRequest(Request.Method.POST, URL, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                try {

                    JSONObject objres = new JSONObject(response);
                    JSONObject JSONUser = objres.getJSONObject("user");

                    user.setName(JSONUser.getString("name").toString());
                    user.setEmail(JSONUser.getString("email").toString());
                    user.setPassword(JSONUser.getString("password").toString());
                    user.setImage(JSONUser.getString("image").toString());

                   Toast.makeText(getApplicationContext(), JSONUser.toString() , Toast.LENGTH_LONG).show();

                    Intent i = new Intent(Login.this ,ProfileActivity.class);
                    i.putExtra("user", user);
                    startActivity(i);

                } catch (JSONException e) {
                    Toast.makeText(getApplicationContext(), "Server Error", Toast.LENGTH_LONG).show();
                }
            }
        }, new Response.ErrorListener() {
        @Override
        public void onErrorResponse(VolleyError error) {
            Toast.makeText(getApplicationContext(), error.getMessage(), Toast.LENGTH_SHORT).show();
        }
    }){
            @Override
            public String getBodyContentType() {
                return "application/json; charset=utf-8";
            }

            @Override
            public byte[] getBody() throws AuthFailureError {
                try {
                    return saveData == null ? null : saveData.getBytes("utf-8");
                } catch (UnsupportedEncodingException uee) {
                    //Log.v("Unsupported Encoding while trying to get the bytes", data);
                    return null;
                }
            }

        };
        requestQueue.add(stringRequest);


    }
}