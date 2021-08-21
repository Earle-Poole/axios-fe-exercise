import { useCallback, useEffect, useState } from 'react'
// @ts-ignore
import useStore, { FetchContentUUIDResponse } from '../context/store.ts'

export const useCheckMobileDevice = () => {
  const [deviceWidth, setDeviceWidth] = useState<number>()

  useEffect(() => {
    const handleWindowSizeChange = () => {
      setDeviceWidth(window.innerWidth)
    }
    handleWindowSizeChange()
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  return deviceWidth <= 980
}

export const useFetchAxiosUUIDs = () => {
  const setFetchContentUUIDResponse = useStore((store) => store.setFetchContentUUIDResponse)
  const url = 'https://api.axios.com/api/render/stream/content/'

  return useCallback(async () => {
    const response = await fetch(url)
    if (response.ok) {
      const responseJSON = (await response.json()) as FetchContentUUIDResponse
      setFetchContentUUIDResponse(responseJSON)
      return responseJSON
    }
  }, [setFetchContentUUIDResponse])
}

export const useFetchAxiosContentByUUID = () => {
  const setStoryData = useStore((store) => store.setStoryData)

  return useCallback(
    async (UUID: string) => {
      const url = `https://api.axios.com/api/render/content/${UUID}/`
      const response = await fetch(url)
      if (response.ok) {
        const responseJSON = (await response.json()) as {}
        setStoryData(responseJSON)
        return responseJSON
      }
    },
    [setStoryData]
  )
}
