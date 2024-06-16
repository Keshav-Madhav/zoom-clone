"use client"

import {useState} from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'

type Props = {}

const MeetingTypeList = (props: Props) => {
  const router = useRouter()
  const [meetingState, setMeetingState] = useState<'isScheduleMEeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();

  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5'>
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
    </section>
  )
}

export default MeetingTypeList