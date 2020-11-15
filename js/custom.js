 /* Install App Button */

 var divInstall = document.querySelector("#installApp");
 var butInstall = document.querySelector("div#installApp a"); 
 
 window.addEventListener('beforeinstallprompt', (event) => {
   console.log('👍', 'beforeinstallprompt', event);
   // Stash the event so it can be triggered later.
   window.deferredPrompt = event;
   // Remove the 'hidden' class from the install button container
   //divInstall.classList.toggle('unvisible', false);
   /*divInstall.classList.remove("unvisible");*/
   divInstall.removeAttribute("hidden");
 });

 butInstall.addEventListener('click', () => {
   console.log('👍', 'butInstall-clicked');
   const promptEvent = window.deferredPrompt;
   if (!promptEvent) {
     // The deferred prompt isn't available.
     return;
   }
   // Show the install prompt.
   promptEvent.prompt();
   // Log the result
   promptEvent.userChoice.then((result) => {
     console.log('👍', 'userChoice', result);
     // Reset the deferred prompt variable, since
     // prompt() can only be called once.
     window.deferredPrompt = null;
     // Hide the install button.
     //divInstall.classList.toggle('unvisible', true);
     /*divInstall.classList.add("unvisible");*/
     divInstall.setAttribute("hidden");
   });
 });

 window.addEventListener('appinstalled', (evt) => {
   // Log install to analytics
   console.log('INSTALL: Success');
 });

 window.addEventListener('DOMContentLoaded', () => {
   let displayMode = 'browser tab';
   if (navigator.standalone) {
     displayMode = 'standalone-ios';
   }
   if (window.matchMedia('(display-mode: standalone)').matches) {
     displayMode = 'standalone';
   }
   // Log launch display mode to analytics
   console.log('DISPLAY_MODE_LAUNCH:', displayMode);
 });  

/* On iOS */

function showIosInstall() {
  let iosPrompt = document.querySelector(".ios-prompt");
  iosPrompt.style.display = "block";
  iosPrompt.addEventListener("click", () => {
    iosPrompt.style.display = "none";
  });
}

// Detects if device is on iOS
const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test( userAgent );
}
// Detects if device is in standalone mode
const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

// Checks if should display install popup notification:
if (isIos() && !isInStandaloneMode()) {
  // this.setState({ showInstallMessage: true });
  showIosInstall();
}  

/* / On iOS */

openShare = async () => {
 if (navigator && navigator.share) {
   await shareNative();
 } else {
   await shareFallback();
 }
};

function shareNative() {
 return new Promise(async (resolve) => {
   const shareUrl =
         `${window.location.protocol}//${window.location.host}`;

   await navigator.share({
     text: 'Посмотри этот замечательный сайт и ты найдешь много ответов на свои вопросы',
     url: shareUrl,
   });

   resolve();
 });
}

// Web Share API Fallback Implementation
function shareFallback() {
 return new Promise(async (resolve) => {
   const webSocialShare =
         document.querySelector('web-social-share');

   if (!webSocialShare || !window) {
     return;
   }

   const shareUrl =
         `${window.location.protocol}//${window.location.host}`;

   const share = {
     displayNames: true,
     config: [{
       facebook: {
         socialShareUrl: shareUrl,
         //socialSharePopupWidth: 300,
         //socialSharePopupHeight: 400
       }
     },{
       email: {
         socialShareBody: shareUrl
       }
     },{
       copy: {
         socialShareBody: shareUrl
       }
     },{
       whatsapp: {
         socialShareUrl: shareUrl
       }
     }]
   };
   // The configuration, set the share options
   webSocialShare.share = share;
   // Show/open the share actions
   webSocialShare.show = true;

   resolve();
 });
}
