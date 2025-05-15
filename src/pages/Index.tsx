
import React, { useState } from "react";
import Layout from "@/components/Layout";
import Tweet, { TweetProps } from "@/components/Tweet";
import ComposeTweet from "@/components/ComposeTweet";

const MOCK_TWEETS: TweetProps[] = [
  {
    id: "1",
    author: {
      name: "Elon Musk",
      username: "elonmusk",
      avatar: "https://placekitten.com/200/200",
    },
    content: "This is an example tweet. The future of humanity will be mostly in space, and mostly made up of genetically engineered super humans. 🚀",
    timestamp: "2h",
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
  },
  {
    id: "2",
    author: {
      name: "Sarah Johnson",
      username: "sarahj",
      avatar: "https://placekitten.com/201/201",
    },
    content: "Just finished a 5k run! Personal best time. 🏃‍♀️💯",
    timestamp: "4h",
    stats: {
      likes: 124,
      retweets: 12,
      replies: 8,
    },
  },
  {
    id: "3",
    author: {
      name: "Tech News",
      username: "technews",
      avatar: "https://placekitten.com/202/202",
    },
    content: "Breaking: New AI model can now generate realistic videos from text descriptions. This could revolutionize content creation.",
    timestamp: "5h",
    stats: {
      likes: 2100,
      retweets: 1400,
      replies: 300,
    },
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      },
    ],
  },
  {
    id: "4",
    author: {
      name: "Basketball Fans",
      username: "bballfans",
      avatar: "https://placekitten.com/203/203",
    },
    content: "Game 7 tonight! Who's your pick to win it all? 🏀🏆",
    timestamp: "7h",
    stats: {
      likes: 342,
      retweets: 56,
      replies: 87,
    },
  },
  {
    id: "5",
    author: {
      name: "Travel Enthusiast",
      username: "travellover",
      avatar: "https://placekitten.com/204/204",
    },
    content: "The view from my hotel room in Bali. Sometimes I pinch myself to make sure this is real life. ✈️🌴",
    timestamp: "9h",
    stats: {
      likes: 892,
      retweets: 114,
      replies: 32,
    },
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1682687220566-5599dbbebf11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1682687220503-bca2f7b04707?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      },
    ],
  },
];

const Index = () => {
  const [tweets, setTweets] = useState<TweetProps[]>(MOCK_TWEETS);

  const handleNewTweet = (content: string) => {
    const newTweet: TweetProps = {
      id: `new-${Date.now()}`,
      author: {
        name: "Current User",
        username: "currentuser",
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
