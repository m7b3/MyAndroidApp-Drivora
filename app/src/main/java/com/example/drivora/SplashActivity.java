package com.example.drivora;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import androidx.appcompat.app.AppCompatActivity;
import com.airbnb.lottie.LottieAnimationView;

public class SplashActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);

        // Delay for 3 seconds and move to MainActivity
        new Handler().postDelayed(() -> {
            startActivity(new Intent(SplashActivity.this, activity_login.class));
            finish();
        }, 2500);
    }
}