import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma-db";
import currentProfile from "@/lib/current-profile";

export async function PATCH(req: Request) {
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
    let {
      id,
      name,
      description,
      type,
      categories,
      property: properties,
    } = await req.json();

    if (!id) {
      response.status = 400;
      response.message = "ID is required";
      response.data = null;
      // throw new Error("ID is required");
      return new NextResponse(JSON.stringify(response));
    }

    if (!name) {
      response.status = 400;
      response.message = "Name is required";
      response.data = null;
      // throw new Error("Name is required");
      return new NextResponse(JSON.stringify(response));
    }

    if (!type) {
      type = "FIXED";
    }

    if (!categories) {
      response.status = 400;
      response.message = "Category is required";
      response.data = null;
      // throw new Error("Category is required");
      return new NextResponse(JSON.stringify(response));
    }

    if (!description) {
      description = "";
    }

    let databaseObject = await prisma.objects.findFirst({
      include: {
        categories: true,
        property: {
          include: {
            propertyValues: {
              orderBy: {
                index: "asc",
              },
            },
          },
          orderBy: {
            index: "asc",
          },
        },
      },
      where: {
        id: id,
      },
      orderBy: {
        name: "asc",
      },
    });

    if (!databaseObject) {
      response.status = 400;
      response.message = "No object found in system";
      response.data = null;
      // throw new Error("Object does not exist");
      return new NextResponse(JSON.stringify(response));
    }

    console.log(databaseObject);

    if (databaseObject.name !== name.toUpperCase()) {
      const object = await prisma.objects.findMany({
        where: {
          name: name.toUpperCase(),
          type: type.toUpperCase(),
          categoryId: categories.id,
          NOT: {
            id: id,
          },
        },
      });

      if (object.length !== 0) {
        response.status = 400;
        response.message =
          "Object already exists, in this category with same type and name.";
        response.data = null;
        return new NextResponse(JSON.stringify(response));
      }
    }

    console.log(`Was there`);
    const categoryId = await prisma.categories.findUnique({
      where: {
        name: categories.name,
      },
    });

    if(!categoryId) {
      response.status = 400;
      response.message = "Category does not exist";
      response.data = null;
      // throw new Error("Category does not exist");
      return new NextResponse(JSON.stringify(response));
    }

    let newObject: any = await prisma.objects.update({
      where: {
        id: id,
      },
      data: {
        name: name.toUpperCase(),
        description: description.charAt(0).toUpperCase() + description.slice(1).toLowerCase(),
        type: type,
        categoryId: categoryId.id,
      },
    });

    console.log(`New Object: `, newObject);
    newObject = null;

    response.status = 200;
    response.message = "Object updated";
    // response.data = newObject;
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
      response.message =
        "Object already exists, in this category with same type and name.";
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

    let duplicatePropertiesCounter = 0;
    const duplicates = [] as string[];
    properties.forEach(async (property: any) => {
      const ID = await prisma.property.findMany({
        where: {
          name: property.name.toUpperCase(),
          objectId: newObject.id,
        },
      });
      if (ID.length > 0) {
        duplicatePropertiesCounter++;
        duplicates.push(property.name);
      }
    });

    if (duplicatePropertiesCounter > 0) {
      response.status = 400;
      response.message = `Properties already exists in this object: ${duplicates}`;
      response.data = null;
      return new NextResponse(JSON.stringify(response));
    }

    properties.forEach(async (property: any) => {
      const newProperty = await prisma.property.create({
        data: {
          name: property.name.toUpperCase(),
          description: property.description,
          type: property.type,
          objectId: newObject.id,
          index: property.index,
        },
      });

      if (property.type === "TEXT") {
        const lastValueIndex = property.values.length - 1;
        const value = property.values[lastValueIndex];
        await prisma.propertyValues.create({
          data: {
            id: value.id,
            propertyId: newProperty.id,
            name: value.name.toUpperCase(),
            description: value.description,
            index: value.index,
          },
        });
      } else {
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
      }
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
