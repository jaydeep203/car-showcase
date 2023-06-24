
const getkey = (req,res) => {
    res.json({
        key:process.env.RAZORPAY_API_KEY
    })
}

export default getkey;