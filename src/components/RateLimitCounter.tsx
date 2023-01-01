import React from 'react'
import useRateLimit from '../queries/useRateLimit'
import { useRouter } from 'next/router';

const RateLimitCounter = () => {
    const router = useRouter()
    const { id } = router.query
    const { data, isLoading } = useRateLimit(id as string)
    return (
        <div className="fixed top-0 left-0 text-slate-500 p-4">
            {
                isLoading ? (
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-slate-500"></div>
                ) : (
                    <>
                        <p className="text-lg">
                            {data?.rate?.remaining}
                            /
                            {data?.rate?.limit}
                        </p>
                        <small className="text-[10px]">
                            Requests left
                        </small>
                    </>
                )

            }
        </div>
    )
}

export default RateLimitCounter