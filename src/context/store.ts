import { StoryObj } from './../components/Carousel/Carousel'
import create from 'zustand'

const initialState = {
  fetchContentUUIDResponse: null,
  storyData: {} as { [key: string]: StoryObj },
}

const useStore = create<AxiosTestStore>((set) => ({
  ...initialState,
  setFetchContentUUIDResponse: (response: FetchContentUUIDResponse) =>
    set({
      fetchContentUUIDResponse: response,
    }),
  setStoryData: (story: StoryObj) =>
    set((state) => {
      return {
        storyData: {
          ...state.storyData,
          [story.id]: story,
        },
      }
    }),
}))

interface AxiosTestStore {
  fetchContentUUIDResponse: FetchContentUUIDResponse | null
  storyData: { [key: string]: StoryObj }
  setFetchContentUUIDResponse: (response: FetchContentUUIDResponse) => void
  setStoryData: (story: StoryObj) => void
}

export interface FetchContentUUIDResponse {
  count: number
  next: string
  previous: string | null
  results: string[]
}

export default useStore
