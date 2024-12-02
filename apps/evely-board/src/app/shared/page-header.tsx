import { ArchivesDirResponse } from '@/server/services/archives.service';
import Breadcrumb from '@core/ui/breadcrumb';
import cn from '@core/utils/class-names';
import { Text, Title } from 'rizzui';
import ColorBadge from './table/colors-badge';

export type PageHeaderTypes = {
  title: string;
  breadcrumb: { name: string; href?: string }[];
  className?: string;
  directoryData?: ArchivesDirResponse;
};

export default function PageHeader({
  title,
  directoryData,
  breadcrumb,
  children,
  className,
}: React.PropsWithChildren<PageHeaderTypes>) {
  return (
    <header className={cn('mb-6 @container xs:-mt-2 lg:mb-7', className)}>
      <div className="flex flex-col @lg:flex-row @lg:items-center @lg:justify-between">
        <div>
          <div className="flex items-center gap-x-4">
            <Title
              as="h2"
              className="mb-2 text-[22px] lg:text-2xl 4xl:text-[26px]"
            >
              {title}
            </Title>
            {directoryData && (
              <div className="flex items-center gap-x-2">
                <ColorBadge color={directoryData.data.group.color ?? ''} />
                <Text className="text-nowrap text-gray-500">
                  {directoryData.data.group.name}
                </Text>
              </div>
            )}
          </div>
          <Breadcrumb
            separator=""
            separatorVariant="circle"
            className="flex-wrap"
          >
            {breadcrumb.map((item) => (
              <Breadcrumb.Item
                key={item.name}
                {...(item?.href && { href: item?.href })}
              >
                {item.name}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </div>
        {children}
      </div>
    </header>
  );
}