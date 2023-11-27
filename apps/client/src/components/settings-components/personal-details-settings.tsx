// apps/client/src/app/(app-users)/settings/components/personal-details-settings.tsx

import { AppUser } from '@shared/src';

export default function PersonalDetailsSettings({
  formData,
  handleInputChange,
}: {
  formData: Partial<AppUser>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="border-b border-white/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-white">
        Personal Information
      </h2>
      {/* <p className="mt-1 text-sm leading-6 text-gray-400">
        Use a permanent address where you can receive mail.
      </p> */}

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium leading-6 text-white"
          >
            First name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="firstName"
              id="first-name"
              autoComplete="given-name"
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="last-name"
            className="block text-sm font-medium leading-6 text-white"
          >
            Last name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="lastName"
              id="last-name"
              autoComplete="family-name"
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="sm:col-span-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-white"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
