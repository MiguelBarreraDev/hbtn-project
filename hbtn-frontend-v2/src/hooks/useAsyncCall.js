import { useEffect, useState } from "react"

export default function useAsyncCall ({ load } = { load: false }) {
  const [loading, setLoading] = useState(load)
  let controller

  const callEndpoint = async (asyncCall) => {
    setLoading(true)
    controller = asyncCall.controller ?? null
    try {
      const result = await asyncCall()
      setLoading(false)
      return result?.data
    } catch {
      setLoading(false)
    }
  }

  const callAbort = () => {
    controller.abort()
  }

  useEffect(() => {
    return () => controller && callAbort()
  })

  return {
    callEndpoint,
    loading
  }
}
