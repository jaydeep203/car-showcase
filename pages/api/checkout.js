import {instance} from '../../utils/server';

const checkout = async(req, res)=>{
    const options = {
        amount: Number(req.body.Amount*100),
        currency:"USD"
    };
    const order = await instance.orders.create(options);
    res.status(200).json({
        success:true,
        order
    })
};

export default checkout;