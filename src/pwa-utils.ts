// PWA utilities and service worker registration

export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};

export const isStandalone = () => {
  return window.matchMedia('(display-mode: standalone)').matches || 
         (window.navigator as any).standalone === true;
};

export const canInstallPWA = () => {
  return 'serviceWorker' in navigator && 'PushManager' in window;
};

// Install prompt handling
let deferredPrompt: any;

export const setupInstallPrompt = () => {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    
    // Show install button or banner
    showInstallPromotion();
  });

  window.addEventListener('appinstalled', () => {
    // Hide the install promotion
    hideInstallPromotion();
    console.log('PWA was installed');
  });
};

export const showInstallPromotion = () => {
  // Show install banner or button
  const installBanner = document.getElementById('install-banner');
  if (installBanner) {
    installBanner.style.display = 'block';
  }
};

export const hideInstallPromotion = () => {
  // Hide install banner or button
  const installBanner = document.getElementById('install-banner');
  if (installBanner) {
    installBanner.style.display = 'none';
  }
};

export const installPWA = async () => {
  if (deferredPrompt) {
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    // Clear the deferredPrompt variable
    deferredPrompt = null;
  }
};

// Check if app is running in standalone mode
export const isPWAInstalled = () => {
  return isStandalone() || document.referrer.includes('android-app://');
};

// Offline detection
export const setupOfflineDetection = () => {
  window.addEventListener('online', () => {
    console.log('App is online');
    // Show online indicator
  });

  window.addEventListener('offline', () => {
    console.log('App is offline');
    // Show offline indicator
  });
};