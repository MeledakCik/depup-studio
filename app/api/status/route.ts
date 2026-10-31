import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    studio: 'Depup Studio',
    products: [
      {
        name: 'depup.cloud',
        category: 'Cloud storage',
        website: 'https://depup.cloud',
        googlePlay: 'https://play.google.com/store/apps/details?id=cloud.depup.app',
      },
      {
        name: 'depup Office',
        category: 'Productivity',
        googlePlay: 'https://play.google.com/store/apps/details?id=studio.depup.office',
      },
    ],
  });
}
