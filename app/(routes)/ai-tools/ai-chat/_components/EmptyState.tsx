import React from 'react'
import { MessageSquare, Target, GraduationCap, Briefcase } from 'lucide-react'

const questionList = [
  {
    title: 'Skills Gap Analysis',
    desc: 'What skills do I need for a data analyst role?',
    icon: Target,
    color: 'text-blue-500'
  },
  {
    title: 'Career Switch',
    desc: 'How do I switch careers to UX design?',
    icon: Briefcase,
    color: 'text-purple-500'
  },
  {
    title: 'Interview Prep',
    desc: 'Common interview questions for Software Engineers?',
    icon: MessageSquare,
    color: 'text-green-500'
  },
  {
    title: 'Education Advice',
    desc: 'Are certifications worth it for Cloud Architects?',
    icon: GraduationCap,
    color: 'text-orange-500'
  }
]

const EmptyState = ({ selectedQuestion }: any) => {
  return (
    <div className='max-w-2xl w-full text-center'>
      <div className='mb-8'>
        <h2 className='font-bold text-3xl mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent'>
          How can I help you today?
        </h2>
        <p className='text-muted-foreground'>
          Your AI career companion for expert guidance and professional growth.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-left'>
        {questionList.map((item, index) => (
          <div
            key={index}
            onClick={() => selectedQuestion(item.desc)}
            className='p-4 border border-border bg-card rounded-xl hover:border-primary hover:shadow-md cursor-pointer transition-all active:scale-[0.98] group'
          >
            <div className='flex items-center gap-3 mb-2'>
              <item.icon className={`w-5 h-5 ${item.color}`} />
              <h3 className='font-semibold text-sm group-hover:text-primary transition-colors'>{item.title}</h3>
            </div>
            <p className='text-xs text-muted-foreground leading-relaxed'>
              "{item.desc}"
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EmptyState
