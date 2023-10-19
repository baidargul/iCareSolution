import { create } from "zustand";
import { prisma } from "../lib/prisma-db";
import { PropertyTypes } from "@prisma/client";
import { v4 } from "uuid";

type Object = {
  id: string;
  name: string;
  description: string;
  type: string;
  category: string;
};

type propertyValues = {
  id: string;
  propertyId: string;
  name: string;
  description: string;
  index: number;
  isDefault: boolean;
};

type property = {
  id: string;
  name: string;
  description: string;
  type: PropertyTypes;
  values: propertyValues[];
  index: number;
};

export const useCreateObject = create((set) => ({
  object: {} as Object,
  properties: [] as property[],

  setObjectValues(
    id?: string,
    name?: string,
    description?: string,
    type?: string,
    category?: string
  ) {
    set(() => ({
      object: {
        id: id || "",
        name: name || "",
        description: description || "",
        type: type || "",
        category: category || "",
      },
    }));
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

  clearProperties() {
    set(() => ({ properties: [] }));
  },

  clearObject() {
    set(() => ({ object: {} }));
  },

  removeProperty(id: string) {
    set((state: any) => ({
      properties: state.properties.filter(
        (property: property) => property.id !== id
      ),
    }));
  },

  addValueToProperty(propertyId: string, name: string, description: string) {
    if (!name) return;
    set((state: any) => ({
      properties: state.properties.map((property: property) => {
        if (property.id === propertyId) {
          return {
            ...property,
            values: [
              ...property.values,
              {
                id: v4(),
                propertyId: propertyId,
                name: name.toLocaleUpperCase(),
                description: description,
                index: property.values.length + 1,
                isDefault: false,
              },
            ],
          };
        }
        return property;
      }),
    }));
  },

  removeValueFromProperty(propertyId: string, id: string) {
    set((state: any) => ({
      properties: state.properties.map((property: property) => {
        if (property.id === propertyId) {
          return {
            ...property,
            values: property.values.filter(
              (value: propertyValues) => value.id !== id
            ),
          };
        }
        return property;
      }),
    }));
  },

  changePropertyName(id: string, name: string) {
    set((state: any) => ({
      properties: state.properties.map((property: property) =>
        property.id === id ? { ...property, name: name } : property
      ),
    }));
  },

  changePropertyDescription(id: string, description: string) {
    set((state: any) => ({
      properties: state.properties.map((property: property) =>
        property.id === id
          ? { ...property, description: description }
          : property
      ),
    }));
  },

  updatePropertyType(id: string, propertyType: string) {
    set((state: any) => ({
      properties: state.properties.map((property: property) =>
        property.id === id ? { ...property, type: propertyType } : property
      ),
    }));
  },

  updatePropertyValue(propertyId: string, id: string, name: string) {
    set((state: any) => ({
      properties: state.properties.map((property: property) => {
        if (property.id === propertyId) {
          return {
            ...property,
            values: property.values.map((value: propertyValues) =>
              value.id === id ? { ...value, name: name } : value
            ),
          };
        }
        return property;
      }),
    }));
  },

  movePropertyIndexUp(id: string, index: number) {
    set((state: any) => {
      const properties = state.properties;

      if (index === 1) return state; // No need to move if it's already at the top

      // Create a copy of the properties array with the updated indices
      const updatedProperties = properties.map((property: property) => {
        if (property.index === index - 1) {
          return { ...property, index: property.index + 1 };
        } else if (property.id === id && property.index === index) {
          return { ...property, index: property.index - 1 };
        }
        return property;
      });

      return { properties: updatedProperties };
    });
  },

  movePropertyIndexDown(id: string, index: number) {
    set((state: any) => {
      const properties = state.properties;
      if (index >= properties.length) return state; // No need to move if it's already at the bottom

      // Create a copy of the properties array with the updated indices
      const updatedProperties = properties.map((property: property) => {
        if (property.index === index + 1) {
          return { ...property, index: property.index - 1 };
        } else if (property.id === id && property.index === index) {
          return { ...property, index: property.index + 1 };
        }
        return property;
      });

      return { properties: updatedProperties };
    });
  },

}));
