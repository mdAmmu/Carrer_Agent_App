"use client"
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { Router } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ResumeUploadDialog from './ResumeUploadDialog'

interface TOOL {
  name: string,
  desc: string,
  icon: string,
  button: string,
  path: string
}

type AIToolProps = {
  tool: TOOL
}

const AiToolCard = ({ tool }: AIToolProps) => {
  const id = uuidv4();
  // const {user} = useUser();
  const router = useRouter();
  const [openResumeUpload, setOpenResumeUpload] = useState(false);


  const onClickButton = async () => {

    if (tool.name == 'AI Resume Analyzer') {
      setOpenResumeUpload(true)
      return;
    }

    const result = await axios.post('/api/history', {
      recordId: id,
      content: []
    });
    router.push(tool.path + "/" + id);

  }


  return (
    <div className='p-3 border rounded-lg' >
      <Image src={tool.icon} width={50} height={50} alt={tool.name} />
      <h2 className='font-bold mt-2'>{tool.name}</h2>
      <p className='text-gray-400'>{tool.desc}</p>

        <Button className='w-full mt-3'
          onClick={onClickButton}
        >{tool.button}</Button>

      <ResumeUploadDialog openResumeUpload={openResumeUpload}
        setOpenResumeDialog={setOpenResumeUpload} />
    </div>
  )
}

export default AiToolCard