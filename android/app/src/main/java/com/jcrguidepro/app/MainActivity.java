package com.jcrguidepro.app;

import android.annotation.SuppressLint;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ProgressBar;
import android.widget.Toast;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.webkit.WebViewAssetLoader;

/**
 * Robust Hybrid MainActivity that loads local HTML files using WebViewAssetLoader.
 * This fixes "White Screen" issues by allowing ES modules and correct origin policies.
 */
public class MainActivity extends AppCompatActivity {

    private static final String TAG = "JCR_WebView";
    private WebView mWebView;
    private ProgressBar mProgressBar;
    private WebViewAssetLoader mAssetLoader;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_webview);

        mWebView = findViewById(R.id.webview);
        mProgressBar = findViewById(R.id.progressBar);
        
        // Use the standard internal domain for local assets
        mAssetLoader = new WebViewAssetLoader.Builder()
                .addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler(this))
                .build();

        // Enable Chrome DevTools remote debugging
        WebView.setWebContentsDebuggingEnabled(true);
        
        setupWebSettings();
        setupWebViewClients();

        // Load index.html via the asset loader. 
        // Mapping: /assets/ maps to the app's 'assets' folder.
        // Files are currently in assets/index.html
        mWebView.loadUrl("https://appassets.androidplatform.net/assets/index.html");
    }

    private void setupWebSettings() {
        WebSettings settings = mWebView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        
        // Essential for modern web frameworks
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        
        // Viewport settings
        settings.setUseWideViewPort(true);
        settings.setLoadWithOverviewMode(true);
        settings.setSupportZoom(true);
        settings.setBuiltInZoomControls(true);
        settings.setDisplayZoomControls(false);
        
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
    }

    private void setupWebViewClients() {
        mWebView.setWebViewClient(new WebViewClient() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                return mAssetLoader.shouldInterceptRequest(request.getUrl());
            }

            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                mProgressBar.setVisibility(View.VISIBLE);
                Log.d(TAG, "Loading URL: " + url);
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                mProgressBar.setVisibility(View.GONE);
                Log.d(TAG, "Finished loading: " + url);
            }

            @Override
            public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                Log.e(TAG, "WebView Error: " + error.getDescription() + " (URL: " + request.getUrl() + ")");
                if (request.isForMainFrame()) {
                    mProgressBar.setVisibility(View.GONE);
                }
            }
        });

        mWebView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onProgressChanged(WebView view, int newProgress) {
                mProgressBar.setProgress(newProgress);
                if (newProgress == 100) {
                    mProgressBar.setVisibility(View.GONE);
                }
            }

            @Override
            public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
                Log.d(TAG, "JS Console: [" + consoleMessage.messageLevel() + "] " + consoleMessage.message());
                return true;
            }
        });
    }

    @Override
    public void onBackPressed() {
        if (mWebView.canGoBack()) {
            mWebView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
