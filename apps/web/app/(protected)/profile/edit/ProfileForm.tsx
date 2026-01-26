"use client";
import { useActionState, useState } from "react";
import Input from "@/forms/Input";
import Textarea from "@/forms/Textarea";
import { submitProfileUpdate } from "@/actions/auth.action";
import { useEffect } from "react";
import useTranslation from "@/hooks/useTranslation";

const initialState = {
  success: false,
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
};

export default function ProfileForm({ profile }: { profile?: any }) {
  const { t } = useTranslation();
  const [selectedRoles, setSelectedRoles] = useState<string[]>(profile?.roles || []);
  const [skills, setSkills] = useState<string[]>(profile?.skills || []);
  const [newSkill, setNewSkill] = useState("");
  
  const [state, formAction, isPending] = useActionState(
    submitProfileUpdate,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      console.log("Profile updated successfully", state);
    }
  }, [state]);

  const availableRoles = [
    { value: "HELPER", label: "Helper" },
    { value: "REQUESTER", label: "Requester" },
  ];

  const toggleRole = (role: string) => {
    setSelectedRoles(prev => 
      prev.includes(role) 
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <form action={formAction} className="space-y-2">
      <div className="grid md:grid-cols-2 gap-x-4">
        <Input
          label="USERNAME"
          name="username"
          type="text"
          defaultValue={profile?.username}
          required
        />
        <Input
          label="EMAIL"
          name="email"
          type="email"
          defaultValue={profile?.email}
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

      {/* Skills Section */}
      <div className="flex flex-col gap-2 w-full py-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("SKILLS")}
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            className="dark:text-primary-800 flex-1 focus:outline-1 focus:border-primary-200 rounded-xl bg-primary-100 outline-none px-4 py-3 text-sm"
            placeholder={t("ADD_SKILL_PLACEHOLDER")}
          />
          <button
            type="button"
            onClick={addSkill}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all"
          >
            {t("ADD")}
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-2 bg-primary-100 dark:bg-primary-800 rounded-lg"
            >
              <span className="text-sm text-gray-700 dark:text-gray-300">{skill}</span>
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="text-red-600 hover:text-red-800 font-bold text-lg leading-none"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        {/* Hidden inputs for form submission */}
        {skills.map((skill, index) => (
          <input key={index} type="hidden" name="skills[]" value={skill} />
        ))}
      </div>

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
