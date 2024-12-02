'use client';
import { getRoles } from '@/server/services/roles.service';
import cn from '@core/utils/class-names';
import { useQuery } from '@tanstack/react-query';
import RoleCard from './role-card';

interface RolesGridProps {
  className?: string;
  gridClassName?: string;
}

export default function RolesGrid({
  className,
  gridClassName,
}: RolesGridProps) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['roles'],
    queryFn: getRoles,
  });
  const rolesData = data;
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className={cn('@container', className)}>
      <div
        className={cn(
          'grid grid-cols-1 gap-6 @[36.65rem]:grid-cols-2 @[56rem]:grid-cols-3 @[78.5rem]:grid-cols-4 @[100rem]:grid-cols-5',
          gridClassName
        )}
      >
        {rolesData?.data.map((role) => (
          <RoleCard key={role.name} role={role} />
        ))}
      </div>
    </div>
  );
}
