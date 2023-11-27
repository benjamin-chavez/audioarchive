// frontend/app/components/card.tsx

type UserCardProps = {
  username: string;
  email: string;
};

export default function UserCard({ username, email }: UserCardProps) {
  return (
    <>
      <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {username}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {email}
          </p>
        </div>
      </div>
    </>
  );
}
