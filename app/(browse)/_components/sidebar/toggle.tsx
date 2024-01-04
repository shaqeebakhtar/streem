'use client';
import Hint from '@/components/hint';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/store/use-sidebar';
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';

const Toggle = () => {
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);
  const label = collapsed ? 'Expand' : 'Collapse';

  return (
    <>
      {collapsed && (
        <div className="px-2 py-2">
          <Hint asChild label={label} side="right">
            <Button
              onClick={onExpand}
              variant={'ghost'}
              className="hidden md:flex hover:bg-zinc-700"
              size={'icon'}
            >
              <ArrowRightFromLine className="w-5 h-5" />
            </Button>
          </Hint>
        </div>
      )}
      {!collapsed && (
        <div className="px-3 py-2">
          <div className="flex items-center justify-between">
            <p className="font-bold text-lg tracking-wider">For You</p>
            <Hint asChild label={label} side="right">
              <Button
                onClick={onCollapse}
                variant={'ghost'}
                size={'icon'}
                className="hover:bg-zinc-700"
              >
                <ArrowLeftFromLine className="w-5 h-5" />
              </Button>
            </Hint>
          </div>
        </div>
      )}
    </>
  );
};

export default Toggle;
