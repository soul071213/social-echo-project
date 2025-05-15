
import React from "react";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, Repeat, Share } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export interface TweetProps {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  stats: {
    likes: number;
    retweets: number;
    replies: number;
  };
  media?: {
    type: "image" | "video";
    url: string;
  }[];
}

const Tweet = ({
  id,
  author,
  content,
  timestamp,
  stats,
  media,
}: TweetProps) => {
  return (
    <div className="p-4 border-b border-border hover:bg-accent/5 transition-colors">
      <div className="flex gap-3">
        <Link to={`/profile/${author.username}`}>
          <Avatar className="h-10 w-10">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name[0]}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <Link to={`/profile/${author.username}`} className="font-bold hover:underline">
              {author.name}
            </Link>
            <span className="text-muted-foreground">@{author.username}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground text-sm">{timestamp}</span>
          </div>
          
          <Link to={`/tweet/${id}`}>
            <p className="mt-1 whitespace-pre-wrap">{content}</p>
          </Link>
          
          {media && media.length > 0 && (
            <div className={`grid gap-2 mt-3 ${media.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {media.map((item, index) => (
                <div key={index} className="rounded-xl overflow-hidden">
                  {item.type === "image" ? (
                    <img 
                      src={item.url} 
                      alt="Tweet media" 
                      className="w-full h-auto object-cover max-h-80"
                    />
                  ) : (
                    <video 
                      src={item.url} 
                      controls 
                      className="w-full" 
                    />
                  )}
                </div>
              ))}
            </div>
          )}
          
          <div className="flex justify-between mt-3 max-w-md">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full">
              <MessageCircle className="h-4 w-4 mr-1" />
              {stats.replies > 0 && <span>{stats.replies}</span>}
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-green-500 hover:bg-green-500/10 rounded-full">
              <Repeat className="h-4 w-4 mr-1" />
              {stats.retweets > 0 && <span>{stats.retweets}</span>}
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-full">
              <Heart className="h-4 w-4 mr-1" />
              {stats.likes > 0 && <span>{stats.likes}</span>}
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full">
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
