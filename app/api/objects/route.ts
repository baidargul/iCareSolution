import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const response = {
    status: 400,
    message: "SERVER ERROR",
    data: null,
  };

  try {
    const { name, description, category } = await req.json();

    if (!name) {
      response.status = 400;
      response.message = "Name is required";
      response.data = null;
      return new NextResponse(JSON.stringify(response));
    }

    if(!category){
        response.status = 400;
        response.message = "Category is required";
        response.data = null;
        return new NextResponse(JSON.stringify(response));
    }


  } catch (error: any) {
    console.log(`[SERVER ERROR] ${error}`);
    return new NextResponse(
      JSON.stringify({
        ...response,
        message: error.message,
        status: error.status,
        data: null,
      })
    );
  }

  return new NextResponse(JSON.stringify(response));
}
