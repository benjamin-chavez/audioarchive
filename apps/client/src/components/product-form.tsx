// apps/client/src/app/(app-users)/settings/components/product-form.tsx
'use client';

import { generateRandomString } from '@/lib/utils';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Product } from '@shared/src';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  id?: number;
  name: string;
  genre: string;
  software: string;
  bpm: string;
  price: string;
  imgFile?: File;
  digitalFile?: File;
  key: string;
  label: string;
  description: string;
};

export default function ProductForm({
  product,
  revalidateListings,
}: {
  product?: Product;
  revalidateListings: () => Promise<void>;
}) {
  const { user, isLoading: isLoadingUser } = useUser();
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      id: product?.id || undefined,
      // name: product?.name || '',
      name: product?.name || generateRandomString(20),
      // genre: product?.genre || '',
      genre: product?.genre || 'House',
      // software: product?.software || '',
      software: product?.software || 'Ableton',
      // bpm: product?.bpm !== undefined ? product.bpm.toString() : '',
      bpm: product?.bpm !== undefined ? product.bpm.toString() : '126',
      // price: product?.price !== undefined ? product.price.toString() : '',
      price: product?.price !== undefined ? product.price.toString() : '29.99',
      // i      imgS3Url
      // imgS3Url: product?.imgS3Url,
      key: product?.key || '',
      label: product?.label || '',
      description: product?.description || '',
    },
  });
  const isEditMode = Boolean(product);

  const onSubmit = async (data: FormData) => {
    try {
      if (!user || user.id === undefined) {
        throw new Error('User or User ID not found');
      }

      const formData = new FormData();

      // Append form data fields
      Object.keys(data).forEach((key) => {
        // Exclude imgFile for now
        if (key !== 'imgFile' && key !== 'digitalFile') {
          // @ts-ignore
          formData.append(key, data[key]);
        }
      });

      if (data.imgFile) {
        formData.append('imgFile', data.imgFile[0]);
      }

      if (data.digitalFile) {
        formData.append('digitalFile', data.digitalFile[0]);
      }

      formData.append('appUserId', user.id as string);

      formData.append(
        'created_at',
        isEditMode
          ? (product?.created_at || new Date()).toISOString()
          : new Date().toISOString(),
      );
      formData.append('updated_at', new Date().toISOString());

      let response;
      if (isEditMode) {
        response = await fetch(`/api/products/${data.id}`, {
          method: 'PUT',
          headers: {
            // 'Content-Type': 'application/json',
            // 'Content-Type': 'multipart/form-data',
          },
          // body: JSON.stringify(productData),
          body: formData,
        });
      } else {
        response = await fetch(`/api/products`, {
          method: 'POST',
          headers: {
            // 'Content-Type': 'application/json',
            // 'Content-Type': 'multipart/form-data',
          },
          // body: JSON.stringify(productData),
          body: formData,
        });
      }

      if (!response.ok) {
        const responseBody = await response.json();
        const errorMessage = `${
          responseBody.message || 'An error occurred'
        } (Status Code: ${response.status})`;
        throw new Error(errorMessage);
      }

      revalidateListings();
    } catch (error) {
      window.alert('Error saving product');
    }
  };

  const handleDelete = async () => {
    try {
      const productId = product?.id;

      if (
        productId &&
        // TODO: Convert confirmation alert to a modal
        window.confirm('Are you sure you want to delete this product?')
      ) {
        const response = await fetch(`/api/products/${productId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const responseBody = await response.json();
          const errorMessage = `${
            responseBody.message || 'An error occurred'
          } (Status Code: ${response.status})`;
          throw new Error(errorMessage);
        }

        revalidateListings();
      }
    } catch (error) {
      window.alert(`Error deleting product`);
    }
  };

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          // setNewImagePreview(reader.result);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  if (isLoadingUser) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex items-center justify-center flex-col ">
      <div className="w-1/2">
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium leading-6 text-white">
              Name
            </label>
            <input
              {...register('name', { required: true })}
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 mt-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-white">
              Genre
            </label>
            <input
              {...register('genre', { required: true })}
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 mt-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-white">
              Software
            </label>

            <input
              {...register('software', { required: true })}
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 mt-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-white">
              BPM
            </label>
            <input
              {...register('bpm', { required: true })}
              type="number"
              // type="text"
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 mt-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-white">
              Price
            </label>
            <input
              {...register('price', { required: true })}
              type="number"
              step="0.01"
              // type="text"
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 mt-2"
            />
          </div>

          <div className="flex gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              // @ts-ignore
              src={newImagePreview || product?.imgS3Url || null}
              // src={product?.imgS3Url}
              alt={product?.imgS3Url}
              className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
            />
            <div className=" w-full">
              <label
                htmlFor="imgFile"
                className="block text-sm font-medium leading-6 text-white"
              >
                Artwork
              </label>
              <input
                // imgFile
                {...register('imgFile')}
                type="file"
                name="imgFile"
                onChange={handleImageChange}
                // @ts-ignore
                // onChange={(e) => setNewImagePreview(e.target.files[0])}
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 mt-2"
              />
            </div>
          </div>

          <div className="flex gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}

            <div className=" w-full">
              <label
                htmlFor="digitalFile"
                className="block text-sm font-medium leading-6 text-white"
              >
                Download File
              </label>
              <input
                {...register('digitalFile')}
                type="file"
                name="digitalFile"
                // onChange={(e) => handleFileChange(e, 'digital')}
                onChange={(e) => handleFileChange}
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 mt-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-white">
              Key
            </label>
            <input
              {...register('key')}
              type="text"
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 mt-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-white">
              Label
            </label>
            <input
              {...register('label')}
              type="text"
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 mt-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-white">
              Description
            </label>
            <textarea
              {...register('description')}
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 mt-2"
            />
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:bg-red-500 disabled:opacity-75"
            // disabled={isLoading}
          >
            {isEditMode ? 'Update' : 'Create'}
          </button>
        </form>

        {isEditMode ? (
          <button
            className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 disabled:bg-red-500 disabled:opacity-75 mt-6"
            // disabled={isLoading}
            onClick={() => handleDelete()}
          >
            Delete
          </button>
        ) : null}
      </div>
    </div>
  );
}
