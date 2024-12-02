import cn from '@core/utils/class-names';
import { Badge, Flex, Text } from 'rizzui';

export default function ColorBadge({ color }: { color: string }) {
  return (
    <>
      <Flex align="center" gap="2" className="w-auto">
        <Badge
          renderAsDot
          size="lg"
          style={{ backgroundColor: color || '#272727a6' }}
        />
        <Text
          className={cn(
            'text-sm font-medium',
            color ? 'text-gray-500' : 'text-gray-500/20'
          )}
        >
          {/* {color || 'Non défini'} */}
        </Text>
      </Flex>
    </>
  );
}
