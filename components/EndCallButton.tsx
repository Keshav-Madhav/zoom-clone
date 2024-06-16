import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

type Props = {}

const EndCallButton = (props: Props) => {
  const call = useCall();
  const router = useRouter();

  const {useLocalParticipant} = useCallStateHooks();

  const LocalParticipant = useLocalParticipant();

  const isMeetingOwner = LocalParticipant && call?.state.createdBy && LocalParticipant.userId === call.state.createdBy.id;

  if(!isMeetingOwner) return null;

  return (
    <Button 
      onClick={async () => {await call.endCall(); router.push('/')}} 
      className='bg-red-500 text-white'
    >
      End Call for everyone
    </Button  >
  )
}

export default EndCallButton