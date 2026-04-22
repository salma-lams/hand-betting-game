import { NextResponse } from 'next/server';

export async function GET() {
  const mockLeaderboard = [
    { _id: '1', name: 'Alice', score: 150 },
    { _id: '2', name: 'Bob', score: 120 },
    { _id: '3', name: 'Charlie', score: 90 },
  ];
  
  return NextResponse.json(mockLeaderboard);
}
