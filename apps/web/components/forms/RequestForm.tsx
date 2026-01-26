"use client";
import { useActionState, useState } from "react";
import Input from "@/forms/Input";
import Textarea from "@/forms/Textarea";
import Select from "@/forms/Select";
import LocationAutocomplete, { PlaceDetails } from "@/forms/LocationAutocomplete";
import { submitRequest } from "@/actions/auth.action";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useTranslation from "@/hooks/useTranslation";
import { initialRequestFormState, UpdateRequestType } from "@/types/request.types";



interface RequestFormProps {
  request?: Partial<UpdateRequestType>;
  isEdit?: boolean;
}

export default function RequestForm({ request, isEdit = false }: RequestFormProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const [selectedMode, setSelectedMode] = useState(request?.mode || "FREE");
  const [locationDetails, setLocationDetails] = useState<PlaceDetails | null>(
    request?.location ? {
      fullAddress: `${request.location.street || ''}, ${request.location.city}, ${request.location.state || ''} ${request.location.zipCode || ''}, ${request.location.country}`.replace(/\s+/g, ' ').trim(),
      street: request.location.street || "",
      city: request.location.city || "",
      state: request.location.state || "",
      zipCode: request.location.zipCode || "",
      country: request.location.country || "",
    } : null
  );
  
  const [state, formAction, isPending] = useActionState(
    submitRequest,
    initialRequestFormState
  );

  useEffect(() => {
    if (state.success) {
      console.log("Request submitted successfully", state);
      router.push("/requests");
    }
  }, [state, router]);

  const categories = [
    { value: "a2f4c1e2-5b3c-4d89-ae33-1b1ccce3f441", label: "Translation" },
    { value: "b3g5d2f3-6c4d-5e90-bf44-2c2dddf4g552", label: "City Tours" },
    { value: "c4h6e3g4-7d5e-6f01-cg55-3d3eehg5h663", label: "Study Help" },
    { value: "d5i7f4h5-8e6f-7g12-dh66-4e4ffih6i774", label: "Administrative" },
    { value: "e6j8g5i6-9f7g-8h23-ei77-5f5ggjh7j885", label: "Tech Support" },
  ];

  const modeOptions = [
    { value: "PAID", label: "Paid" },
    { value: "FREE", label: "Free" },
  ];

  const currencyOptions = [
    { value: "USD", label: "USD ($)" },
    { value: "EUR", label: "EUR (€)" },
    { value: "GBP", label: "GBP (£)" },
    { value: "NGN", label: "NGN (₦)" },
  ];

  const handlePlaceSelected = (place: PlaceDetails) => {
    setLocationDetails(place);
  };

  return (
    <form action={formAction} className="space-y-2">
      <Input
        label="REQUEST_TITLE"
        name="title"
        type="text"
        defaultValue={request?.title}
        required
        placeholder="e.g., Fix Air Conditioner"
      />

      <Textarea
        label="DESCRIPTION"
        name="description"
        rows={5}
        defaultValue={request?.description}
        required
        placeholder="Provide detailed description of what you need..."
      />

      <Select
        label="CATEGORY"
        name="category"
        options={categories}
        defaultValue={request?.category}
        required
      />

      <div className="flex flex-col gap-2 w-full py-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("REQUEST_MODE")}
        </label>
        <div className="space-y-2">
          {modeOptions.map((option) => (
            <div key={option.value} className="flex items-center gap-3">
              <input
                type="radio"
                id={`mode-${option.value}`}
                name="mode"
                value={option.value}
                defaultChecked={selectedMode === option.value}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                required
              />
              <label
                htmlFor={`mode-${option.value}`}
                className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                {t(option.label)}
              </label>
            </div>
          ))}
        </div>
      </div>

      {selectedMode === "PAID" && (
        <>
          <div className="pt-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              {t("PAYMENT_DETAILS")}
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-x-4">
            <Input
              label="AMOUNT"
              name="amount"
              type="number"
              defaultValue={request?.payment?.amount}
              placeholder="0.00"
            />
            <Select
              label="CURRENCY"
              name="currency"
              options={currencyOptions}
              defaultValue={request?.payment?.currency || "USD"}
            />
          </div>
        </>
      )}

      <Input
        label="DEADLINE"
        name="deadline"
        type="datetime-local"
        defaultValue={request?.deadline?.split('T')[0] + 'T' + request?.deadline?.split('T')[1]?.substring(0, 5)}
        required
      />

      <div className="pt-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          {t("LOCATION")}
        </h3>
      </div>

      <LocationAutocomplete 
        onPlaceSelected={handlePlaceSelected}
        defaultValue={locationDetails?.fullAddress}
      />

      {locationDetails && (
        <div className="space-y-2">
          <div className="flex flex-col gap-2 w-full py-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("STREET")}
            </label>
            <input
              name="street"
              type="text"
              value={locationDetails.street}
              onChange={(e) => setLocationDetails({...locationDetails, street: e.target.value})}
              className="dark:text-primary-800 w-full focus:outline-1 focus:border-primary-200 rounded-xl bg-primary-100 outline-none px-4 py-4 text-sm"
              placeholder="e.g., Ikeja GRA"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-x-4">
            <div className="flex flex-col gap-2 w-full py-4">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("CITY")} *
              </label>
              <input
                name="city"
                type="text"
                value={locationDetails.city}
                onChange={(e) => setLocationDetails({...locationDetails, city: e.target.value})}
                className="dark:text-primary-800 w-full focus:outline-1 focus:border-primary-200 rounded-xl bg-primary-100 outline-none px-4 py-4 text-sm"
                placeholder="e.g., Lagos"
                required
              />
            </div>
            <div className="flex flex-col gap-2 w-full py-4">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("STATE")}
              </label>
              <input
                name="state"
                type="text"
                value={locationDetails.state}
                onChange={(e) => setLocationDetails({...locationDetails, state: e.target.value})}
                className="dark:text-primary-800 w-full focus:outline-1 focus:border-primary-200 rounded-xl bg-primary-100 outline-none px-4 py-4 text-sm"
                placeholder="e.g., Lagos"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-x-4">
            <div className="flex flex-col gap-2 w-full py-4">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("ZIP_CODE")}
              </label>
              <input
                name="zipCode"
                type="text"
                value={locationDetails.zipCode}
                onChange={(e) => setLocationDetails({...locationDetails, zipCode: e.target.value})}
                className="dark:text-primary-800 w-full focus:outline-1 focus:border-primary-200 rounded-xl bg-primary-100 outline-none px-4 py-4 text-sm"
                placeholder="e.g., 100271"
              />
            </div>
            <div className="flex flex-col gap-2 w-full py-4">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("COUNTRY")} *
              </label>
              <input
                name="country"
                type="text"
                value={locationDetails.country}
                onChange={(e) => setLocationDetails({...locationDetails, country: e.target.value})}
                className="dark:text-primary-800 w-full focus:outline-1 focus:border-primary-200 rounded-xl bg-primary-100 outline-none px-4 py-4 text-sm"
                placeholder="e.g., Nigeria"
                required
              />
            </div>
          </div>

          {/* Hidden inputs to ensure values are submitted */}
          <input type="hidden" name="latitude" value={locationDetails.latitude || ""} />
          <input type="hidden" name="longitude" value={locationDetails.longitude || ""} />
        </div>
      )}

      <div className="pt-6 flex gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 px-6 py-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold rounded-xl transition-all"
        >
          {t("CANCEL")}
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 px-6 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:scale-100"
        >
          {isPending ? t("SUBMITTING") : isEdit ? t("UPDATE_REQUEST") : t("POST_REQUEST")}
        </button>
      </div>
    </form>
  );
}
