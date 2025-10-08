import { UserCircleIcon } from "@phosphor-icons/react"; // or any placeholder icon

type Props = {
  name: string;
  src?: string;
};

export default function Avatar({ name, src }: Props) {
  return (
    <div className="flex-shrink-0 h-10 w-10">
      {src ? (
        <img className="h-10 w-10 rounded-full object-cover" src={src} alt={`${name} avatar`} />
      ) : (
        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
          <UserCircleIcon className="w-6 h-6 text-gray-400" />
        </div>
      )}
    </div>
  );
}
