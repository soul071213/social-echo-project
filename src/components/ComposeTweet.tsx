
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface ComposeTweetProps {
  onTweetSubmit?: (content: string) => void;
  placeholder?: string;
  buttonText?: string;
  isReply?: boolean;
}

const ComposeTweet = ({
  onTweetSubmit,
  placeholder = "What is happening?!",
  buttonText = "Post",
  isReply = false,
}: ComposeTweetProps) => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!content.trim()) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      if (onTweetSubmit) {
        onTweetSubmit(content);
      }
      
      setContent("");
      setIsLoading(false);
      toast({
        title: isReply ? "Reply posted" : "Tweet posted",
        description: "Your message has been shared.",
      });
    }, 500);
  };

  return (
    <div className="p-4 border-b border-border">
      <div className="flex gap-3">
        <Avatar>
          <AvatarImage src="https://placekitten.com/100/100" alt="@user" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder}
            className="min-h-24 border-none resize-none p-0 focus-visible:ring-0 text-lg placeholder:text-muted-foreground/70"
          />
          <div className="flex items-center justify-between mt-3">
            <Button variant="ghost" size="icon" className="text-primary rounded-full">
              <Image className="h-5 w-5" />
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!content.trim() || isLoading}
              className="rounded-full px-4"
            >
              {isLoading ? "Posting..." : buttonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComposeTweet;
