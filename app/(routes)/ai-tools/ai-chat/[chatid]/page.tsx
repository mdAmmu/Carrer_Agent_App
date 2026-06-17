"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useRef, useState } from 'react'
import { FaArrowUp } from "react-icons/fa";
import { LoaderCircle, Send, Sparkles, User, Bot, Plus } from 'lucide-react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown'
import { useParams, useRouter } from 'next/navigation';
import EmptyState from '../_components/EmptyState';
import { v4 as uuidv4 } from 'uuid'

type messages = {
    content: string,
    role: string,
    type: string
}

const AiChat = () => {
    const [userInput, setUserInput] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [messageList, setMessageList] = useState<messages[]>([]);
    const { chatid } = useParams();
    const router = useRouter();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatid && GetMessageList();
    }, [chatid])

    const GetMessageList = async () => {
        try {
            const result = await axios.get('/api/history?recordId=' + chatid);
            if (result.data?.content) {
                setMessageList(result.data.content);
            }
        } catch (error) {
            console.error("Error fetching message list:", error);
        }
    }

    const onSend = async () => {
        if (!userInput.trim()) return;

        const currentInput = userInput;
        setLoading(true);
        const newUserMessage = {
            content: currentInput,
            role: 'user',
            type: 'text'
        };

        setMessageList(prev => [...prev, newUserMessage])
        setUserInput('');

        try {
            const result = await axios.post('/api/ai-career-chat-agent', {
                userInput: currentInput
            });
            setMessageList(prev => [...prev, result.data])
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (messageList.length > 0) {
            updateMessageList();
            scrollToBottom();
        }
    }, [messageList])

    const updateMessageList = async () => {
        try {
            await axios.put('/api/history', {
                content: messageList,
                recordId: chatid
            })
        } catch (error) {
            console.error("Error updating message list:", error);
        }
    }

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }

    const onNewChat = async () => {
        const id = uuidv4();
        try {
            await axios.post('/api/history', {
                recordId: id,
                content: [],
                aiAgentType: 'career-chat'
            });
            router.replace("/ai-tools/ai-chat/" + id);
        } catch (error) {
            console.error("Error creating new chat:", error);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    }

    return (
        <div className='flex flex-col h-[calc(100vh-140px)] max-w-5xl mx-auto'>
            {/* Header */}
            <div className='flex items-center justify-between mb-6 px-4'>
                <div className='flex items-center gap-3'>
                    <div className='p-2 bg-primary/10 rounded-lg'>
                        <Sparkles className='w-6 h-6 text-primary' />
                    </div>
                    <div>
                        <h2 className='font-bold text-2xl tracking-tight'>AI Career Coach</h2>
                        <p className='text-sm text-muted-foreground'>Powered by Gemini 2.0 Flash</p>
                    </div>
                </div>
                <Button variant="outline" onClick={onNewChat} className='gap-2 hidden md:flex'>
                    <Plus className='w-4 h-4' /> New Chat
                </Button>
            </div>

            {/* Chat Area */}
            <div
                ref={scrollRef}
                className='flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-hide'
            >
                {messageList?.length <= 0 ? (
                    <div className='flex flex-col items-center justify-center h-full animate-in fade-in slide-in-from-bottom-4 duration-700'>
                        <EmptyState selectedQuestion={(question: string) => {
                            setUserInput(question);
                            // Optionally auto-send here if desired
                        }} />
                    </div>
                ) : (
                    <div className='space-y-6'>
                        {messageList.map((message, index) => (
                            <div
                                key={index}
                                className={`flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2 duration-400 ${message.role === 'user' ? 'justify-end' : 'justify-start'
                                    }`}
                            >
                                {message.role !== 'user' && (
                                    <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 shadow-sm'>
                                        <Bot className='w-5 h-5 text-primary' />
                                    </div>
                                )}

                                <div className={`max-w-[80%] md:max-w-[70%] p-4 rounded-2xl shadow-sm ${message.role === 'user'
                                        ? 'bg-primary text-primary-foreground rounded-tr-none'
                                        : 'bg-card border border-border rounded-tl-none'
                                    }`}>
                                    <div className='prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-muted prose-pre:text-muted-foreground'>
                                        <ReactMarkdown>
                                            {message.content}
                                        </ReactMarkdown>
                                    </div>
                                </div>

                                {message.role === 'user' && (
                                    <div className='w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 border border-border shadow-sm'>
                                        <User className='w-5 h-5 text-muted-foreground' />
                                    </div>
                                )}
                            </div>
                        ))}

                        {loading && (
                            <div className='flex items-start gap-4 animate-in fade-in duration-300'>
                                <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 shadow-sm'>
                                    <Bot className='w-5 h-5 text-primary' />
                                </div>
                                <div className='bg-card border border-border p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-3'>
                                    <LoaderCircle className='w-4 h-4 animate-spin text-primary' />
                                    <span className='text-sm text-muted-foreground font-medium'>Thinking...</span>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className='p-4 border-t bg-background/80 backdrop-blur-md sticky bottom-0'>
                <div className='relative max-w-4xl mx-auto'>
                    <Input
                        placeholder='Ask about your career, interviews, or skills...'
                        className='pr-14 py-6 rounded-2xl border-2 focus-visible:ring-primary/20 shadow-sm transition-all text-base'
                        value={userInput}
                        onChange={(event) => setUserInput(event.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={loading}
                    />
                    <Button
                        size="icon"
                        onClick={onSend}
                        disabled={loading || !userInput.trim()}
                        className='absolute right-2 top-1/2 -translate-y-1/2 rounded-xl transition-all active:scale-95'
                    >
                        {loading ? <LoaderCircle className='w-5 h-5 animate-spin' /> : <Send className='w-5 h-5' />}
                    </Button>
                </div>
                <p className='text-center text-[10px] text-muted-foreground mt-2 uppercase tracking-widest font-semibold'>
                    Your Personal AI Career Consultant
                </p>
            </div>

            <style jsx global>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    )
}

export default AiChat
