package com.inknead;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;

import android.content.Intent;
import android.view.View;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
     @Override
     public void onWindowFocusChanged(boolean hasFocus) {
       super.onWindowFocusChanged(hasFocus);

       View decorView = getWindow().getDecorView();

       if (hasFocus) {
           decorView.setSystemUiVisibility(
                      View.SYSTEM_UI_FLAG_LOW_PROFILE
                  //  View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                  //  | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                  //  | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                  //  | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                  //  | View.SYSTEM_UI_FLAG_FULLSCREEN
                  //  | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
           );
       }
    }

    @Override
    public void onStart() {
      super.onStart();

      View decorView = getWindow().getDecorView();

      decorView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_FULLSCREEN);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }

    @Override
    protected String getMainComponentName() {
        return "inKnead";
    }
}
