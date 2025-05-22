
import React, { useState } from "react";
import Layout from "@/components/Layout";
import Tweet, { TweetProps } from "@/components/Tweet";
import ComposeTweet from "@/components/ComposeTweet";

const MOCK_TWEETS: TweetProps[] = [
  {
    id: "1",
    author: {
      name: "살리바",
      username: "saliba",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_GcbNsIUcaj0HL-gUvyg7eW_eV-QnjK4Trw&s",
    },
    content: "good saliba",
    timestamp: "2h",
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
  },
  {
    id: "2",
    author: {
      name: "살리바",
      username: "saliba",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_GcbNsIUcaj0HL-gUvyg7eW_eV-QnjK4Trw&s",
    },
    content: "밥버거",
    timestamp: "4h",
    stats: {
      likes: 124,
      retweets: 12,
      replies: 8,
    },
  },

];

const Index = () => {
  const [tweets, setTweets] = useState<TweetProps[]>(MOCK_TWEETS);

  const handleNewTweet = (content: string) => {
    const newTweet: TweetProps = {
      id: `new-${Date.now()}`,
      author: {
        name: "정소울",
        username: "soul",
        avatar: "https://placekitten.com/100/100",
      },
      content,
      timestamp: "now",
      stats: {
        likes: 0,
        retweets: 0,
        replies: 0,
      },
    };
    
    setTweets([newTweet, ...tweets]);
  };

  return (
    <Layout>
      <div className="border-b border-border">
        <h1 className="font-bold text-xl p-4">Home</h1>
      </div>
      
      <ComposeTweet onTweetSubmit={handleNewTweet} />
      
      <div>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </div>
    </Layout>
  );
};

export default Index;
