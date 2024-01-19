import { headers } from 'next/headers';
import { WebhookReceiver } from 'livekit-server-sdk';
import db from '@/lib/db';
import { NextResponse } from 'next/server';

const API_KEY = process.env.LIVEKIT_API_KEY as string;
const API_SECRET = process.env.LIVEKIT_API_SECRET as string;

const receiver = new WebhookReceiver(API_KEY, API_SECRET);

export async function POST(req: Request) {
  const body = await req.text();
  const headerPayload = headers();
  const authorization = headerPayload.get('Authorization');

  if (!authorization) {
    return NextResponse.json(
      { error: 'No authorization header' },
      { status: 400 }
    );
  }

  const event = receiver.receive(body, authorization);

  if (event.event === 'ingress_started') {
    await db.stream.update({
      data: {
        isLive: true,
      },
      where: {
        ingressId: event.ingressInfo?.ingressId,
      },
    });
  }

  if (event.event === 'ingress_ended') {
    await db.stream.update({
      data: {
        isLive: false,
      },
      where: {
        ingressId: event.ingressInfo?.ingressId,
      },
    });
  }

  return NextResponse.json({ message: 'ok' }, { status: 200 });
}
