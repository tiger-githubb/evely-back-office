'use client';

import cn from '@core/utils/class-names';
import { Badge, Flex, Text } from 'rizzui';

const statusColors = {
  success: ['text-green-dark', 'bg-green-dark'],
  warning: ['text-orange-dark', 'bg-orange-dark'],
  danger: ['text-red-dark', 'bg-red-dark'],
  default: ['text-gray-600', 'bg-gray-600'],
};

const classes = {
  base: 'text-xs px-2 duration-200 py-0.5 font-normal capitalize border tracking-wider font-lexend bg-opacity-50 dark:bg-opacity-40 dark:text-opacity-90 dark:text-gray-900 dark:backdrop-blur',
  color: {
    success: statusColors.success,
    danger: statusColors.danger,
  },
};

export default function StatusBadge({ isActive }: { isActive: boolean }) {
  const status = isActive ? 'success' : 'danger';

  return (
    <>
      <Flex align="center" gap="2" className="w-auto">
        <Badge renderAsDot className={classes.color[status][1]} />
        <Text
          className={cn('font-medium capitalize', classes.color[status][0])}
        >
          {isActive ? 'Actif' : 'Inactif'}
        </Text>
      </Flex>
    </>
  );
}
