import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createTicket, getUserById, getEventById } from '@/lib/db';
import { sendTicketConfirmation } from '@/lib/email';
import Stripe from 'stripe';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
    // Get the raw body as text (needed for signature verification)
    const body = await request.text();
    const signature = request.headers.get('stripe-signature')!;

    // Verify the webhook signature
    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err);
        return NextResponse.json(
            { error: 'Invalid signature' },
            { status: 400 }
        );
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        // Extract our metadata
        const userId = session.metadata?.userId;
        const eventId = session.metadata?.eventId;
        const quantity = parseInt(session.metadata?.quantity || '1');
        const pricePerTicket = parseInt(session.metadata?.pricePerTicket || '0');
        const stripePaymentId = session.payment_intent as string;

        if (!userId || !eventId) {
            console.error('Missing metadata in checkout session');
            return NextResponse.json(
                { error: 'Missing metadata' },
                { status: 400 }
            );
        }

        // Create ticket(s) in our database
        for (let i = 0; i < quantity; i++) {
            await createTicket({
                userId,
                eventId,
                price: pricePerTicket,
                stripePaymentId,
            });
        }

        console.log(`Created ${quantity} ticket(s) for user ${userId}`);

        // Send confirmation email
        const user = await getUserById(userId);
        const dinnerEvent = await getEventById(eventId);

        if (user && dinnerEvent) {
            await sendTicketConfirmation({
                to: user.email,
                customerName: user.name,
                eventCity: dinnerEvent.city,
                eventDate: dinnerEvent.date,
                quantity,
                totalPrice: pricePerTicket * quantity,
            });
            console.log(`Sent confirmation email to ${user.email}`);
        }
    }

    // Return 200 to acknowledge receipt
    return NextResponse.json({ received: true });
}
