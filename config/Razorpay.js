const Razorpay = require("razorpay")

exports.createinstance = () => {
    const instance = new Razorpay ({
        key_id : process.env.Razorpay_KEY ,
        key_secret : process.env.Razorpay_SECRETE
    })
}