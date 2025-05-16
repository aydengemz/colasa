// app/api/log-click/route.ts
import { NextRequest, NextResponse } from 'next/server';
import MobileDetect from 'mobile-detect';

export async function POST(req: NextRequest) {
  const ua = req.headers.get('user-agent') || '';
  const forwarded = req.headers.get('x-forwarded-for') || '';
  const ip = forwarded.split(',')[0] || 'unknown';

  const md = new MobileDetect(ua);
  const isMobile = !!md.mobile();
  const isPhone  = !!md.phone();

  const isLikelyRealDevice = isMobile && isPhone;

  console.log({ ip, ua, isMobile, isPhone, isLikelyRealDevice });

  return NextResponse.json({ isLikelyRealDevice });
}
