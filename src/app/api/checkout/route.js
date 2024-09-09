import paypal from "@paypal/checkout-server-sdk";
import { NextResponse } from "next/server";

// Credenciales de PayPal
const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

// Entorno de sandbox para pruebas
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export async function POST() {
  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "100.00",
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: '100.00',
            }
          }
        },
        items: [
          {
            name: 'Book of React',
            description: 'A book about React',
            quantity: '1',
            unit_amount: {
              currency_code: 'USD',
              value: "50.00",
            }
          },
          {
            name: 'Book of Next',
            description: 'A book about Next',
            quantity: '1',
            unit_amount: {
              currency_code: 'USD',
              value: '50.00'
            }
          }
        ]
      }
    ]
  });

  try {
    const response = await client.execute(request);
    console.log(response);
    return NextResponse.json({ id: response.result.id });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
  }
}
