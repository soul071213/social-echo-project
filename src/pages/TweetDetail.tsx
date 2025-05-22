
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
    name: "살리바",
    username: "saliba",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_GcbNsIUcaj0HL-gUvyg7eW_eV-QnjK4Trw&s",
  },
  content: "김치가",
  timestamp: "ㅋㅋ",
  stats: {
    likes: 5432,
    retweets: 876,
    replies: 243,
  },
  media: [
    {
      type: "image",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1SVtpSBBH3q_DkUnCqvycYvvaCgXsaMP43w&s",
    },
  ],
};

const MOCK_COMMENTS: CommentProps[] = [
  {
    id: "c1",
    author: {
      name: "밥",
      username: "칼라피오리",
      avatar: "https://i.namu.wiki/i/D6qw-oHKiY47rAmUaeK0uKd1VYoUOCaDA-0BBvV2H9w8LTGUVdYL_a5w4eYL2DRtG5M3FclpDX6wRWaH3TOt7w.webp",
    },
    content: "좋노",
    timestamp: "4시간 전",
    likes: 142,
  },
  {
    id: "c2",
    author: {
      name: "살리바",
      username: "살리바",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_GcbNsIUcaj0HL-gUvyg7eW_eV-QnjK4Trw&s",
    },
    content: "봉디",
    timestamp: "5시간 전",
    likes: 78,
    replies: [
      {
        id: "r1",
        author: {
          name: "일론 머스크",
          username: "elonmusk",
          avatar: "https://placekitten.com/200/200",
        },
        replyToUsername: "살리바",
        content: "반갑노",
        timestamp: "3시간 전  ",
        likes: 1254,
      },
    ]
  },

];

const Comment = ({ comment, isReply = false }: { comment: CommentProps, isReply?: boolean }) => {
  const [showReplies, setShowReplies] = useState(true);
  const [isReplying, setIsReplying] = useState(false);
  const [replies, setReplies] = useState<CommentProps[]>(comment.replies || []);
  
  const handleNewReply = (content: string) => {
    const newReply: CommentProps = {
      id: `reply-${Date.now()}`,
      author: {
        name: "정소울",
        username: "soul",
        avatar: "https://placekitten.com/100/100",
      },
      replyToUsername: comment.author.username,
      content: content,
      timestamp: "just now",
      likes: 0,
    };
    
    setReplies([...replies, newReply]);
    setIsReplying(false);
  };
  
  return (
    <div>
      <div className={`p-4 ${!isReply ? 'border-b border-border' : ''} hover:bg-accent/5 transition-colors`}>
        <div className="flex gap-3">
          <div className="flex flex-col items-center">
            <Avatar className="h-10 w-10">
              <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
              <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
            </Avatar>
            {(replies.length > 0 && showReplies) && (
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
                  onTweetSubmit={handleNewReply}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      
      {replies.length > 0 && showReplies && (
        <div className="ml-12">
          {replies.map((reply) => (
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
        name: "정소울",
        username: "soul",
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
