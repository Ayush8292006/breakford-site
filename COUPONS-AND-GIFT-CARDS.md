# How to create coupons and gift cards

Everything lives in **`js/offers.js`**, in the `OFFERS` block at the top. Edit, save, refresh. No other file needs touching.

## Create a coupon
Add a line under `coupons`:

    'DIWALI15':{type:'percent',value:15,label:'15% off for Diwali',expires:'2026-11-15'},
    'CLUB1000':{type:'flat',value:1000,min:10000,label:'₹1,000 off orders over ₹10,000'},

| Field | Meaning |
|---|---|
| code (the key) | What the customer types. Use capitals, no spaces. |
| `type` | `'percent'` (% off the cart) or `'flat'` (fixed ₹ off) |
| `value` | The percentage, or the rupee amount |
| `min` | Optional. Minimum cart value in ₹ |
| `expires` | Optional. Last valid day, `'YYYY-MM-DD'` |
| `once` | Optional. `true` = each browser can use it one time |
| `label` | Text shown in the cart |

To switch a coupon off, delete its line (or set an `expires` date in the past).

## Create a gift card
Add a line under `giftCards`:

    'BFGC-2500-K7Q2':{value:2500},

`value` is the balance in ₹. The card pays for part or all of an order and the unused balance stays on it. Make each code unique and hard to guess (for example `BFGC-` plus the value plus 4 random letters), and send it to the buyer by email or WhatsApp. Customers enter it in the same "Coupon or gift card code" box in the cart.

## The game coupon
Clearing the **Rack Match** game (6 pairs in 40 seconds) generates a one-time code like `BF20-K7Q2XM`, worth a flat 20% off. It is applied to the cart automatically and is used up once an order is placed. To change the reward or the time limit, edit `couponDef()` in `js/offers.js` (value `20`) and `TIME` in `js/extras.js`.

## Important: this is a prototype
The site has no server, so codes, balances and "used" flags are checked in the visitor's browser. Anyone who opens the browser tools can read the codes or bypass them. Before taking real payments, move code validation to the server: use the coupon and gift-card features of the shop platform (Shopify, WooCommerce) or the payment backend (e.g. Razorpay), and keep this file only as the design reference.
