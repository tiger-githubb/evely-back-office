'use client';
import { getAllArchives } from '@/server/services/archives.service';
import { getFileIcon } from '@/utils/file-icons';
import { getRandomAvatar } from '@/utils/user-profile-image';
import WidgetCard from '@core/components/cards/widget-card';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Text } from 'rizzui';

// Define TypeScript interfaces for activity data
interface FileData {
  name: string;
  extension: string | null;
}

interface Thread {
  avatar: string;
  username: string;
  logMessage: string;
  alias: string;
  date: string;
  files: FileData[];
}

interface Activity {
  title: string;
  threads: Thread[];
}

export function ActivityThreadCard({ thread }: { thread: Thread }) {
  const { avatar, username, logMessage, alias, date, files } = thread;
  return (
    <div className="relative flex items-start gap-x-2.5 pb-8 before:absolute before:start-[17px] before:top-0 before:z-0 before:h-full before:w-[1px] before:bg-gray-300 last:pb-0 last:before:hidden">
      <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full">
        <Image
          className="aspect-square object-cover"
          src={avatar}
          alt={username}
          fill
          sizes="(max-width: 768px) 100vw"
        />
      </div>
      <div className="">
        <Text className="text-sm font-normal text-gray-500">
          <Text as="span" className="font-medium capitalize text-gray-700">
            {username}
          </Text>{' '}
          {logMessage}{' '}
          {alias && (
            <Text as="span" className="font-medium capitalize text-gray-700">
              {alias}
            </Text>
          )}
        </Text>
        <Text as="span" className="text-xs text-gray-500">
          {date}
        </Text>
        {files.map((file) => (
          <div
            key={file.name}
            className="mt-2 flex items-center gap-2.5 rounded-lg border border-gray-300 px-2 py-1.5"
          >
            <Image
              src={getFileIcon(file.extension)}
              alt="file icon"
              width={20}
              height={20}
            />
            <Text as="span" className="text-sm text-gray-700">
              {file.name}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ActivityThreads({
  title,
  threads,
}: {
  title: string;
  threads: Thread[];
}) {
  return (
    <div className="relative mb-4 last:mb-0">
      <Text className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-700 2xl:text-base">
        {title}
      </Text>
      <div>
        {threads.map((item, index) => (
          <ActivityThreadCard key={`singleThread-${index}`} thread={item} />
        ))}
      </div>
    </div>
  );
}

export default function RecentActivities({
  className,
}: {
  className?: string;
}) {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllArchives();
        const formattedData: Activity[] = [
          {
            title: 'Activités récentes',
            threads: response.data.map((archive) => ({
              avatar: getRandomAvatar(archive.ownerId),
              username: `${archive.owner.firstName} ${archive.owner.lastName}`,
              logMessage:
                archive.fileType === 'dir'
                  ? 'a créé un dossier'
                  : 'a ajouter un nouveau fichier',
              alias: archive.name,
              date: new Date(archive.createdAt).toLocaleTimeString(),
              files: [
                {
                  name: archive.fileName || archive.name,
                  extension: archive.extension,
                },
              ],
            })),
          },
        ];
        setActivities(formattedData);
      } catch (error) {
        console.error('Error fetching archives:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className={className}>
      <WidgetCard
        title=""
        headerClassName="hidden"
        className="max-h-[520px] overflow-y-auto"
      >
        {activities.map((activity, index) => (
          <ActivityThreads
            key={`thread-${index}`}
            title={activity.title}
            threads={activity.threads}
          />
        ))}
      </WidgetCard>
    </div>
  );
}
