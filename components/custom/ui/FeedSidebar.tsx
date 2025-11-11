import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { mainLinks } from '@/mock/constant';
import Link from 'next/link';

export const FeedSidebar = () => {
 

  return (
    <div className="hidden lg:block w-64 sticky top-[4.5rem] h-[calc(100vh-4.5rem)] overflow-y-auto">
      <div className="space-y-4 p-4">
        {/* Quick Actions */}
        <Card className="p-3">
          <nav className="space-y-1">
            {mainLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                >
                  <link.icon className="h-5 w-5 mr-3" />
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>
        </Card>

        <Separator />

        {/* Shortcuts */}
        <Card className="p-3">
          <h3 className="font-semibold text-sm mb-3">Your Shortcuts</h3>
          <div className="space-y-2">
            <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
              <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center mr-2">
                ✓
              </div>
              Verified Claims
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
              <div className="w-6 h-6 rounded bg-destructive/10 flex items-center justify-center mr-2">
                ✗
              </div>
              False Claims
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
              <div className="w-6 h-6 rounded bg-yellow-500/10 flex items-center justify-center mr-2">
                ⏳
              </div>
              Pending Review
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
