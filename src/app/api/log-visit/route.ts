import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
    try {
        const forwardedFor = request.headers.get('x-forwarded-for');
        const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';
        const { nodeId } = await request.json();

        const logEntry = `${new Date().toISOString()} - IP: ${ip}, Node: ${nodeId}\n`;
        const logPath = path.join(process.cwd(), 'logs', 'visits.txt');

        await fs.mkdir(path.dirname(logPath), { recursive: true });
        await fs.appendFile(logPath, logEntry);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error logging visit:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
