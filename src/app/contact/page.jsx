'use client'
import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import FadeUp from '../../components/motions/fadeUp';


const Contact = () => {
  const [name, setName] = useState('');
  const [value, setValue] = useState('')
  const [phn, setPhn] = useState('');
  const [mail, setMail] = useState('');
  const [msg, setMsg] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();

    // Your EmailJS service ID, template ID, and Public Key
    const serviceId = 'service_inkkj5n';
    const templateId = 'template_jgdcpd8';
    const publicKey = 'kj60QfQm-VcE4717P';

    // Create a new object that contains dynamic template params
    const templateParams = {
      msg_name: name,
      msg_phn_code: value,
      msg_phn: phn,
      msg_email: mail,
      msg_message: msg,
    };

    // Send the email using EmailJS
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        toast.dark("Message send successfully",response)
        setName('');
        setValue('');
        setPhn('');
        setMail('');
        setMsg('');
      })
      .catch((error) => {
        toast.error("Error sending email",error)
      });
  }

  return (
    <main className='min-h-screen w-full bg-white'>
        <div className='w-11/12 xl:w-10/12 mx-auto pt-32 py-20'>
             <div className='space-y-5'>
             <FadeUp duration={0.3} delay={0.1}>
                <h1 className='text-5xl font-medium'>Reach Out to Our Team.</h1>
             </FadeUp>
             <FadeUp duration={0.3} delay={0.2}>
                <p className='text-base xl:text-xl font-light'>You can send us an email or simply fill out the enquiry form and we will get back to you as soon as possible.</p>
             </FadeUp>
             </div>
             {/*  */}
             <div className='flex flex-col-reverse md:flex-row xl:gap-x-32 gap-y-10 pt-10 xl:pt-20 h-full'>
                {/* address */}
                <div className='md:basis-1/2 flex flex-col gap-5 xl:gap-10 font-light text-base xl:text-2xl'>
                  <FadeUp duration={0.3} delay={0.3}>
                    <div className='flex flex-col'>
                      <a className='hover:underline w-fit' href="mailto:info@dostudio.co.in" target='_blank'>info@dostudio.co.in</a>
                      <a className='hover:underline w-fit' href="tel:+919995055541" target='_blank'>+91 9995055541</a>
                      <a className='hover:underline w-fit' href="tel:+919746155541" target='_blank'>+91 9746155541</a>
                    </div>
                  </FadeUp>
                  <FadeUp duration={0.3} delay={0.4}>
                    <div>
                      <p>1st Floor, Ramaswami Complex,<br/>
                        Cherooty Rd, Behind Basics,<br/>
                        Kozhikode, Kerala,<br/>
                        India - 673001</p>
                    </div>
                  </FadeUp>
                </div>
                {/* form */}
                <form className='md:basis-1/2 flex flex-col gap-2 md:gap-3 w-full' onSubmit={handleSubmit}>
                    <div className='w-full'>
                        <input className='px-3 py-3 rounded-md bg-transparent w-full outline-none border placeholder:text-gray-300' type="text" placeholder='Name' name='msg_name' value={name} onChange={(e) => setName(e.target.value)} required/>
                    </div>
                    <div className='w-full flex px-3 py-3 rounded-md bg-transparent  outline-none border'>
                        <PhoneInput
                            required
                            className="phonecode w-24 outline-none"
                            international
                            name='msg_phn_code'
                            // defaultCountry="IN"
                            value={value}
                            onChange={setValue}
                        />
                        <input className='w-full bg-transparent outline-none [&::-webkit-inner-spin-button]:appearance-none placeholder:text-gray-300' type="number" inputMode='numeric' placeholder='Mobile' name='msg_phn' value={phn} onChange={(e) => setPhn(e.target.value)} required/>
                    </div>
                    <div className='w-full'>
                        <input className='px-3 py-3 rounded-md bg-transparent w-full outline-none border placeholder:text-gray-300' type="email" placeholder='Email' name='msg_email' value={mail} onChange={(e) => setMail(e.target.value)} required/>
                    </div>
                    <div className='w-full'>
                        <textarea rows={3} className='px-3 py-3 rounded-md bg-transparent w-full outline-none border placeholder:text-gray-300' type="text" placeholder='Message'name='msg_message' value={msg} onChange={(e) => setMsg(e.target.value)}/>
                    </div>
                    <div>
                    <button className="bg-primarygreen text-black w-fit px-8 h-12 rounded-full shadow-xl hover:shadow-2xl duration-200 font-medium capitalize grid place-items-center" name="send" value="Submit" type="submit">Submit</button>
                    </div>
                </form>
             </div>
        </div>
    </main>
  )
}

export default Contact