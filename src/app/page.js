"use client";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function HomePage() {
  return (
    <div className="h-screen bg-slate-800 flex justify-center items-center">
      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID, // Usar la variable de entorno
        }}
      >
        <PayPalButtons
          style={{
            color: 'blue',
            layout: 'vertical',
          }}
          // Crear un orden de compra
          createOrder={async () => {
            // La petición fetch
            const res = await fetch('/api/checkout', {
              method: 'POST',
            });
            // Cuando tenemos la respuesta, la convertimos a JSON
            const order = await res.json();
            console.log(order);
            return order.id;
          }}
          // Escuchar la respuesta que venga desde PayPal
          onApprove={(data, actions) => {
            console.log(data);
            return actions.order.capture(); // Capturar el pago
          }}
          onCancel={(data) => {
            console.log("Cancelled:", data);
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}

export default HomePage;
