"use client";
import { CarProps } from '@/types';
import React, {Fragment, useState} from 'react';
import Image from 'next/image';
import {Dialog, Transition} from "@headlessui/react";
import { generateCarImageUrl } from '@/utils';
import CustomButton from './CustomButton';
import Script from 'next/script';

// interface CarDetailsProps {
//     isOpen:boolean;
//     Amount:string;
//     closeModal:() => void;
//     car:CarProps;
// }



const CarDetails = ({isOpen, Amount, closeModal, car}) => {
    const CheckOutHandler = async(Amount) => { 

        try{
            const res = await fetch("/api/getkey");
            let data = await res.json();
            const key = data.key;
            const response = await fetch("/api/checkout", {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    Amount
                })
            });
            data = await response.json();
            const order = data.order;
            const options = {
                key: key,
                amount: order.amount, 
                currency: "USD",
                name: "Jaydeep",
                description: "Test Razorpay Transaction",
                image: "https://avatars.githubusercontent.com/u/105545949?v=4",
                order_id: order.id,
                callback_url: "/api/paymentverification",
                prefill: {
                    "name": "Gaurav Kumar",
                    "email": "gaurav.kumar@example.com",
                    "contact": "9000090000"
                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    "color": "#121212"
                }
            };
            
            const razor = new window.Razorpay(options);
            razor.open();

            
    
        }catch(error){
            console.log(error);
        }
    }

    

  return (
    
    <>
        <Script
            id={"razorpay-checkout-js"}
            src={'https://checkout.razorpay.com/v1/checkout.js'}
        />
            
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10"
                onClose={closeModal}
            >

                <Transition.Child
                    as={Fragment} enter='ease-out duration-300'
                    enterFrom='opacity-0' enterTo='opacity-100'
                    leave='ease-in duration-200' leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black bg-opacity-25' />
                </Transition.Child>

                <div className='fixed inset-0 overflow-y-auto'>
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment} enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95' enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200' leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <Dialog.Panel className="relative w-full max-w-lg
                                max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6
                                text-left shadow-xl transition-all flex flex-col gap-5
                            ">
                                <button
                                    type='button'
                                    className='absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100
                                        rounded-full
                                    '
                                    onClick={closeModal}
                                >
                                    <Image src="/close.svg"
                                        alt="close"
                                        width={20}
                                        height={20}
                                        className='object-contain'
                                    />
                                </button>

                                <div className="flex-1 flex flex-col gap-3">
                                    <div className="relative w-full h-40 bg-pattern
                                        bg-cover bg-center rounded-lg">
                                        <Image src={generateCarImageUrl(car)} alt="hero png" 
                                        fill priority className='object-contain'
                                         />
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                                        <Image src={generateCarImageUrl(car, "29")} alt="hero png" 
                                        fill priority className='object-contain'
                                         />
                                        </div>
                                        <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                                        <Image src={generateCarImageUrl(car, "33")} alt="hero png" 
                                        fill priority className='object-contain'
                                         />
                                        </div>
                                        <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                                        <Image src={generateCarImageUrl(car, "13")} alt="hero png" 
                                        fill priority className='object-contain'
                                         />
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className='custom-btn w-full py-[16px] rounded-full bg-primary-blue'
                                    onClick={()=>CheckOutHandler(Amount)}
                                >
                                    <span className='flex-1 text-white text-[14px] leading-[17px] font-bold' >CheckOut</span>
                                </button>
                                <div className="flex-1 flex-col gap-2">
                                    <h2 className='font-semibold text-xl capitalize'>
                                        {car.make} {car.model}
                                    </h2>
                                    <div className="flex flex-wrap gap-4">
                                        {Object.entries(car).map(([key, value])=>(
                                            <div className='flex justify-between gap-5 w-full text-right' key={key}>
                                                <h4 className='text-grey capitalize'>{key.split("_").join(" ")}</h4>
                                                <p className='text-black-100 font-semibold'>{value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>

            </Dialog>
        </Transition>
    </>
  )
}

export default CarDetails