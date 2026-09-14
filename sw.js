importScripts('https://www.gstatic.com/firebasejs/10.4.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.4.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBoi8LQllyFmUfEl1wyf7RBlNh_iRMk8vs",
  authDomain: "smart-irrigation-fydp.firebaseapp.com",
  databaseURL: "https://smart-irrigation-fydp-default-rtdb.firebaseio.com",
  projectId: "smart-irrigation-fydp",
  storageBucket: "smart-irrigation-fydp.firebasestorage.app",
  messagingSenderId: "789342675641",
  appId: "1:789342675641:web:c6e129b459071863bf7168"
});

const messaging = firebase.messaging();
messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'icon.png' // Aapka water drop wala logo
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
// Minimal service worker — just enough to make the dashboard installable.
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => new Response('Offline'))
  );
});
