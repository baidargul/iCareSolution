import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma-db";
import currentProfile from "@/lib/current-profile";

export async function POST(req: Request) {
  const response = {
    status: 400,
    message: "SERVER ERROR",
    data: {} || null,
  };

  const profile = await currentProfile();
  if (!profile) {
    response.status = 401;
    response.message = "Unauthorized";
    response.data = null;
    return new NextResponse(JSON.stringify(response));
  }

  try {
    let { name, description, objectType, category } = await req.json();

    if (!name) {
      response.status = 400;
      response.message = "Name is required";
      response.data = null;
      return new NextResponse(JSON.stringify(response));
    }

    if (!objectType) {
      objectType = "FIXED";
    }

    if (!category) {
      response.status = 400;
      response.message = "Category is required";
      response.data = null;
      return new NextResponse(JSON.stringify(response));
    }

    if (!description) {
      description = "";
    }

    const categoryID = await prisma.categories.findUnique({
      where: {
        name: category,
      },
    });

    if (!categoryID) {
      response.status = 400;
      response.message = "Category does not exist";
      response.data = null;
      return new NextResponse(JSON.stringify(response));
    }

    let object = await prisma.objects.findMany({
      where: {
        name: name,
        type: objectType,
        categoryId: category.id,
      },
    });

    if (object.length > 0) {
      response.status = 400;
      response.message = "Object already exists";
      response.data = null;
      return new NextResponse(JSON.stringify(response));
    }

    const newObject = await prisma.objects.create({
      data: {
        name: name,
        description: description,
        type: objectType,
        categoryId: categoryID?.id,
      },
    });

    response.status = 200;
    response.message = "Object created";
    response.data = newObject;
    console.log(`[SERVER SUCCESS] ${response.message}`);
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
