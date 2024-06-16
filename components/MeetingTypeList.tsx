"use client"

import {useState} from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast } from '@/components/ui/use-toast'
import { Textarea } from './ui/textarea'
import ReactDatePicker from 'react-datepicker'
import { Input } from './ui/input'

type Props = {}

const MeetingTypeList = (props: Props) => {
  const router = useRouter()
  const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();
  const {user} = useUser();
  const { toast } = useToast();
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
      if(!values.dateTime) {
        toast({
          title: 'Error',
          description: 'Please select a date and time for the meeting'
        })
        return
      }
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
      toast({
        title: 'Success',
        description: 'Meeting created successfully'
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'An error occurred while creating the meeting'
      })
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
        onClick={() => {setMeetingState('isScheduleMeeting')}}
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

      {!callDetails ? (
        <MeetingModal 
          isOpen={meetingState === 'isScheduleMeeting'} 
          onClose={() => {setMeetingState(undefined)}} 
          title="Create Meeting"
          handleClick={CreateMeeting}
        >
          <div className='w-full flex flex-col gap-2.5 '>
            <label className='text-base text-normal leading-[22px] text-sky-2'>Add a description</label>
            <Textarea 
              className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
              onChange={(e) => setValues({...values, description: e.target.value})}
              placeholder='Add a description'
              value={values.description}
            />
          </div>

          <div className='w-full flex flex-col gap-2.5 '>
            <label className='text-base text-normal leading-[22px] text-sky-2'>Select Date and Time</label>
            <ReactDatePicker 
              selected={values.dateTime}
              onChange={(date) => setValues({...values, dateTime: date!})}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className='w-full rounded bg-dark-3 p-2 focus:outline-none'
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal 
          isOpen={meetingState === 'isScheduleMeeting'} 
          onClose={() => {setMeetingState(undefined)}} 
          title="Meeting Created"
          className='text-center'
          handleClick={()=>{
            navigator.clipboard.writeText(`${window.location.origin}/meeting/${callDetails.id}`)
            toast({
              description: 'Meeting link copied to clipboard'
            })
          }}
          
          image="/icons/checked.svg"
          buttonText='Copy Meeting link'
          buttonIcon="/icons/copy.svg" 
        />
      )}

      <MeetingModal 
        isOpen={meetingState === 'isInstantMeeting'} 
        onClose={() => {setMeetingState(undefined)}} 
        title="Start an Instant Meeting"
        className='text-center'
        buttonText='Start Meeting'
        handleClick={CreateMeeting}
      />

      <MeetingModal 
        isOpen={meetingState === 'isJoiningMeeting'} 
        onClose={() => {setMeetingState(undefined)}} 
        title="Enter Meeting Link"
        className='text-center'
        buttonText='Join Meeting'
        handleClick={()=> router.push(values.link)}
      > 
        <Input 
          className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
          onChange={(e) => setValues({...values, link: e.target.value})}
          placeholder='Enter Meeting Link'
          value={values.link}
        />
      </MeetingModal>
    </section>
  )
}

export default MeetingTypeList