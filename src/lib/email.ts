import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type TicketConfirmationParams = {
    to: string;
    customerName: string;
    eventCity: string;
    eventDate: string;
    quantity: number;
    totalPrice: number;
};

export async function sendTicketConfirmation(params: TicketConfirmationParams) {
    const { to, customerName, eventCity, eventDate, quantity, totalPrice } = params;

    const formattedDate = new Date(eventDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const { data, error } = await resend.emails.send({
        from: 'jconnects-learn <onboarding@resend.dev>',
        to: to,
        subject: `Your dinner ticket is confirmed!`,
        html: `
            <h1>Thanks for your purchase, ${customerName}!</h1>
            <p>Your ticket${quantity > 1 ? 's are' : ' is'} confirmed for:</p>
            <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin: 16px 0;">
                <p><strong>Event:</strong> Dinner in ${eventCity}</p>
                <p><strong>Date:</strong> ${formattedDate}</p>
                <p><strong>Tickets:</strong> ${quantity}</p>
                <p><strong>Total:</strong> $${(totalPrice / 100).toFixed(2)}</p>
            </div>
            <p>We'll send you table assignment details closer to the event.</p>
            <p>See you there!</p>
        `,
    });

    if (error) {
        console.error('Failed to send email:', error);
        throw new Error(error.message);
    }

    return data;
}
