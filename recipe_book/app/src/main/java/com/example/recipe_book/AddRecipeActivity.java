package com.example.recipe_book;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
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

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;

public class AddRecipeActivity extends AppCompatActivity {

    private RequestQueue requestQueue;
    private EditText et_name, et_description, et_directions, et_img_url, et_prep_time;
    private Button btn_submit;

    private Recipe recipe = new Recipe();

    private static String JSON_URL = "http://192.168.1.12:8080/recipes";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_recipe);

        et_name = findViewById(R.id.txtRecipeName);
        et_description = findViewById(R.id.txtRecipeDescription);
        et_directions = findViewById(R.id.txtRecipeDirections);
        et_img_url = findViewById(R.id.txtRecipeImgUrl);
        btn_submit =findViewById(R.id.btnSubmitRecipe);
        et_prep_time = findViewById(R.id.txtRecipePrepTime);

        btn_submit.setOnClickListener(new View.OnClickListener() {

             @Override
             public void onClick(View v) {
                 String data = "{"+
                         "\"name\"" + ":" + "\"" + et_name.getText().toString() + "\","+
                         "\"description\"" +":"+ "\"" + et_description.getText().toString() + "\","+
                         "\"directions\"" + ":" + "\"" + et_name.getText().toString() + "\","+
                         "\"img_url\"" + ":" + "\"" + et_name.getText().toString() + "\","+
                         "\"prep_time\"" + ":" + "\"" + et_prep_time.getText().toString() + "\""+
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
        String URL = "http://192.168.1.2:8080/recipes";

        requestQueue = Volley.newRequestQueue(getApplicationContext());
        StringRequest stringRequest = new StringRequest(Request.Method.POST, URL, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                try {

                    JSONObject JSONRecipe = new JSONObject(response);
                    JSONObject objres = JSONRecipe.getJSONObject("recipe");

                    recipe.setName(objres.getString("name").toString());
                    recipe.setDescription(objres.getString("description").toString());
                    recipe.setDirections(objres.getString("directions").toString());
                    recipe.setImg_url(objres.getString("img_url").toString());
                    recipe.setPrep_time(objres.getString("prep_time").toString());

                    Intent i = new Intent(AddRecipeActivity.this ,MainActivity.class);
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
