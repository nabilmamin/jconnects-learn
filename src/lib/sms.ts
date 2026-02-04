import twilio from 'twilio';

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

const fromNumber = process.env.TWILIO_PHONE_NUMBER!;

type ReminderParams = {
    to: string;
    customerName: string;
    eventCity: string;
    eventDate: string;
};

export async function sendEventReminder(params: ReminderParams) {
    const { to, customerName, eventCity, eventDate } = params;

    const formattedDate = new Date(eventDate).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });

    const message = await client.messages.create({
        from: fromNumber,
        to: to,
        body: `Hi ${customerName}! Reminder: Your dinner in ${eventCity} is on ${formattedDate}. See you there!`,
    });

    return message;
}

type TableAssignmentParams = {
    to: string;
    customerName: string;
    venueName: string;
    venueAddress: string;
    dinnerTime: string;
};

export async function sendTableAssignment(params: TableAssignmentParams) {
    const { to, customerName, venueName, venueAddress, dinnerTime } = params;

    const message = await client.messages.create({
        from: fromNumber,
        to: to,
        body: `Hi ${customerName}! You've been assigned to ${venueName} (${venueAddress}) at ${dinnerTime}. Enjoy your dinner!`,
    });

    return message;
}
