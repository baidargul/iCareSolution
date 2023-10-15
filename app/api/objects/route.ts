import { NextResponse } from "next/server";

export function POST(req: Request) {
  const resposne = {
    status: 400,
    message: "SERVER ERROR",
    data: null,
  };
  try {
    
  } catch (error) {
    console.log(`[SERVER ERROR] ${error}`);
    return new NextResponse(JSON.stringify({ resposne }));
  }

  return new NextResponse(
    JSON.stringify({
      message: "Hello World",
    })
  );
}
