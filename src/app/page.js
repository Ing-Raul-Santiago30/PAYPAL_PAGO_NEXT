"use client"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"

function HomePage() {
  console.log(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID)
  return (
    <div className=" h-screen bg-slate-800 flex justify-center items-center">
      <PayPalScriptProvider
      options={{
        clientId: 'ASj9BEeCCS9UNGuHgr2Xp-yYAAsVaeFLIPEDwhrN9yF3W_7kmBLPkmXGbBD_fOsXnD_KmFjDKAXCsHja'
      }}
      >
      
      <PayPalButtons
      
       style={{
        color: 'blue',
        layout: 'horizontal'
       }}
       //crear un orden de compra
       createOrder={async ()=>{
        // la apeticion fetch
        const res = await fetch('/api/checkout',{
          method: 'POST'
        })
        // cuando tenemos la respuesto lo convertimos ajson 
        const order = await res.json()
        console.log(order)
        return order.id
       }}
       // ESCUCHA LA RESPUESTA QUE VENGA DESDE PAYPAL
       onApprove={(data, acttions)=>{
        console.log(data)
        acttions.order.capture() // para capturar el pago 
         
       }}
       onCancel={(data)=>{
        console.log("Cancelled:", data)
       }}
      />
       
      </PayPalScriptProvider>
    </div>
  )
}


       //onCancel={()=>{}}
       //onApprove={()=>{}}
export default HomePage