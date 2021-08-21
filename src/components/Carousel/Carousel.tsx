import React, { useRef } from 'react'
import { IsMobileProps } from './Story'
// @ts-ignore
import Story from './Story.tsx'
import styled from 'styled-components'
// @ts-ignore
import useStore from '../../context/store.ts'

interface CarouselProps {
  stories: StoryObj[]
  isMobile: boolean
}

const Carousel = (props: CarouselProps) => {
  const storyData: { [key: string]: StoryObj } = useStore((store) => store.storyData)

  const arrowClickHandler = (direction: 'left' | 'right') => {
    const valueToScrollBy = window.innerWidth * 0.6666
    if (direction === 'left') {
      CarouselWrapperRef.current.scrollBy({ left: valueToScrollBy * -1, behavior: 'smooth' })
    } else {
      CarouselWrapperRef.current.scrollBy({ left: valueToScrollBy, behavior: 'smooth' })
    }
  }
  const CarouselWrapperRef = useRef<HTMLDivElement>(null!)

  return (
    <>
      <LeftArrow onClick={() => arrowClickHandler('left')}>{'‹'}</LeftArrow>
      <CarouselWrapper ref={CarouselWrapperRef} isMobile={props.isMobile}>
        {props.isMobile ? (
          <MobileWrapper>
            <CarouselBody>
              {Object.values(storyData).map((story) => (
                <Story key={story.id} story={story} isMobile={props.isMobile} />
              ))}
              {/* Pagination */}
            </CarouselBody>
          </MobileWrapper>
        ) : (
          <DesktopWrapper>
            <CarouselBody>
              {Object.values(storyData).map((story) => (
                <Story key={story.id} story={story} isMobile={props.isMobile} />
              ))}
              {/* Pagination */}
            </CarouselBody>
          </DesktopWrapper>
        )}
      </CarouselWrapper>
      <RightArrow onClick={() => arrowClickHandler('right')}>{'›'}</RightArrow>
    </>
  )
}

const CarouselWrapper = styled.div<IsMobileProps>`
  ${(props) => (props.isMobile ? `margin: 0 30px;` : ``)}
  &::-webkit-scrollbar {
    display: none;
  }
  position: relative;
  display: flex;
  overflow-x: scroll;
  padding: 5px;
`
const CarouselBody = styled.div`
  display: flex;
`
const Arrow = styled.div`
  user-select: none;
  font-size: 64px;
  cursor: pointer;
  color: #bababe;
`
const LeftArrow = styled(Arrow)`
  padding: 0 15px 0 10px;
`
const RightArrow = styled(Arrow)`
  padding: 0 10px 0 15px;
`

const MobileWrapper = styled.div`
  min-width: 375px;
  max-width: 980px;
  width: 100%;
  display: flex;
`

const DesktopWrapper = styled.div`
  min-width: 980px;
  width: 100%;
  display: flex;
`

export default Carousel

export interface StoryObj {
  id: string
  headline: string
  display_name: string
  sections: {
    name: string
  }[]
  primary_image: {
    base_image_url: string
  }
  published_date: string
  uuid: string
  permalink: string
}
