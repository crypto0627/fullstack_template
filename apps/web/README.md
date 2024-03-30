This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Get WALLETCONNECT_PROJECT_ID and create Email to send the information to your customer who buy the product

1. copy .env.example to .env and fill in with your personal key and account

2. install by pnpm

3. run the docker and migrate

4. use pnpm run dev to start

Other,

```bash
copy .env.example to .env

pnpm i

docker compose up -d

pnpm migrate

pnpm run dev
```

All Events Page:

Overview: Discover all listed events. Each event card offers a snapshot of the activity, inviting users to explore further.

Event Details: Clicking on an event card reveals in-depth information, providing insights into what the event entails.

Investment Option: If interested, users have the opportunity to invest in an event, requiring sufficient funds in their wallet.

Post-Event Actions: For events that have concluded, users can check the withdrawal rate and participate in voting to support or oppose the fundraising outcome.

My Events Page:

Create a Fundraising Event: Initiate your fundraising journey by clicking 'get fund' located at the top right corner.

NFT Product Issuance: To feature your event on the All Events page, navigate to 'my event' to edit and issue NFT products, enhancing its visibility and appeal.

Event Customization: Individual event pages allow for comprehensive customization, including title, description, and funding goals, ensuring your event resonates with potential backers.

My Collection:

Project Overview: View a comprehensive list of projects you've contributed to, capturing your investment journey.

Product Exploration: Delve into specific contributions by clicking on a project card, unveiling the unique products you've acquired.

Personalization and Notifications: Customize your profile on the left panel, including email settings to stay informed about your investments and purchases, enhancing your platform experience.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
