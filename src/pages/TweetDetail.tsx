
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import Tweet, { TweetProps } from "@/components/Tweet";
import ComposeTweet from "@/components/ComposeTweet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CommentProps {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  replyToUsername?: string;
  likes: number;
  replies?: CommentProps[];
}

const MOCK_TWEET: TweetProps = {
  id: "1",
  author: {
    name: "Elon Musk",
    username: "elonmusk",
    avatar: "https://placekitten.com/200/200",
  },
  content: "This is an example tweet. The future of humanity will be mostly in space, and mostly made up of genetically engineered super humans. 🚀",
  timestamp: "May 15",
  stats: {
    likes: 5432,
    retweets: 876,
    replies: 243,
  },
  media: [
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
  ],
};

const MOCK_COMMENTS: CommentProps[] = [
  {
    id: "c1",
    author: {
      name: "Tech Enthusiast",
      username: "techfan",
      avatar: "https://placekitten.com/205/205",
    },
    content: "I'm excited to see how SpaceX's Starship will make this a reality!",
    timestamp: "4h",
    likes: 142,
  },
  {
    id: "c2",
    author: {
      name: "Science Writer",
      username: "sciencewriter",
      avatar: "https://placekitten.com/206/206",
    },
    content: "What's your timeline for the first Mars colony?",
    timestamp: "5h",
    likes: 78,
    replies: [
      {
        id: "r1",
        author: {
          name: "Elon Musk",
          username: "elonmusk",
          avatar: "https://placekitten.com/200/200",
        },
        replyToUsername: "sciencewriter",
        content: "Aiming for first human landing before 2030, sustainable colony by 2050.",
        timestamp: "3h",
        likes: 1254,
      },
      {
        id: "r2",
        author: {
          name: "Space Enthusiast",
          username: "spacegeek",
          avatar: "https://placekitten.com/207/207",
        },
        replyToUsername: "elonmusk",
        content: "That's ambitious but exciting! Can't wait to see it happen.",
        timestamp: "2h",
        likes: 86,
      }
    ]
  },
  {
    id: "c3",
    author: {
      name: "Skeptic",
      username: "doubter",
      avatar: "https://placekitten.com/208/208",
    },
    content: "Seems far-fetched. How will you solve radiation issues during long space travel?",
    timestamp: "6h",
    likes: 24,
  },
];

const Comment = ({ comment, isReply = false }: { comment: CommentProps, isReply?: boolean }) => {
  const [showReplies, setShowReplies] = useState(true);
  const [isReplying, setIsReplying] = useState(false);
  
  return (
    <div>
      <div className={`p-4 ${!isReply ? 'border-b border-border' : ''} hover:bg-accent/5 transition-colors`}>
        <div className="flex gap-3">
          <div className="flex flex-col items-center">
            <Avatar className="h-10 w-10">
              <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
              <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
            </Avatar>
            {comment.replies && comment.replies.length > 0 && showReplies && (
              <div className="w-0.5 grow bg-border mt-2"></div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <span className="font-bold hover:underline">
                {comment.author.name}
              </span>
              <span className="text-muted-foreground">@{comment.author.username}</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground text-sm">{comment.timestamp}</span>
            </div>
            
            {comment.replyToUsername && (
              <div className="text-muted-foreground text-sm">
                Replying to <span className="text-primary">@{comment.replyToUsername}</span>
              </div>
            )}
            
            <p className="mt-1 whitespace-pre-wrap">{comment.content}</p>
            
            <div className="flex gap-4 mt-2">
              <button 
                className="text-muted-foreground text-sm hover:text-primary flex items-center"
                onClick={() => setIsReplying(!isReplying)}
              >
                Reply
              </button>
              <button className="text-muted-foreground text-sm hover:text-primary flex items-center">
                {comment.likes > 0 ? `${comment.likes} ` : ''}Like
              </button>
            </div>
            
            {isReplying && (
              <div className="mt-2">
                <ComposeTweet 
                  placeholder={`Reply to @${comment.author.username}`}
                  buttonText="Reply"
                  isReply={true}
                  onTweetSubmit={() => setIsReplying(false)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      
      {comment.replies && comment.replies.length > 0 && showReplies && (
        <div className="ml-12">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} isReply={true} />
          ))}
        </div>
      )}
    </div>
  );
};

const TweetDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [tweet] = useState<TweetProps>(MOCK_TWEET);
  const [comments, setComments] = useState<CommentProps[]>(MOCK_COMMENTS);

  const handleNewComment = (content: string) => {
    const newComment: CommentProps = {
      id: `new-${Date.now()}`,
      author: {
        name: "Current User",
        username: "currentuser",
        avatar: "https://placekitten.com/100/100",
      },
      content,
      timestamp: "now",
      likes: 0,
    };
    
    setComments([newComment, ...comments]);
  };

  return (
    <Layout>
      <div className="border-b border-border">
        <h1 className="font-bold text-xl p-4">Post</h1>
      </div>
      
      <div className="p-4">
        <Tweet {...tweet} />
      </div>
      
      <ComposeTweet 
        onTweetSubmit={handleNewComment} 
        placeholder="Post your reply"
        buttonText="Reply"
        isReply={true}
      />
      
      <div className="border-t border-border">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </Layout>
  );
};

export default TweetDetail;
