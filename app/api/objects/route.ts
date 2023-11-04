import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma-db";
import currentProfile from "@/lib/current-profile";
import { v4 } from "uuid";

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

    if (databaseObject.name.toUpperCase() !== name.toUpperCase()) {
      const object = await prisma.objects.findMany({
        where: {
          name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
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

    const categoryId = await prisma.categories.findUnique({
      where: {
        name: categories.name,
      },
    });

    if (!categoryId) {
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
        name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
        description:
          description.charAt(0).toUpperCase() +
          description.slice(1).toLowerCase(),
        type: type,
        categoryId: categoryId.id,
      },
    });

    //UPDATE PROPERTIES THAT ARE THE SAME
    properties.forEach(async (property: any) => {
      if (databaseObject) {
        databaseObject.property.forEach(async (databaseProperty: any) => {
          if (databaseProperty.id === property.id) {
            await prisma.property.update({
              where: {
                id: property.id,
              },
              data: {
                name:
                  property.name.charAt(0).toUpperCase() +
                  property.name.slice(1).toLowerCase(),
                description:
                  property.description.charAt(0).toUpperCase() +
                  property.description.slice(1).toLowerCase(),
                type: property.type.toUpperCase(),
                index: property.index,
              },
            });

            //ADD NEW PROPERTY VALUES THAT ARE NOT IN THE DATABASE
            property.propertyValues.forEach(async (value: any) => {
              const ID = await prisma.propertyValues.findMany({
                where: {
                  id: value.id,
                  propertyId: property.id,
                },
              });
              if (ID.length === 0) {
                await prisma.propertyValues.create({
                  data: {
                    id: value.id,
                    propertyId: property.id,
                    name:
                      value.name.charAt(0).toUpperCase() +
                      value.name.slice(1).toLowerCase(),
                    description:
                      value.description.charAt(0).toUpperCase() +
                      value.description.slice(1).toLowerCase(),
                    index: value.index,
                  },
                });
              }
            });


            //UPDATE PROPERTY VALUES THAT ARE THE SAME
            if (property.type === "TEXT") {
              console.log(`Available values: `, property.propertyValues);
              const lastValueIndex = property.propertyValues.length - 1;
              const value = property.propertyValues[lastValueIndex];
              console.log(`Working on:`, value);
              


              const updatedValue = await prisma.propertyValues.update({
                where: {
                  id: value.id,
                  propertyId: property.id,
                },
                data: {
                  name:
                    value.name.charAt(0).toUpperCase() +
                    value.name.slice(1).toLowerCase(),
                  description:
                    value.description.charAt(0).toUpperCase() +
                    value.description.slice(1).toLowerCase(),
                  index: value.index,
                },
              });
              console.log(`Updated value: `, updatedValue);
            } else {
              property.propertyvalues.forEach(async (value: any) => {
                await prisma.propertyValues.update({
                  where: {
                    id: value.id,
                    propertyId: property.id,
                  },
                  data: {
                    name:
                      value.name.charAt(0).toUpperCase() +
                      value.name.slice(1).toLowerCase(),
                    description:
                      value.description.charAt(0).toUpperCase() +
                      value.description.slice(1).toLowerCase(),
                    index: value.index,
                  },
                });
              });
            }

            //DELETE PROPERTY VALUES THAT ARE NOT IN THE SUBMITTED DATA
            databaseProperty.propertyValues.forEach(
              async (databaseValue: any) => {
                let found = false;
                property.propertyValues.forEach(async (value: any) => {
                  if (databaseValue.id === value.id) {
                    found = true;
                  }
                });
                if (!found) {
                  await prisma.propertyValues.delete({
                    where: {
                      id: databaseValue.id,
                    },
                  });
                }
              }
            );


            
          }
        });
      }
    });

    //IF SUBMITTED PROPERTIES ARE LESS THAN DATABASE PROPERTIES DELETE THE EXCESS
    // if (properties.length < databaseObject.property.length) {
    //   databaseObject.property.forEach(async (databaseProperty: any) => {
    //     let found = false;
    //     properties.forEach(async (property: any) => {
    //       if (databaseProperty.id === property.id) {
    //         found = true;
    //       }
    //     });
    //     if (!found) {
    //       await prisma.property.delete({
    //         where: {
    //           id: databaseProperty.id,
    //         },
    //       });
    //     }
    //   });
    // }

    //IF SUBMITTED PROPERTIES ARE MORE THAN DATABASE PROPERTIES ADD THE EXCESS
    // if (properties.length > databaseObject.property.length) {
    //   properties.forEach(async (property: any) => {
    //     let found = false;
    //     if (databaseObject) {
    //       databaseObject.property.forEach(async (databaseProperty: any) => {
    //         if (databaseProperty.id === property.id) {
    //           found = true;
    //         }
    //       });
    //     }
    //     if (!found) {
    //       const newProperty = await prisma.property.create({
    //         data: {
    //           name:
    //             property.name.charAt(0).toUpperCase() +
    //             property.name.slice(1).toLowerCase(),
    //           description:
    //             property.description.charAt(0).toUpperCase() +
    //             property.description.slice(1).toLowerCase(),
    //           type: property.type.toUpperCase(),
    //           objectId: newObject.id,
    //           index: property.index,
    //         },
    //       });

    //       if (property.type === "TEXT") {
    //         const lastValueIndex = property.propertyValues.length - 1;
    //         const value = property.propertyValues[lastValueIndex];
    //         await prisma.propertyValues.create({
    //           data: {
    //             id: v4(),
    //             propertyId: newProperty.id,
    //             name:
    //               value.name.charAt(0).toUpperCase() +
    //               value.name.slice(1).toLowerCase(),
    //             description:
    //               value.description.charAt(0).toUpperCase() +
    //               value.description.slice(1).toLowerCase(),
    //             index: value.index,
    //           },
    //         });
    //       } else {
    //         property.values.forEach(async (value: any) => {
    //           await prisma.propertyValues.create({
    //             data: {
    //               id: value.id,
    //               propertyId: newProperty.id,
    //               name:
    //                 value.name.charAt(0).toUpperCase() +
    //                 value.name.slice(1).toLowerCase(),
    //               description:
    //                 value.description.charAt(0).toUpperCase() +
    //                 value.description.slice(1).toLowerCase(),
    //               index: value.index,
    //             },
    //           });
    //         });
    //       }
    //     }
    //   });
    // }

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
        name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
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
        name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
        description:
          description.charAt(0).toUpperCase() +
          description.slice(1).toLowerCase(),
        type: objectType,
        categoryId: categoryID?.id,
      },
    });

    let duplicatePropertiesCounter = 0;
    const duplicates = [] as string[];
    properties.forEach(async (property: any) => {
      const ID = await prisma.property.findMany({
        where: {
          name:
            property.name.charAt(0).toUpperCase() +
            property.name.slice(1).toLowerCase(),
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
          name:
            property.name.charAt(0).toUpperCase() +
            property.name.slice(1).toLowerCase(),
          description:
            property.description.charAt(0).toUpperCase() +
            property.description.slice(1).toLowerCase(),
          type: property.type.toUpperCase(),
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
            name:
              value.name.charAt(0).toUpperCase() +
              value.name.slice(1).toLowerCase(),
            description:
              value.description.charAt(0).toUpperCase() +
              value.description.slice(1).toLowerCase(),
            index: value.index,
          },
        });
      } else {
        property.values.forEach(async (value: any) => {
          await prisma.propertyValues.create({
            data: {
              id: value.id,
              propertyId: newProperty.id,
              name:
                value.name.charAt(0).toUpperCase() +
                value.name.slice(1).toLowerCase(),
              description:
                value.description.charAt(0).toUpperCase() +
                value.description.slice(1).toLowerCase(),
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
