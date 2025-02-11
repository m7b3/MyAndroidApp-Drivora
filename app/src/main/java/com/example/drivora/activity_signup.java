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

public class activity_signup extends AppCompatActivity {
    EditText firstName, lastName, email, password, confirmPassword;
    Button registerButton;
    ProgressBar progressBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup);

        firstName = findViewById(R.id.firstName);
        lastName = findViewById(R.id.lastName);
        email = findViewById(R.id.email);
        password = findViewById(R.id.password);
        confirmPassword = findViewById(R.id.confirmPassword);
        registerButton = findViewById(R.id.registerButton);
        progressBar = findViewById(R.id.progressBar);

        registerButton.setOnClickListener(view -> validateAndRegister());
    }

    private void validateAndRegister() {
        String firstNameInput = firstName.getText().toString().trim();
        String lastNameInput = lastName.getText().toString().trim();
        String emailInput = email.getText().toString().trim();
        String passwordInput = password.getText().toString().trim();
        String confirmPasswordInput = confirmPassword.getText().toString().trim();

        if (TextUtils.isEmpty(firstNameInput) || TextUtils.isEmpty(lastNameInput)) {
            Toast.makeText(this, "Name is required!", Toast.LENGTH_SHORT).show();
            return;
        }

        if (TextUtils.isEmpty(emailInput)) {
            email.setError("Email is required!");
            email.requestFocus();
            return;
        }

        if (!Patterns.EMAIL_ADDRESS.matcher(emailInput).matches()) {
            email.setError("Enter a valid email address!");
            email.requestFocus();
            return;
        }

        if (TextUtils.isEmpty(passwordInput) || passwordInput.length() < 6) {
            password.setError("Password must be at least 6 characters!");
            password.requestFocus();
            return;
        }

        if (!passwordInput.equals(confirmPasswordInput)) {
            confirmPassword.setError("Passwords do not match!");
            confirmPassword.requestFocus();
            return;
        }

        progressBar.setVisibility(View.VISIBLE);

        RegisterRequest request = new RegisterRequest(firstNameInput, lastNameInput, emailInput, passwordInput);
        Call<RegisterResponse> call = RetrofitClient.getInstance().getApiService().registerUser(request);

        call.enqueue(new Callback<RegisterResponse>() {
            @Override
            public void onResponse(Call<RegisterResponse> call, Response<RegisterResponse> response) {
                progressBar.setVisibility(View.GONE);
                if (response.isSuccessful() && response.body() != null) {
                    Toast.makeText(activity_signup.this, response.body().getMessage(), Toast.LENGTH_SHORT).show();
                    startActivity(new Intent(activity_signup.this, activity_login.class));
                    finish();
                } else {
                    Toast.makeText(activity_signup.this, "Registration failed!", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<RegisterResponse> call, Throwable t) {
                progressBar.setVisibility(View.GONE);
                Toast.makeText(activity_signup.this, "Network Error!", Toast.LENGTH_SHORT).show();
            }
        });
    }

    public void handleLogin(View view) {
        startActivity(new Intent(this, activity_login.class));
    }
}