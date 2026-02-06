import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createTicket, getUserById, getEventById } from '@/lib/db';
import { sendTicketConfirmation } from '@/lib/email';
import { logger } from '@/lib/logger';
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
        logger.error('Webhook signature verification failed', err instanceof Error ? err : new Error(String(err)));
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
            logger.error('Missing metadata in checkout session', undefined, {
                sessionId: session.id,
            });
            return NextResponse.json(
                { error: 'Missing metadata' },
                { status: 400 }
            );
        }

        try {
            // Create ticket(s) in our database
            for (let i = 0; i < quantity; i++) {
                await createTicket({
                    userId,
                    eventId,
                    price: pricePerTicket,
                    stripePaymentId,
                });
            }

            logger.info('Tickets created', { userId, eventId, quantity });

            // Send confirmation email
            const user = await getUserById(userId);
            const dinnerEvent = await getEventById(eventId);

            if (user && dinnerEvent) {
                try {
                    await sendTicketConfirmation({
                        to: user.email,
                        customerName: user.name,
                        eventCity: dinnerEvent.city,
                        eventDate: dinnerEvent.date,
                        quantity,
                        totalPrice: pricePerTicket * quantity,
                    });
                    logger.info('Confirmation email sent', { email: user.email });
                } catch (emailError) {
                    // Log but don't fail the webhook - tickets were created successfully
                    logger.error('Failed to send confirmation email', emailError instanceof Error ? emailError : new Error(String(emailError)), {
                        userId,
                        email: user.email,
                    });
                }
            }
        } catch (error) {
            logger.error('Failed to process checkout webhook', error instanceof Error ? error : new Error(String(error)), {
                sessionId: session.id,
                userId,
                eventId,
            });
            // Return 500 so Stripe will retry the webhook
            return NextResponse.json(
                { error: 'Failed to process payment' },
                { status: 500 }
            );
        }
    }

    // Return 200 to acknowledge receipt
    return NextResponse.json({ received: true });
}
