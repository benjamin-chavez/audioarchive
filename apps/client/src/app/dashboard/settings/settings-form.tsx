/* eslint-disable @next/next/no-img-element */
// apps/client/src/app/dashboard/settings/settings-form.tsx
'use client';

import { AppUser } from '@shared/src';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  // avatar?: string;
  imgFile?: File;
};

export default function SettingsForm({
  appUser,
  revalidateAppUser,
}: {
  appUser: AppUser;
  revalidateAppUser: () => Promise<void>;
}) {
  // const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);

  const { register, handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      firstName: appUser.firstName,
      lastName: appUser.lastName,
      email: appUser.email,
      username: appUser.username,
      // avatar: appUser.avatar,
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key !== 'imgFile' && key !== 'digitalFile') {
          // @ts-ignore
          formData.append(key, data[key]);
        }
      });

      if (data.imgFile) {
        formData.append('imgFile', data.imgFile[0]);
      }
      formData.append('updated_at', new Date().toISOString());

      const response = await fetch('/api/app-users/me', {
        method: 'PUT',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        // body: JSON.stringify(data),
        body: formData,
      });

      if (!response.ok) {
        const responseBody = await response.json();
        const errorMessage = `${
          responseBody.message || 'An error occurred'
        } (Status Code: ${response.status})`;
        throw new Error(errorMessage);
      }
    } catch (error) {
      window.alert('Error saving User');
    }

    setIsLoading(false);
    // TODO: Add Toast
  };

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files ? e.target.files[0] : null;

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       if (typeof reader.result === 'string') {
  //         setSelectedImage(reader.result);
  //       }
  //     };

  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setNewImagePreview(reader.result);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async () => {
    let response;
    try {
      setIsLoading(true);

      response = await fetch(`/api/app-users/me`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const responseBody = await response.json();
        const errorMessage = `${
          responseBody.message || 'An error occurred'
        } (Status Code: ${response.status})`;
        throw new Error(errorMessage);
      }
    } catch (error) {
      window.alert(`Error deleting user`);
    }

    await revalidateAppUser();
    setIsLoading(false);
  };

  // if (appUser) {
  if (!isLoading && appUser) {
    return (
      <>
        <div className="divide-y divide-white/5">
          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-white">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                Use a permanent address where you can receive mail.
              </p>
            </div>

            <form
              encType="multipart/form-data"
              onSubmit={handleSubmit(onSubmit)}
              className="md:col-span-2"
            >
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                {/*  */}

                {/*  */}
                <div className="col-span-full flex items-center gap-x-8">
                  <img
                    src={newImagePreview || appUser.avatarS3Url}
                    alt=""
                    className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                  />
                  <div>
                    <button
                      className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('avatar')?.click();
                      }}
                    >
                      Change avatar
                    </button>

                    <input
                      {...register('imgFile')}
                      type="file"
                      id="avatar"
                      name="imgFile"
                      style={{ display: 'none' }}
                      className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                      onChange={handleImageChange}
                    />
                    <p className="mt-2 text-xs leading-5 text-gray-400">
                      JPG, GIF or PNG. 1MB max.
                    </p>
                  </div>
                </div>

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
                      id="first-name"
                      autoComplete="given-name"
                      {...register('firstName', { required: true })}
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
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
                      id="last-name"
                      autoComplete="family-name"
                      {...register('lastName', { required: true })}
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      {...register('email', { required: true })}
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                      <span className="flex select-none items-center pl-3 text-gray-400 sm:text-sm">
                        audioarchive.com/
                      </span>
                      <input
                        type="text"
                        id="username"
                        autoComplete="username"
                        {...register('username', { required: true })}
                        className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="janesmith"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500  disabled:opacity-75 disabled:hover:bg-indigo-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>

          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-white">
                Delete account
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                No longer want to use our service? You can delete your account
                here. This action is not reversible. All information related to
                this account will be deleted permanently.
              </p>
            </div>

            <form className="flex items-start md:col-span-2">
              <button
                type="submit"
                onClick={() => handleDelete()}
                className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
              >
                Yes, delete my account
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

function PasswordSettings() {
  return (
    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
      <div>
        <h2 className="text-base font-semibold leading-7 text-white">
          Change password
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-400">
          Update your password associated with your account.
        </p>
      </div>

      <form className="md:col-span-2">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="current-password"
              className="block text-sm font-medium leading-6 text-white"
            >
              Current password
            </label>
            <div className="mt-2">
              <input
                id="current-password"
                name="current_password"
                type="password"
                autoComplete="current-password"
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="new-password"
              className="block text-sm font-medium leading-6 text-white"
            >
              New password
            </label>
            <div className="mt-2">
              <input
                id="new-password"
                name="new_password"
                type="password"
                autoComplete="new-password"
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium leading-6 text-white"
            >
              Confirm password
            </label>
            <div className="mt-2">
              <input
                id="confirm-password"
                name="confirm_password"
                type="password"
                autoComplete="new-password"
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex">
          <button
            type="submit"
            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
