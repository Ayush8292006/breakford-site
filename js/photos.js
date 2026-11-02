/* BREAK FORD — own product photos
   Put the photos in assets/products/ and list them under the matching sub-category below.
   Photos are shared out across the products in that sub-category, in order.
   Anything left empty keeps the placeholder photo, so the site never shows a broken image.

   The photos from the client folder carry a "DM for details" strip. It is cropped out automatically
   (see --crop in css/extras.css). Use the clean versions if you have them and set CROP_WATERMARK=false.
   Note: the FIRST photo in the client's folder is not to be used. */
const CROP_WATERMARK=true;
const OWN_PHOTOS={
  'Pool Cues':[],            // e.g. ['assets/products/pool-cue-1.jpg','assets/products/pool-cue-2.jpg']
  'Club Cues':[],
  'Snooker Cues':[],
  'Premium Cues':[],
  'Single Joint Cases':[],
  '3/4 Joint Cases':[],
  'Half Joint Cases':[],
  'Snooker Tables':[],
  'Pool Tables':[],
  'French Billiards Tables':[],
  'Gloves':[],
  'Cue Tips':[],
  'Chalk':[],
  'Ball Sets':[],
  'Cleaning Equipment':[]
};
if(CROP_WATERMARK)document.documentElement.classList.add('crop-wm');
