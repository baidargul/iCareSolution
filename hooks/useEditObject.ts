import { create } from "zustand";
import { PropertyTypes } from "@prisma/client";
import { v4 } from "uuid";

type Object = {
  categories: {
    id: string;
    name: string;
  };
  categoryId: string;
  dateCreated: string;
  description: string;
  id: string;
  name: string;
  property: property[];
  type: string;
};

type property = {
  description: string;
  id: string;
  index: number;
  name: string;
  objectId: string;
  propertyValues: propertyValues[];
  type: PropertyTypes;
};

type propertyValues = {
  description: string;
  id: string;
  index: number;
  name: string;
  propertyId: string;
  isDefault: boolean;
};

export const useEditObject = create((set) => ({
  object: {} as Object,

  setObject(object: Object) {
    set(() => ({ object: object }));
  },

  createProperty(
    name: string,
    description: string,
    type: PropertyTypes,
    index: number
  ) {
    set((state: any) => ({
      properties: [
        ...state.properties,
        {
          id: v4(),
          name: name,
          description: description,
          type: type,
          index: index,
          values: [],
        },
      ],
    }));
  },

  setObjectValues(
    name?: string,
    description?: string,
    type?: string,
    category?: string
  ) {
    set((prev: any) => ({
      object: {
        ...prev.object,
        name: name || prev.object.name,
        description: description || prev.object.description,
        type: type || prev.object.type,
        categories: {
          id: prev.object.categories.id,
          name: category || prev.object.categories.name,
        },
      },
    }));
  },

  clearProperties() {
    set(() => ({ properties: [] }));
  },

  clearObject() {
    set(() => ({ object: {} }));
  },

  removeProperty(id: string) {
    const object: Object = this.object as Object;
    object.property = object.property.filter((p: any) => p.id !== id);

    object.property.map((p: any, index: number) => {
      //set new index for all properties
      p.index = index + 1;
    });

    set(() => ({ object: object }));
  },

  addValueToProperty(propertyId: string, name: string, description: string) {
    if (!name) return;
    const object: Object = this.object as Object;
    const property = object.property.find((p: any) => p.id === propertyId);
    if (!property) return;
    property.propertyValues.push({
      id: v4(),
      name: name,
      description: description,
      index: property.propertyValues.length,
      propertyId: propertyId,
      isDefault: false,
    });
  },

  removeValueFromProperty(propertyId: string, id: string) {
    const object: Object = this.object as Object;
    const property = object.property.find((p: any) => p.id === propertyId);
    if (!property) return;
    property.propertyValues = property.propertyValues.filter(
      (v: any) => v.id !== id
    );

    property.propertyValues.map((v: any, index: number) => {
      //set new index for all properties
      v.index = index + 1;
    });

    set(() => ({ object: object }));
  },

  changePropertyName(id: string, name: string) {
    const object: Object = this.object as Object;
    const property = object.property.find((p: any) => p.id === id);
    if (!property) return;
    property.name = name;
    set(() => ({ object: object }));
  },

  changePropertyDescription(id: string, description: string) {
    const object: Object = this.object as Object;
    const property = object.property.find((p: any) => p.id === id);
    if (!property) return;
    property.description = description;
    set(() => ({ object: object }));
  },

  updatePropertyType(id: string, propertyType: string) {
    const object: Object = this.object as Object;
    const property = object.property.find((p: any) => p.id === id);
    if (!property) return;
    property.type = propertyType;
    set(() => ({ object: object }));
  },

  updatePropertyValue(propertyId: string, id: string, name: string) {
    const object: Object = this.object as Object;
    const property = object.property.find((p: any) => p.id === propertyId);
    if (!property) return;
    const value = property.propertyValues.find((v: any) => v.id === id);
    if (!value) return;
    value.name = name;
    set(() => ({ object: object }));
  },

  movePropertyIndexUp(id: string, index: number) {
    if (index === 1) return;
    console.log(`Target Index: `, index);
    const object: Object = this.object as Object;
    let prevProperty;
    object.property.map((p: any) => {
      if (p.index === index - 1 && p !== null) {
        prevProperty = p;
      }
    });
    const property = object.property.find((p: any) => p.id === id);
    if (!property) return;
    property.index = index - 1;
    if (prevProperty) {
      prevProperty.index = index;
    }
    console.log(`Prev property `, prevProperty);
    console.log(`This property `, property);
    set(() => ({ object: object }));
  },

  movePropertyIndexDown(id: string, index: number) {
    if (index === this.object.property.length) return;
    const object: Object = this.object as Object;
    let nextProperty;
    object.property.map((p: any) => {
      if (p.index === index + 1 && p !== null) {
        nextProperty = p;
      }
    });
    const property = object.property.find((p: any) => p.id === id);
    if (!property) return;
    property.index = index + 1;
    if (nextProperty) {
      nextProperty.index = index;
    }
    set(() => ({ object: object }));
  },

  movePropertyValueIndexUp(propertyId: string, id: string, index: number) {
    const object: Object = this.object as Object;
    const property = object.property.find((p: any) => p.id === propertyId);
    if (!property) return;
    const value = property.propertyValues.find((v: any) => v.id === id);
    const prevValue = property.propertyValues.find(
      (v: any) => v.index === index - 1
    );
    if (!value) return;
    value.index = index - 1;

    if (prevValue) {
      prevValue.index = index;
    }

    //sort values array
    property.propertyValues.sort(
      (a: propertyValues, b: propertyValues) => a.index - b.index
    );
    set(() => ({ object: object }));
  },

  movePropertyValueIndexDown(propertyId: string, id: string, index: number) {
    const object: Object = this.object as Object;
    const property = object.property.find((p: any) => p.id === propertyId);
    if (!property) return;
    const value = property.propertyValues.find((v: any) => v.id === id);
    const nextValue = property.propertyValues.find(
      (v: any) => v.index === index + 1
    );
    if (!value) return;
    value.index = index + 1;

    if (nextValue) {
      nextValue.index = index;
    }

    //sort values array
    property.propertyValues.sort(
      (a: propertyValues, b: propertyValues) => a.index - b.index
    );

    set(() => ({ object: object }));
  },
}));
