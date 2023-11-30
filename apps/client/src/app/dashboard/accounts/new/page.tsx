// apps/client/src/app/dashboard/accounts/new/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

type FormData = {
  location: string;
};

// @ts-ignore
const onSubmit = async (data: FormData, router: AppRouterInstance) => {
  try {
    const jsonData = JSON.stringify(data);
    const response = await fetch('/api/app-users/me/accounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify(data),
      // @ts-ignore
      body: jsonData,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const { data: responseData } = await response.json();
    const accountSetupLink = responseData.accountLink.url;

    router.push(accountSetupLink);
  } catch (error) {
    console.error(
      'There was a problem with the fetch operation:',
      // @ts-ignore
      error.message,
    );
    console.log(error);
    window.alert('Error creating Stripe account: ');
  }
};

export default function NewAccountsPage() {
  const router = useRouter();

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      location: 'US',
    },
  });

  const handleSubmitWithRouter = (data: FormData) => {
    onSubmit(data, router);
  };

  return (
    <div>
      <h1>NewAccountsPage</h1>

      <div className="flex items-center justify-center flex-col ">
        <div className="w-1/2">
          <form
            // action=""
            onSubmit={handleSubmit(handleSubmitWithRouter)}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Location
              </label>
              <select
                id="location"
                // name="location"
                {...register('location', { required: true })}
                // ref={register({ required: true })}>
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="MX">Mexico</option>
              </select>
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:bg-red-500 disabled:opacity-75"
              // disabled={isLoading}
            >
              Create a Stripe Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
