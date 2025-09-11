import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { File, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {v4 as uuidv4} from 'uuid'

const ResumeUploadDialog = ({ openResumeUpload, setOpenResumeDialog }: any) => {

    const [file,setFile] = useState<any>();
    const onFileChange=(event:any)=>{

        const file = event.target.file?.[0];
        if(file)
        {
            console.log(file.name);
            setFile(file);
        }
    }

    const onUploadAndAnalyzer = () => {
        const recordId = uuidv4();
        const formData = new FormData();
        formData.append('recordId',recordId);
        formData.append('resumeFile',file);
    }

    return (
        <Dialog open={openResumeUpload} onOpenChange={setOpenResumeDialog}>
            {/* <DialogTrigger>Open</DialogTrigger> */}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        <div>
                            <label htmlFor="resumeUpload" className='flex items-center flex-col justify-center
                             p-7 border border-dashed rounded-xl hover:bg-slate-100 cursor-pointer'>
                                <File className='h-10 w-10'/>
                                {file?
                                <h2 className='mt-3 text-blue-600'>{file.name}</h2>:
                                <h2 className='mt-3'>Click here to Upload PDF file</h2>}
                            </label>
                            <input type="file" id='resumeUpload' accept='application/pdf'  onChange={onFileChange} className='hidden'/>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant={'outline'}>Cancel</Button>
                    <Button disabled={!file} onClick={onUploadAndAnalyzer}><Sparkles/>Upload & Analyzer</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ResumeUploadDialog