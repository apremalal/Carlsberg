package com.glasscube.beer;

import android.app.Activity;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.media.MediaPlayer;
import android.media.MediaPlayer.OnCompletionListener;
import android.net.Uri;
import android.os.Bundle;
import android.widget.MediaController;
import android.widget.VideoView;

public class Splash extends Activity implements OnCompletionListener {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.splash);
		setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
		VideoView video = (VideoView) findViewById(R.id.videoView);
		video.setMediaController(null);
		video.setVideoURI(Uri.parse("android.resource://" + getPackageName()+ "/" + R.raw.carlsberg)); // video file
		video.start();
		video.setOnCompletionListener(this);
	}

	@Override
	public void onCompletion(MediaPlayer mp) {
		Intent mainActivity = new Intent(this,Carlsberg.class); // call main function
		startActivity(mainActivity);
		finish();
	}
}
