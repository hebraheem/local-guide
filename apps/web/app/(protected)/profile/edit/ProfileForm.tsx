"use client";
import { useActionState, useState } from "react";
import Input from "@/forms/Input";
import Textarea from "@/forms/Textarea";
import TagInput from "@/forms/TagInput";
import LanguageInput, { Language } from "@/forms/LanguageInput";
import { submitProfileUpdate } from "@/actions/user.action";
import { useEffect } from "react";
import useTranslation from "@/hooks/useTranslation";
import { ResponseWrapper } from "@/types/api";
import { User } from "@/types/user";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { PAGE_LINKS } from "@/constant/page.links";

const initialState: ResponseWrapper<Partial<User>> = {
  success: false,
  error: null,
  fields: {
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    bio: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    roles: [],
    skills: [],
    languages: [],
  },
};

const availableRoles = [
  { value: "HELPER", label: "Helper" },
  { value: "REQUESTER", label: "Requester" },
];

export default function ProfileForm({ user }: { user?: User }) {
  const { t } = useTranslation();
  const router = useRouter();
  const [selectedRoles, setSelectedRoles] = useState<string[]>(
    user?.roles || [],
  );
  const [skills, setSkills] = useState<string[]>(user?.profile?.skills || []);
  const [languages, setLanguages] = useState<Language[]>(
    user?.profile?.languages || [],
  );

  const [state, formAction, isPending] = useActionState(
    submitProfileUpdate,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      toast.success("Profile updated successfully");
      router.push(PAGE_LINKS.PROFILE)

    }
    if(state.error){
      toast.error(state.error.message);
    }
  },
    // eslint-disable-next-line
    [state.success, state.error]);

  const profile = user?.profile;
  const toggleRole = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role],
    );
  };

  return (
    <form action={formAction} className="space-y-2">
      <div className="grid md:grid-cols-2 gap-x-4">
        <Input
          label="USERNAME"
          name="username"
          type="text"
          defaultValue={user?.username}
          required
        />
        <Input
          label="EMAIL"
          name="email"
          type="email"
          defaultValue={user?.email}
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-x-4">
        <Input
          label="FIRST_NAME"
          name="firstName"
          type="text"
          defaultValue={profile?.firstName}
          required
        />
        <Input
          label="LAST_NAME"
          name="lastName"
          type="text"
          defaultValue={profile?.lastName}
          required
        />
      </div>

      <Input
        label="PHONE"
        name="phone"
        type="tel"
        defaultValue={profile?.phone}
        placeholder="+1234567890"
      />

      <Textarea
        label="BIO"
        name="bio"
        rows={4}
        defaultValue={profile?.bio}
        placeholder="BIO_PLACEHOLDER"
      />

      <div className="pt-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          {t("Address")}
        </h3>
      </div>

      <Input
        label="STREET"
        name="street"
        type="text"
        defaultValue={profile?.address?.street}
        placeholder="123 Main St"
      />

      <div className="grid md:grid-cols-2 gap-x-4">
        <Input
          label="CITY"
          name="city"
          type="text"
          defaultValue={profile?.address?.city}
          required
        />
        <Input
          label="STATE"
          name="state"
          type="text"
          defaultValue={profile?.address?.state}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-x-4">
        <Input
          label="ZIP_CODE"
          name="zipCode"
          type="text"
          defaultValue={profile?.address?.zipCode}
        />
        <Input
          label="COUNTRY"
          name="country"
          type="text"
          defaultValue={profile?.address?.country}
          required
        />
      </div>

      <div className="pt-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          {t("ROLES_SKILLS")}
        </h3>
      </div>

      {/* Roles Section */}
      <div className="flex flex-col gap-2 w-full py-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("USER_ROLES")} *
        </label>
        <div className="space-y-2">
          {availableRoles.map((role) => (
            <div key={role.value} className="flex items-center gap-3">
              <input
                type="checkbox"
                id={`role-${role.value}`}
                checked={selectedRoles.includes(role.value)}
                onChange={() => toggleRole(role.value)}
                className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500 rounded"
              />
              <label
                htmlFor={`role-${role.value}`}
                className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                {t(role.label)}
              </label>
            </div>
          ))}
        </div>
        {/* Hidden inputs for form submission */}
        {selectedRoles.map((role, index) => (
          <input key={index} type="hidden" name="roles[]" value={role} />
        ))}
      </div>

      <TagInput
        label="SKILLS"
        name="skills"
        placeholder="ADD_SKILL_PLACEHOLDER"
        values={skills}
        onValuesChange={setSkills}
      />

      <LanguageInput
        label="LANGUAGES"
        name="languages"
        placeholder="ADD_LANGUAGE_PLACEHOLDER"
        values={languages}
        onValuesChange={setLanguages}
      />
      <div className="pt-6">
        <button
          type="submit"
          disabled={isPending}
          className="w-full px-6 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:scale-100"
        >
          {isPending ? t("SAVING") : t("SAVE_CHANGES")}
        </button>
      </div>
    </form>
  );
}
