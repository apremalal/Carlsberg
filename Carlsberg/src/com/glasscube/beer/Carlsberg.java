package com.glasscube.beer;

import org.apache.cordova.DroidGap;

import android.os.Bundle;
import android.os.Handler;

public class Carlsberg extends DroidGap
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
     Handler h = new Handler();
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
    }
}

