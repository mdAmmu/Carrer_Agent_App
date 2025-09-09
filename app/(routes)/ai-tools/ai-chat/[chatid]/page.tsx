"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { FaArrowUp } from "react-icons/fa";
import { LoaderCircle, Send } from 'lucide-react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown'
import { useParams } from 'next/navigation';
import EmptyState from '../_components/EmptyState';

type messages ={
    content:string,
    role:string,
    type:string
}

const AiChat = () => {

    const [userInput,setUserInput] = useState<string>();
    const [loading,setLoading] = useState(false);
    const [messageList, setMessageList] = useState<messages[]>([]);
    const {chartid} = useParams();
    console.log(chartid)

    const onSend = async () => {
        setLoading(true);
        setMessageList(prev => [...prev, {
            content: userInput as string,
            role:'user',
            type:'text'
        }])
        setUserInput('');
        const result = await  axios.post('/api/ai-career-chat-agent', {
            userInput: userInput
        });
        console.log(result.data);
        setMessageList(prev=>[...prev,result.data])
        setLoading(false);
    }

    useEffect(() => {
        // save message to database
    },[messageList])

    return (
        <div className='px-10 md:px-24 ld:px-36 xl:px-48'>
            <div className='flex items-center justify-between gap-8'>
                <div>
                    <h2 className='font-bold text-lg'>AI Career Q/A Chat</h2>
                    <p>Smarter career decision start here -- get tailored advice, real time market insight, and a roadmap built just for you with the power of AI.</p>
                </div>
                <Button>+ New Chat</Button>
            </div>

            <div className='flex flex-col h-[75vh]'>
                {messageList?.length<=0 &&<div className='mt-5'>
                    <EmptyState selectedQuestion={(question:string)=>setUserInput(question)}/>
                </div>}
                <div className='flex-1'>
                    {messageList?.map((message,index)=> (
                        <div>
                            <div key={index} className={`flex mb-2 ${message.role=='user'?'justify-end': 'justify-start'}`}>
                                <div className={`p-3 rounded-lg gap-2 ${message.role == 'user' ? 
                                    'bg-gray-200 text-black rounded-lg' 
                                    : "bg-gray-50 text-black"}`}>
                                        
                                    <ReactMarkdown>
                                        {message.content}
                                    </ReactMarkdown>
                                </div>
                            </div>
                            {loading && messageList?.length-1==index&& <div className='flex justify-start p-3 rounded-lg gap-2 bg-gray-50 text-black mb-2'>
                                <LoaderCircle className='animate-spin'/> Thinking...
                            </div>}
                        </div>
                    ))}
                </div>
                <div className='flex items-center justify-between gap-6'>
                    <Input placeholder='Type here' className='border-2 black'
                    value={userInput}
                    onChange={(event)=>setUserInput(event.target.value)}/>
                    <Button onClick={onSend} disabled={loading} className='m-4'><Send/></Button>
                </div>
            </div>
        </div>

    )
}

export default AiChat 