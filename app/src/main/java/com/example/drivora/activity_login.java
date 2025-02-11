package com.example.drivora;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Patterns;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class activity_login extends AppCompatActivity {
    EditText email, password;
    Button loginButton;
    ProgressBar progressBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        email = findViewById(R.id.email);
        password = findViewById(R.id.password);
        loginButton = findViewById(R.id.loginButton);
        progressBar = findViewById(R.id.progressBar);

        loginButton.setOnClickListener(view -> validateAndLogin());
    }

    private void validateAndLogin() {
        String emailInput = email.getText().toString().trim();
        String passwordInput = password.getText().toString().trim();

        if (TextUtils.isEmpty(emailInput)) {
            email.setError("Email is required!");
            email.requestFocus();
            return;
        }

        if (!Patterns.EMAIL_ADDRESS.matcher(emailInput).matches()) {
            email.setError("Enter a valid email!");
            email.requestFocus();
            return;
        }

        if (TextUtils.isEmpty(passwordInput)) {
            password.setError("Password is required!");
            password.requestFocus();
            return;
        }

        progressBar.setVisibility(View.VISIBLE);

        LoginRequest request = new LoginRequest(emailInput, passwordInput);
        Call<LoginResponse> call = RetrofitClient.getInstance().getApiService().loginUser(request);

        call.enqueue(new Callback<LoginResponse>() {
            @Override
            public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                progressBar.setVisibility(View.GONE);
                if (response.isSuccessful() && response.body() != null) {
                    if (response.body().isSuccess()) {
                        Toast.makeText(activity_login.this, "Login Successful!", Toast.LENGTH_SHORT).show();
                        startActivity(new Intent(activity_login.this, MainActivity.class));
                        finish();
                    } else {
                        Toast.makeText(activity_login.this, response.body().getMessage(), Toast.LENGTH_SHORT).show();
                    }
                } else {
                    Toast.makeText(activity_login.this, "Login failed! Try again.", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<LoginResponse> call, Throwable t) {
                progressBar.setVisibility(View.GONE);
                Toast.makeText(activity_login.this, "Network Error!", Toast.LENGTH_SHORT).show();
            }
        });
    }

    public void handleForgotPassword(View view) {
        startActivity(new Intent(this, activity_forgot_password.class));
    }

    public void handleSignUp(View view) {
        startActivity(new Intent(this, activity_signup.class));
    }
}
