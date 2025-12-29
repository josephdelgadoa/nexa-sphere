const Stripe = require('stripe');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables manually since we are running a standalone script
const envPath = path.resolve(__dirname, '../frontend/.env.local');
dotenv.config({ path: envPath });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function listPrices() {
    try {
        const prices = await stripe.prices.list({
            expand: ['data.product'],
            limit: 100,
            active: true,
        });

        console.log('--- FOUND PRICES ---');
        prices.data.forEach(price => {
            const productName = typeof price.product === 'string' ? price.product : price.product.name;
            const amount = price.unit_amount ? (price.unit_amount / 100).toFixed(2) : '0.00';
            const currency = price.currency.toUpperCase();
            console.log(`Product: "${productName}" | Price ID: ${price.id} | Amount: ${amount} ${currency}`);
        });
        console.log('--- END PRICES ---');
    } catch (error) {
        console.error('Error fetching prices:', error.message);
    }
}

listPrices();
