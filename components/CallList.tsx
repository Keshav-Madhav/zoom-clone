// @ts-nocheck

"use client"

import { useEffect, useState } from 'react'
import { useGetCalls } from '@/hooks/useGetCalls'
import { useRouter } from 'next/navigation'
import { Call, CallRecording } from '@stream-io/video-react-sdk'
import MeetingCard from './MeetingCard'
import Loader from './Loader'
import { useToast } from './ui/use-toast'

type Props = {
  type: 'upcoming' | 'ended' | 'recordings'
}

const CallList = ({type}: Props) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls()
  const router = useRouter();
  const [recordings, setRecordings] = useState<CallRecording[]>([])
  const toast = useToast()

  const getCalls = () => {
    switch (type) {
      case 'upcoming':
        return upcomingCalls
      case 'ended':
        return endedCalls
      case 'recordings':
        return recordings
      default:
        return []
    }
  }

  const getNoCallsMessage = () => {
    switch (type) {
      case 'upcoming':
        return 'No upcoming calls'
      case 'ended':
        return 'No previous calls'
      case 'recordings':
        return 'No recordings'
      default:
        return []
    }
  }

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(callRecordings.map((meeting) => meeting.queryRecordings()))
        const recordings = callData.filter(call => call.recordings.length > 0).flatMap(call => call.recordings)
        setRecordings(recordings);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch recordings',
        })
      }
    }

    if(type === 'recordings') {
      fetchRecordings()
    }
  }, [callRecordings, type])

  const calls = getCalls()
  const noCallsMessage = getNoCallsMessage()

  if(isLoading) return <Loader />

  return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording, index) => (
          <MeetingCard 
            key={index} 
            icon={
              type === 'ended' ?
              '/icons/previous.svg' :
              type === 'upcoming' ?
              '/icons/upcoming.svg' :
              '/icons/recordings.svg'
            }
            title={meeting.state?.custom.description.substring(0, 23) + (meeting.state?.custom.description.length > 23 ? '...' : '') || meeting.filename.substring(0,20) + (meeing.filename.length > 20 ? '...' : '') || 'Untitled Meeting'}
            date={meeting.state?.startsAt.toLocaleString() || meeting.start_time.toLocaleString()}
            isPreviousMeeting={
              type === 'ended'
            }
            buttonIcon1={
              type === 'recordings' ?
              '/icons/play.svg' :
              undefined
            }
            buttonText={type === 'recordings' ? 'Play' : 'Start'}
            handleClick={
              type === 'recordings' ?
              () => router.push(`${meeting.url}`) :
              () => router.push(`/meeting/${meeting.id}`)
            }
            link={
              type === 'recordings' ? 
              meeting.url : 
              `${window.location.origin}/meeting/${meeting.id}`}
          />
        ))
      ):(
        <p>{noCallsMessage}</p>
      )}
    </div>
  )
}

export default CallList