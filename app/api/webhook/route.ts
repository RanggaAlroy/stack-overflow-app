/* eslint-disable camelcase */
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createUser, updateUser, deleteUser } from '@/lib/actions/user.action'
import { NextResponse } from 'next/server'
 
export async function POST(req: Request) {
  // Retrieve the WEBHOOK_SECRET from the environment variables
  const WEBHOOK_SECRET = process.env.NEXT_CLERK_WEBHOOK_SECRET;

  // Validate the presence of WEBHOOK_SECRET
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  // Extract the SVIX headers from the request headers
  const headers = await req.headers();
  const svixId = headers.get('svix-id');
  const svixTimestamp = headers.get('svix-timestamp');
  const svixSignature = headers.get('svix-signature');

  // Check for the presence of SVIX headers
  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    });
  }

  // Parse the request body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Initialize a new SVIX instance using the WEBHOOK_SECRET
  const wh = new Webhook(WEBHOOK_SECRET);

  // Attempt to verify the payload using the SVIX instance and the SVIX headers
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Webhook signature verification failed', {
      status: 401,
    });
  }

  // Extract the event type from the verified webhook event
  const eventType = evt.type;

  // Handle user creation event
  if (eventType === 'user.created') {
    const { id, email_addresses, image_url, username, first_name, last_name } = evt.data;

    // Create a new user in your database
    const mongoUser = await createUser({
      clerkId: id,
      name: `${first_name} ${last_name || ''}`,
      username: username || '',
      email: email_addresses[0].email_address,
      picture: image_url,
    });

    return NextResponse.json({ message: 'OK', user: mongoUser });
  }

  // Handle user update event
  if (eventType === 'user.updated') {
    const { id, email_addresses, image_url, username, first_name, last_name } = evt.data;

    // Update the user in your database
    const mongoUser = await updateUser({
      clerkId: id!,
      updateData: {
      name: `${first_name} ${last_name || ''}`,
      username: username || '',
      email: email_addresses[0].email_address,
      picture: image_url,
      },
      path: ''
    });

    return NextResponse.json({ message: 'OK', user: mongoUser });
  }

  // Handle user deletion event
  if (eventType === 'user.deleted') {
    const { id } = evt.data;

    // Delete the user from your database
    const deletedUser = await deleteUser({
      clerkId: id!,
    });

    return NextResponse.json({ message: 'OK', user: deletedUser });
  }

  // Handle any other unhandled event types
  return new Response('', { status: 201 });
}
 