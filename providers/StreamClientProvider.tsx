"use client"

import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/Loader';
import { useUser } from '@clerk/nextjs';
import {
  StreamVideoClient,
  StreamVideo,
} from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY

const StreamVideoProvider = ({ children }: { children: React.ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const {user, isLoaded} = useUser();

  useEffect(() => {
    if(!user || !isLoaded) return;
    if(!apiKey) throw new Error('Stream API key not found')
      
    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user.id,
        name: user.username || user.id,
        image: user.imageUrl,
      },
      tokenProvider: tokenProvider,
    });

    setVideoClient(client);
  }, [user, isLoaded]);

  if(!videoClient) return <Loader />;

  return (
    <StreamVideo client={videoClient}>
      {children}
    </StreamVideo>
  );
};

export default StreamVideoProvider;