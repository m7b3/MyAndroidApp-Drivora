package com.example.drivora;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

public class activity_forgot_password extends AppCompatActivity {

    EditText email;
    Button resetPasswordButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_forgot_password);

        email = findViewById(R.id.email);
        resetPasswordButton = findViewById(R.id.resetPasswordButton);

        resetPasswordButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String emailInput = email.getText().toString().trim();

                if (TextUtils.isEmpty(emailInput)) {
                    email.setError("Enter a email address!");
                    Toast.makeText(activity_forgot_password.this, "Please enter your email", Toast.LENGTH_SHORT).show();
                    return;
                }

                if (!android.util.Patterns.EMAIL_ADDRESS.matcher(emailInput).matches()) {
                    email.setError(" ");
                    Toast.makeText(activity_forgot_password.this, "Enter a valid email", Toast.LENGTH_SHORT).show();
                    return;
                }

                // Send password reset link (Firebase or API logic here)
                Toast.makeText(activity_forgot_password.this, "Password reset link sent to your email", Toast.LENGTH_SHORT).show();
            }
        });
    }


    public void handleBackToLogin(View view) {
        Intent intent = new Intent(activity_forgot_password.this, activity_login.class);
        startActivity(intent);
    }
}
