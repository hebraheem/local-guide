import { RequestType } from "@/types/request.types";
import { safeAction } from "@/lib/response-handler";
import { ResponseType } from "@/types/api";

export const submitRequest =safeAction(async(
  prevState: ResponseType<RequestType>,
  formData: FormData
) =>{
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const mode = formData.get("mode") as string;
  const category = formData.get("category") as string;
  const deadline = formData.get("deadline") as string;
  const amount = formData.get("amount") as string;
  const currency = formData.get("currency") as string;
  const city = formData.get("city") as string;
  const street = formData.get("street") as string;
  const state = formData.get("state") as string;
  const zipCode = formData.get("zipCode") as string;
  const country = formData.get("country") as string;
  const latitude = formData.get("latitude") as string;
  const longitude = formData.get("longitude") as string;
  console.log("prevState", prevState);

  return {
    success: true,
    title,
    description,
    mode,
    category,
    deadline,
    amount,
    currency,
    city,
    street,
    state,
    zipCode,
    country,
    latitude,
    longitude,
  } as any;
})