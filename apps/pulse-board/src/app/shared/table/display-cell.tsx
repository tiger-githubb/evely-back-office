import cn from '@core/utils/class-names';
import { Flex, Text } from 'rizzui';
interface CellProps {
  className?: string;
  itemClassName?: string;
  valueOne?: string;
  valueTwo?: string;
}

export default function DisplayCell({
  className,
  itemClassName,
  valueOne,
  valueTwo,
}: CellProps) {
  return (
    <div className={cn('grid gap-1', className)}>
      <Text className={cn('font-medium text-gray-700', itemClassName)}>
        {valueOne}
      </Text>
      <Text
        className={cn('font-medium capitalize text-gray-500', itemClassName)}
      >
        {valueTwo}
      </Text>
    </div>
  );
}

interface FileCellProps {
  src: StaticImageData;
  alt: string;
  name: string;
  className?: string;
  nameClassName?: string;
  description?: React.ReactNode;
}

import Image, { StaticImageData } from 'next/image';
export function FileCell({
  src,
  name,
  alt,
  className,
  description,
  nameClassName,
}: FileCellProps) {
  return (
    <figure className={cn('flex items-center gap-3', className)}>
      <Flex
        align="center"
        justify="center"
        className="size-12 min-w-[50px] rounded-xl bg-gray-100"
      >
        <Image
          src={src}
          className="aspect-square"
          width={26}
          height={26}
          alt={alt}
        />
      </Flex>
      <figcaption className="grid gap-0.5">
        <Text
          className={cn(
            'font-lexend text-sm font-medium text-gray-900 dark:text-gray-700',
            nameClassName
          )}
        >
          {name}
        </Text>
        {description && (
          <div
            className="line-clamp-1 text-[13px] text-gray-500"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
      </figcaption>
    </figure>
  );
}
