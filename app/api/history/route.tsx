import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { HistoryTable } from "@/configs/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import { usersTable } from "@/configs/schema";

export async function POST(req: any) {
    const { recordId, content, aiAgentType } = await req.json();
    const user = await currentUser();
    const email = user?.primaryEmailAddress?.emailAddress;

    console.log("History POST Request:", { recordId, aiAgentType, userEmail: email });

    if (!email) {
        return NextResponse.json({ error: "User email not found" }, { status: 401 });
    }

    try {
        // Ensure user exists in usersTable to satisfy foreign key constraint
        const existingUsers = await db.select().from(usersTable).where(eq(usersTable.email, email));
        if (existingUsers.length === 0) {
            console.log("User not found in DB, syncing now:", email);
            await db.insert(usersTable).values({
                name: user?.fullName ?? "User",
                email: email
            });
        }

        const result = await db.insert(HistoryTable).values({
            recordId: recordId,
            content: content,
            userEmail: email,
            createdAt: (new Date()).toString(),
            aiAgentType: aiAgentType
        });
        return NextResponse.json(result);
    } catch (e: any) {
        console.error("History POST Error:", e);
        return NextResponse.json({ error: e.message || "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req: any) {
    const { content, recordId } = await req.json();
    try {
        const result = await db.update(HistoryTable).set({
            content: content,

        }).where(eq(HistoryTable.recordId, recordId))

        return NextResponse.json(result)
    } catch (e) {
        return NextResponse.json(e)
    }

}

export async function GET(req: any) {
    const { searchParams } = new URL(req.url);
    const recordId = searchParams.get('recordId');
    try {
        if (recordId) {
            const result = await db.select().from(HistoryTable)
                .where(eq(HistoryTable.recordId, recordId));
            return NextResponse.json(result[0])
        }
        return NextResponse.json({})

    } catch (e) {
        return NextResponse.json(e)
    }
}