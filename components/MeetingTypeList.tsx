"use client"

import {useState} from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'

type Props = {}

const MeetingTypeList = (props: Props) => {
  const router = useRouter()
  const [meetingState, setMeetingState] = useState<'isScheduleMEeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();
  const {user} = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: '',
  });
  const [callDetails, setCallDetails] = useState<Call>();

  const CreateMeeting = async () => {
    if(!client || !user) return;

    try {
      const id = crypto.randomUUID();
      const call = client.call('default', id)

      if(!call) throw new Error('Call not found');

      const startsAt = values.dateTime.toISOString() || new Date().toISOString();

      const description = values.description || 'Instant meeting';

      await call.getOrCreate({
        data:{
          starts_at: startsAt,
          custom:{
            description,
          }
        }
        })

      setCallDetails(call);

      if(!values.description){
        router.push(`/meeting/${call.id}`)
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
      <HomeCard 
        imageUrl='/icons/add-meeting.svg'
        title='New Meeting'
        description='Start an instant meeting'
        className='bg-orange-1'
        onClick={() => {setMeetingState('isInstantMeeting')}}
      />

      <HomeCard 
        imageUrl='/icons/schedule.svg'
        title='Schedule Meeting'
        description='Plan your meeting'
        className='bg-blue-1'
        onClick={() => {setMeetingState('isScheduleMEeting')}}
      />

      <HomeCard 
        imageUrl='/icons/recordings.svg'
        title='View Recordings'
        description='Check your past recordings'
        className='bg-purple-1'
        onClick={() => {router.push('/recordings')}}
      />

      <HomeCard 
        imageUrl='/icons/join-meeting.svg'
        title='Join Meeting'
        description='Join a meeting with invitation'
        className='bg-yellow-1'
        onClick={() => {setMeetingState('isJoiningMeeting')}}
      />

      <MeetingModal 
        isOpen={meetingState === 'isInstantMeeting'} 
        onClose={() => {setMeetingState(undefined)}} 
        title="Start an Instant Meeting"
        className='text-center'
        buttonText='Start Meeting'
        handleClick={CreateMeeting}
      />
    </section>
  )
}

export default MeetingTypeList