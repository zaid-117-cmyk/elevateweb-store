import Razorpay from "razorpay";
const r = new Razorpay({ key_id: "rzp_live_Tfqz8Wq1ONYG1U", key_secret: "4MQGZ7oRzD5ffeVhN44k1idA" });
r.orders.create({ amount: 49900, currency: "INR" }).then(console.log).catch(console.error);
