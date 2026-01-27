import { ResponseWrapper } from "@/types/api";

export type RequestInitialStateType = {
  success: boolean;
  title: string;
  description: string;
  mode: string;
  category: string;
  deadline: string;
  amount: string;
  currency: string;
  city: string;
  street: string;
  state: string;
  zipCode: string;
  country: string;
};

export const initialRequestFormState: ResponseWrapper<RequestType> = {
  success: false,
  error:null,
  fields: {
    title: "",
    description: "",
    mode: "",
    category: "",
    deadline: "",
    amount: "",
    currency: "",
    city: "",
    street: "",
    state: "",
    zipCode: "",
    country: "",
  },
};

export type CreateRequestTypes = {
  title: string;
  description: string;
  mode: string;
  category: string;
  deadline: string;
  payment: {
    amount: string;
    currency: string;
  };
  location: {
    city: string;
    street: string;
    state: string;
    zipCode: string;
    country: string;
    latitude?: string;
    longitude?: string;
  };
};

export type UpdateRequestType = CreateRequestTypes & { id?: string };

export type RequestFormTypes =  RequestInitialStateType &{
  success?: boolean;
  title?: string;
  description?: string;
  mode?: string;
  requirements?: string[];
  latitude?: string;
  longitude?: string;
};

export type RequestType = CreateRequestTypes & {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: "OPEN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  requesterId: string;
};