import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getCurrentUser } from '@/lib/auth';
import { getEventById } from '@/lib/db';

export async function POST(request: NextRequest) {
    // Must be logged in to buy tickets
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json(
            { error: 'Must be logged in to purchase tickets' },
            { status: 401 }
        );
    }

    const { eventId, quantity } = await request.json();

    if (!eventId || !quantity) {
        return NextResponse.json(
            { error: 'Event ID and quantity are required' },
            { status: 400 }
        );
    }

    // Get event details
    const event = await getEventById(eventId);
    if (!event) {
        return NextResponse.json(
            { error: 'Event not found' },
            { status: 404 }
        );
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        customer_email: user.email,
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: `Dinner Ticket - ${event.city}`,
                        description: `Dinner on ${new Date(event.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}`,
                    },
                    unit_amount: event.price,
                },
                quantity: quantity,
            },
        ],
        metadata: {
            userId: user.id,
            eventId: event.id,
            quantity: quantity.toString(),
            pricePerTicket: event.price.toString(),
        },
        success_url: `${request.nextUrl.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${request.nextUrl.origin}/checkout/cancel`,
    });

    return NextResponse.json({ url: session.url });
}
