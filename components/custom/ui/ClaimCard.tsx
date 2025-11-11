import { Heart, MessageCircle, Share2, Bookmark, User, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { VerdictBadge } from "./VerdictBadge";

export type ClaimStatus = "verified" | "unverified" | "false";
export type VerdictStatus = "true" | "false" | "pending" | "inconclusive";

interface ClaimCardProps {
  id: string;
  author: {
    name: string;
    avatar: string;
    profession?: string;
  };
  claim: string;
  source?: string;
  status: ClaimStatus;
  verdict: VerdictStatus;
  likes: number;
  comments: number;
  timestamp: string;
  image?: string | StaticImageData;
  submittedDate: string
  category: string
  state: string
  lga: string
}



export const ClaimCard = ({
  id,
  author,
  claim,
  source,
  status,
  likes,
  comments,
  timestamp,
  image,
  verdict,
  submittedDate,
  category,
  lga,
  state,
}: ClaimCardProps) => {
  const cardBgColor = {
    true: 'verdict-true/10 ',
    inconclusive: 'verdict-inconclusive/10 ',
    false: 'verdict-false/10 ',
    pending: 'verdict-pending/10 ',
  };

  return (
    <div className={`bg-${cardBgColor[verdict]} p-2 rounded-2xl border hover:shadow-lg h-fit`}>
      
     <Card className="overflow-hidden transition-all py-0 border-0">
        <CardHeader className={`bg-${cardBgColor[verdict]} pb-3`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={author?.avatar} alt={author?.name} />
                <AvatarFallback>{author?.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <Link
                  href={`/profile/${author?.name}`}
                  className="font-semibold text-foreground hover:underline"
                >
                  {author?.name}
                </Link>
                {author?.profession && (
                  <p className="text-sm text-muted-foreground">{author?.profession}</p>
                )}
              </div>
            </div>
            {/* <Badge className={cn("font-semibold", statusData?.className)}>
              {statusData?.label}
            </Badge> */}
            <VerdictBadge verdict={verdict} size="sm" />

          </div>
          <div className="flex items-center gap-3">
            
            <div className="flex-1">
             
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{new Date(submittedDate).toLocaleDateString()}</span>
                <span>•</span>
                <MapPin className="h-3 w-3" />
                <span>{lga}, {state}</span>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <Link href={`/claim/${id}`} className="block">
            <p className="text-base leading-relaxed text-foreground hover:text-primary transition-colors">
              {claim}
            </p>
          </Link>

          {image && (
            <Link href={`/claim/${id}`}>
              <Image
                src={image}
                alt="Claim visual"
                className={`bg-${cardBgColor[verdict]} w-full border p-1 rounded-lg object-fill max-h-60 hover:opacity-90 transition-opacity`}
              />
            </Link>
          )}

          {source && (
            <div className="rounded-lg border bg-muted/50 p-3 mt-3">
              <a
                href={source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary flex items-center space-x-2"
              >
                <span className="font-medium">Source:</span>
                <span className="truncate hover:underline">{source}</span>
              </a>
            </div>
          )}

          <p className="text-sm text-muted-foreground">{timestamp}</p>
        </CardContent>

        <CardFooter className="border-t pt-3">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" className="space-x-2">
                <Heart className="h-5 w-5" />
                <span>{likes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="space-x-2" asChild>
                <Link href={`/claim/${id}`}>
                  <MessageCircle className="h-5 w-5" />
                  <span>{comments}</span>
                </Link>
              </Button>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Bookmark className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
