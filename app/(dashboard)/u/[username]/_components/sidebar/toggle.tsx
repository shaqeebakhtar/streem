'use client';
import Hint from '@/components/hint';
import { Button } from '@/components/ui/button';
import { useCreatorSidebar } from '@/store/use-creator-sidebar';
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';

const Toggle = () => {
  const { collapsed, onCollapse, onExpand } = useCreatorSidebar(
    (state) => state
  );
  const label = collapsed ? 'Expand' : 'Collapse';

  return (
    <div className="hidden md:block px-2 py-2">
      <div className="flex items-center justify-between">
        {!collapsed && (
          <p className="font-bold text-sm tracking-wide uppercase">
            Creator Dashboard
          </p>
        )}
        <Hint asChild label={label} side="right">
          <Button
            onClick={collapsed ? onExpand : onCollapse}
            variant={'ghost'}
            className="hover:bg-zinc-700"
            size={'icon'}
          >
            {collapsed ? (
              <ArrowRightFromLine className="w-5 h-5" />
            ) : (
              <ArrowLeftFromLine className="w-5 h-5" />
            )}
          </Button>
        </Hint>
      </div>
    </div>
  );
};

export default Toggle;
