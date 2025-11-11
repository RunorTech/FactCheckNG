import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { User, PlusCircle } from 'lucide-react';
import Link from 'next/link';

export const CreatePostCard = () => {
  return (
    <Card className="p-4 mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="h-5 w-5 text-primary" />
        </div>
        <Link href="/submit-claims" className="flex-1">
          <Button
            variant="outline"
            className="w-full justify-start text-muted-foreground hover:bg-muted rounded-full"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Submit a claim for verification...
          </Button>
        </Link>
      </div>
    </Card>
  );
};
