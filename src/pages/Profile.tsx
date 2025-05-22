
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import Tweet, { TweetProps } from "@/components/Tweet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Link as LinkIcon, MapPin } from "lucide-react";

const MOCK_USER = {
  name: "살리바",
  username: "saliba",
  avatar: "https://i.namu.wiki/i/4PDm_H-xeZePeXDkEJiCnZG79lvMFtpcTkjzaGozWIni1-qtEyTEyqFT_gDOg0mO4517lEyDf41X5rMoVTSM2g.webp",
  banner: "https://i.namu.wiki/i/iM0KxiIIa9FnalWjt0jXcVdjd4wpMf9Xa7omJ8vEX8kHj_QCJi7gaQnr9ce5JQgwTyZ4EYXaTLoVHuyQ1-JIKg.webp",
  bio: "봉디",
  location: "북런던",
  website: "arsenal.com",
  joinedDate: "June 2009",
  following: 173,
  followers: 151500000,
  isFollowing: false,
};

const MOCK_USER_TWEETS = [
  {
    id: "1",
    author: {
      name: MOCK_USER.name,
      username: MOCK_USER.username,
      avatar: MOCK_USER.avatar,
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
    id: "6",
    author: {
      name: MOCK_USER.name,
      username: MOCK_USER.username,
      avatar: MOCK_USER.avatar,
    },
    content: "arsenal.",
    timestamp: "1d",
    stats: {
      likes: 76500,
      retweets: 9876,
      replies: 3421,
    },
  },
  {
    id: "7",
    author: {
      name: MOCK_USER.name,
      username: MOCK_USER.username,
      avatar: MOCK_USER.avatar,
    },
    content: "북런던",
    timestamp: "2d",
    stats: {
      likes: 122000,
      retweets: 24500,
      replies: 5600,
    },
  },
];

const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const [user] = useState(MOCK_USER);
  const [tweets] = useState<TweetProps[]>(MOCK_USER_TWEETS);
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    } else {
      return num.toString();
    }
  };

  return (
    <Layout>
      {/* Header */}
      <div className="border-b border-border">
        <div className="h-48 relative">
          <img 
            src={user.banner} 
            alt="Profile banner" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="px-4 pb-4">
          <div className="flex justify-between">
            <div className="relative">
              <Avatar className="h-32 w-32 absolute -translate-y-1/2 border-4 border-background">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
            </div>
            <div className="mt-4">
              <Button
                onClick={handleFollow}
                variant={isFollowing ? "outline" : "default"}
                className="rounded-full font-bold"
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
            </div>
          </div>
          
          <div className="mt-16">
            <h1 className="text-xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">@{user.username}</p>
            
            <p className="mt-3">{user.bio}</p>
            
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm text-muted-foreground">
              {user.location && (
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{user.location}</span>
                </div>
              )}
              
              {user.website && (
                <div className="flex items-center">
                  <LinkIcon className="h-4 w-4 mr-1" />
                  <a href={`https://${user.website}`} className="text-primary hover:underline">
                    {user.website}
                  </a>
                </div>
              )}
              
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Joined {user.joinedDate}</span>
              </div>
            </div>
            
            <div className="flex gap-4 mt-3">
              <div className="flex">
                <span className="font-bold mr-1">{formatNumber(user.following)}</span>
                <span className="text-muted-foreground">Following</span>
              </div>
              <div className="flex">
                <span className="font-bold mr-1">{formatNumber(user.followers)}</span>
                <span className="text-muted-foreground">Followers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs and Tweets */}
      <Tabs defaultValue="posts">
        <TabsList className="grid w-full grid-cols-4 bg-transparent">
          <TabsTrigger value="posts" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none">
            Posts
          </TabsTrigger>
          <TabsTrigger value="replies" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none">
            Replies
          </TabsTrigger>
          <TabsTrigger value="media" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none">
            Media
          </TabsTrigger>
          <TabsTrigger value="likes" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none">
            Likes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          {tweets.map((tweet) => (
            <Tweet key={tweet.id} {...tweet} />
          ))}
        </TabsContent>
        <TabsContent value="replies">
          <div className="p-8 text-center text-muted-foreground">
            No replies yet.
          </div>
        </TabsContent>
        <TabsContent value="media">
          <div className="p-8 text-center text-muted-foreground">
            No media tweets yet.
          </div>
        </TabsContent>
        <TabsContent value="likes">
          <div className="p-8 text-center text-muted-foreground">
            No liked tweets yet.
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Profile;
