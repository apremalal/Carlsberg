package com.glasscube.beer;

import org.apache.cordova.DroidGap;

import android.os.Bundle;
import android.view.KeyEvent;

public class Carlsberg extends DroidGap
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
    }
}

