/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heart, MessageCircle, Share2, Bookmark, User, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { VerdictBadge } from "./VerdictBadge";
import { base64ToFile, timeAgoOrIn } from "@/mock/constant";
import { useEffect, useState } from "react";


export const ClaimCard = ({
  id,
  profile,
  description,
  likes,
  comments,
  verdict,
  submittedDate,
  category,
  lga,
  createdAt,
  attachments,
}: ClaimCardProps) => {
  const cardBgColor = {
    true: 'verdict-true/10 ',
    inconclusive: 'verdict-inconclusive/10 ',
    false: 'verdict-false/10 ',
    pending: 'verdict-pending/10 ',
  };
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (!attachments) return;

    try {
      const file = base64ToFile(attachments, "image.png");
      const newImg = URL.createObjectURL(file);

      // Fix: defer the state update
      Promise.resolve().then(() => setImageUrl(newImg));

      return () => URL.revokeObjectURL(newImg);
    } catch {
      Promise.resolve().then(() => setImageUrl(""));
    }
  }, [attachments]);
  return (
    <div className={`bg-${cardBgColor[verdict]} p-2 rounded-2xl border hover:shadow-lg h-fit`}>
      
     <Card className="overflow-hidden transition-all py-0 border-0">
        <CardHeader className={`bg-${cardBgColor[verdict]} pb-3`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={profile?.avatarUrl} alt={profile?.fullName} />
                <AvatarFallback>{profile?.fullName[0]}</AvatarFallback>
              </Avatar>
              <div>
                <Link
                  href={`/profile/${profile?.fullName}`}
                  className="font-semibold text-foreground hover:underline"
                >
                  {profile?.fullName}
                </Link>
                {profile?.bio && (
                  <p className="text-sm text-muted-foreground">{profile?.bio}</p>
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
                <span>{lga?.name}, {lga?.state?.name}</span>
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
              {description}
            </p>
          </Link>

          {imageUrl && (
            <Link
              href={`/claim/${id}`}
              className={`relative block w-full max-w-3xl aspect-[4/2] rounded-lg overflow-hidden border p-1 bg-${cardBgColor[verdict]} hover:opacity-90 transition-opacity`}
            >
              <Image
                src={imageUrl}
                alt="Claim visual"
                fill
                sizes="100vw"
                priority
                className="object-fill"
              />
            </Link>
          )}


          
            <div className="rounded-lg border bg-muted/50 p-3 mt-3">
              <a
              href={`/claim/${id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary flex items-center space-x-2"
              >
                <span className="font-medium">Read More:</span>
              <span className="truncate hover:underline">{`/claim/${id}`}</span>
              </a>
            </div>
         

          <p className="text-sm text-muted-foreground">{timeAgoOrIn(createdAt)}</p>
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
