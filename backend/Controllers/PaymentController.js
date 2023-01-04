

const Razorpay = require("razorpay");
var crypto = require("crypto");

module.exports.getOrderId = (request,response) =>{
   let {amount} = request.body;
     var instance = new Razorpay(
        {
            key_id:"rzp_test_smUx8oAyn9O4KS",
            key_secret:"0syZNTjhfmTUFqTWKu6aeqAL"
        }
     );
     var options = {
        amount : Number(amount)*100,
        currency:"INR",
        receipt: "order_rcptid_11",
     };
     instance.orders.create(options,function(err,order){
      //   console.log(order);
      if(err)
      {
         response.status(500).send({status:false});

      }
      else{
         response.status(200).send({status:true,order});
      }
     });
};

module.exports.verifyPayment = (request,response) => {

   // verify order
   let { razorpay_order_id,razorpay_payment_id,razorpay_signature} = request.body;
   let body = razorpay_order_id +"|" + razorpay_payment_id;
   var expectedSignature = crypto.createHmac("sha256","0syZNTjhfmTUFqTWKu6aeqAL").update(body.toString()).digest("hex");
   console.log("signature recieved ",razorpay_signature);
   console.log("signature generated",expectedSignature);

   var message = {status:false};
   if( expectedSignature === razorpay_signature) message = {
      status:true
   };
   response.send(message);
}