"use client"
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'


const History = () => {
    const [userHistory, setUserHistory] = useState([]);
    return (
        <div>
            <section className="max-w-4xl mx-auto mt-12 px-6 text-center">
                <h2 className="text-xl font-semibold mb-4">Previous History</h2>
                <p className="text-sm text-gray-600 mb-6">
                    What You previously work on, You can find here
                </p>

                {userHistory?.length == 0 &&
                    <div className='flex flex-col items-center justify-center'>
                        <span className="text-yellow-500 text-4xl mb-3">💡</span>
                        <p className="text-gray-600 mb-4">You do Not Have any history</p>
                        <Button className='mt-10 item-center'>Explore AI Tools</Button>
                    </div>
                }



            </section>


        </div>
    )
}

export default History