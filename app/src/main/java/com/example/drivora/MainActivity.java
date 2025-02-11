package com.example.drivora;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.app.AppCompatDelegate;
import androidx.appcompat.widget.Toolbar;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import com.google.android.material.navigation.NavigationView;

public class MainActivity extends AppCompatActivity {

    private DrawerLayout drawerLayout;
    private NavigationView navigationView;
    private ImageView menuIcon;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        drawerLayout = findViewById(R.id.drawer_layout);
        navigationView = findViewById(R.id.nav_view);
        menuIcon = findViewById(R.id.menu_icon);

        // Add click listener to open drawer
        menuIcon.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (!drawerLayout.isDrawerOpen(GravityCompat.END)) {
                    drawerLayout.openDrawer(GravityCompat.END);
                }
            }
        });

        navigationView.setNavigationItemSelectedListener(new NavigationView.OnNavigationItemSelectedListener() {
            @SuppressLint("NonConstantResourceId")
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                int id = item.getItemId();

                if (id == R.id.nav_profile) {
                    Intent intent = new Intent(MainActivity.this, User_Profile_Activity.class);
                    startActivity(intent);
                } else if (id == R.id.nav_settings) {
                    Intent intent = new Intent(MainActivity.this, User_Setting_Activity.class);
                    startActivity(intent);
                } else if (id == R.id.nav_wishlist) {
                    Intent intent = new Intent(MainActivity.this, User_Wishlist_Activity.class);
                    startActivity(intent);
                } else if (id == R.id.nav_change_password) {
                    Intent intent = new Intent(MainActivity.this, ChangePassword_Activity.class);
                    startActivity(intent);
                } else if (id == R.id.nav_logout) {
                    Intent intent = new Intent(MainActivity.this, activity_login.class);
                    startActivity(intent);
                    Toast.makeText(MainActivity.this, "logged out", Toast.LENGTH_SHORT).show();
                }

                DrawerLayout drawer = findViewById(R.id.drawer_layout);
                drawer.closeDrawer(GravityCompat.END);
                return true;
            }

        });
    }
}
