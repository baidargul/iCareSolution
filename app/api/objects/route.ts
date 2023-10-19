import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma-db";
import currentProfile from "@/lib/current-profile";
import { property } from "@prisma/client";

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
    // throw new Error("Unauthorized");
    return new NextResponse(JSON.stringify(response));
  }

  try {
    let { name, description, objectType, category, properties } =
      await req.json();

      console.log(properties)

    if (!name) {
      response.status = 400;
      response.message = "Name is required";
      response.data = null;
      // throw new Error("Name is required");
      return new NextResponse(JSON.stringify(response));
    }

    if (!objectType) {
      objectType = "FIXED";
    }

    if (!category) {
      response.status = 400;
      response.message = "Category is required";
      response.data = null;
      // throw new Error("Category is required");
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
      // throw new Error("Category does not exist");
      return new NextResponse(JSON.stringify(response));
    }

    let object = await prisma.objects.findMany({
      where: {
        name: name.toUpperCase(),
        type: objectType.toUpperCase(),
        categoryId: category.id,
      },
    });

    if (object.length !== 0) {
      response.status = 400;
      response.message = "Object already exists, in this category with same type and name.";
      response.data = null;
      return new NextResponse(JSON.stringify(response));
    }

    const newObject = await prisma.objects.create({
      data: {
        name: name.toUpperCase(),
        description: description,
        type: objectType,
        categoryId: categoryID?.id,
      },
    });

    properties.forEach(async (property: any) => {
      const newProperty = await prisma.property.create({
        data: {
          name: property.name.toUpperCase(),
          description: property.description,
          type: property.type,
          objectId: newObject.id,
        },
      });

      property.values.forEach(async (value: any) => {
        await prisma.propertyValues.create({
          data: {
            id: value.id,
            propertyId: newProperty.id,
            name: value.name.toUpperCase(),
            description: value.description,
            index: value.index,
          },
        });
      });
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
