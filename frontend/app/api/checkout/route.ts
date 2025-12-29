import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
    try {
        if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes('****')) {
            throw new Error('Invalid Stripe Secret Key. Please configure STRIPE_SECRET_KEY in .env.local');
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

        const body = await req.json();
        const { bundleId, includeMaintenance } = body;
        console.log('Checkout Request Body:', body);


        let priceId;
        let maintenanceId;
        let mode: 'payment' | 'subscription' = 'subscription'; // Default to subscription for legacy/agency products

        switch (bundleId) {
            // New Hybrid Bundles
            case 'starter':
                priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER_ONETIME;
                if (includeMaintenance) {
                    maintenanceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER_MAINTENANCE;
                    mode = 'subscription';
                } else {
                    mode = 'payment'; // One-time only
                }
                break;
            case 'growth':
                priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_GROWTH_ONETIME;
                if (includeMaintenance) {
                    maintenanceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_GROWTH_MAINTENANCE;
                    mode = 'subscription';
                } else {
                    mode = 'payment';
                }
                break;
            case 'dominator':
                priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_DOMINATOR_ONETIME;
                if (includeMaintenance) {
                    maintenanceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_DOMINATOR_MAINTENANCE;
                    mode = 'subscription';
                } else {
                    mode = 'payment';
                }
                break;

            // Existing Agency/Nexaclean Products (Keep as Subscriptions)
            case 'agency_ignite':
                priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_AGENCY_IGNITE;
                break;
            case 'agency_growth':
                priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_AGENCY_GROWTH;
                break;
            case 'agency_dominator':
                priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_AGENCY_DOMINATOR;
                break;
            case 'agency_elite':
                priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_AGENCY_ELITE;
                break;
            case 'nexaclean_core':
                priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_NEXACLEAN_CORE;
                break;
            case 'nexaclean_full':
                priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_NEXACLEAN_FULL;
                break;
            default:
                return NextResponse.json(
                    { error: 'Invalid bundle ID' },
                    { status: 400 }
                );
        }

        if (!priceId) {
            return NextResponse.json(
                { error: 'Price ID not configured for this bundle' },
                { status: 500 }
            );
        }

        const line_items = [
            {
                price: priceId,
                quantity: 1,
            }
        ];

        if (maintenanceId) {
            line_items.push({
                price: maintenanceId,
                quantity: 1,
            });
        }

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: mode,
            success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.get('origin')}/services`,
            automatic_tax: { enabled: false },
        });

        return NextResponse.json({ url: session.url });
    } catch (err: any) {
        console.error('Error creating checkout session:', err);
        return NextResponse.json(
            { error: err.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
