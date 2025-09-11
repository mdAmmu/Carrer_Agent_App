import { NextRequest } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";


export async function POST(req:NextRequest) {
    const FormData = await req.formData();
    const resumeFile: any = FormData.get('resumeFile');
    const recordId = FormData.get('recordId');

    const loader = new WebPDFLoader(resumeFile);
    const docs = await loader.load();
    console.log(docs[0])


    const arrayBuffer = await resumeFile.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
}