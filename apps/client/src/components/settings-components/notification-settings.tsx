// apps/client/src/app/(app-users)/settings/components/notification-settings.tsx

import { AppUser } from '@shared/src';

export default function NotificationsSettings({
  user,
  appUser,
}: {
  user: any;
  appUser: AppUser;
}) {
  return (
    <div className="border-b border-white/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-white">
        Notifications
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-400">
        We&apos;ll always let you know about important changes, but you pick
        what else you want to hear about.
      </p>

      <div className="mt-10 space-y-10">
        <fieldset>
          <legend className="text-sm font-semibold leading-6 text-white">
            By Email
          </legend>
          <div className="mt-6 space-y-6">
            <div className="relative flex gap-x-3">
              <div className="flex h-6 items-center">
                <input
                  id="comments"
                  name="comments"
                  type="checkbox"
                  className="h-4 w-4 rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                />
              </div>
              <div className="text-sm leading-6">
                <label htmlFor="comments" className="font-medium text-white">
                  Comments
                </label>
                <p className="text-gray-400">
                  Get notified when someones posts a comment on a posting.
                </p>
              </div>
            </div>
            <div className="relative flex gap-x-3">
              <div className="flex h-6 items-center">
                <input
                  id="candidates"
                  name="candidates"
                  type="checkbox"
                  className="h-4 w-4 rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                />
              </div>
              <div className="text-sm leading-6">
                <label htmlFor="candidates" className="font-medium text-white">
                  Candidates
                </label>
                <p className="text-gray-400">
                  Get notified when a candidate applies for a job.
                </p>
              </div>
            </div>
            <div className="relative flex gap-x-3">
              <div className="flex h-6 items-center">
                <input
                  id="offers"
                  name="offers"
                  type="checkbox"
                  className="h-4 w-4 rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                />
              </div>
              <div className="text-sm leading-6">
                <label htmlFor="offers" className="font-medium text-white">
                  Offers
                </label>
                <p className="text-gray-400">
                  Get notified when a candidate accepts or rejects an offer.
                </p>
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-sm font-semibold leading-6 text-white">
            Push Notifications
          </legend>
          <p className="mt-1 text-sm leading-6 text-gray-400">
            These are delivered via SMS to your mobile phone.
          </p>
          <div className="mt-6 space-y-6">
            <div className="flex items-center gap-x-3">
              <input
                id="push-everything"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
              />
              <label
                htmlFor="push-everything"
                className="block text-sm font-medium leading-6 text-white"
              >
                Everything
              </label>
            </div>
            <div className="flex items-center gap-x-3">
              <input
                id="push-email"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
              />
              <label
                htmlFor="push-email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Same as email
              </label>
            </div>
            <div className="flex items-center gap-x-3">
              <input
                id="push-nothing"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
              />
              <label
                htmlFor="push-nothing"
                className="block text-sm font-medium leading-6 text-white"
              >
                No push notifications
              </label>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  );
}
