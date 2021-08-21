import React from 'react'
import { StoryObj } from './Carousel'
import dayjs from 'dayjs'
import styled from 'styled-components'

const Story = (props: StoryProps) => {
  if (props.story) {
    return (
      <StoryWrapper isMobile={props.isMobile} onClick={() => window.open(props.story.permalink)}>
        {props.isMobile ? (
          <MobileImage src={props.story.primary_image.base_image_url} />
        ) : (
          <DesktopImage src={props.story.primary_image.base_image_url} />
        )}
        <SectionText isMobile={props.isMobile}>
          {!props.isMobile ? props.story.sections[0]?.name ?? '' : undefined}
        </SectionText>
        <HeadlineWrapper isMobile={props.isMobile}>{props.story.headline}</HeadlineWrapper>
        <PublishedDateWrapper>
          {dayjs(props.story.published_date).format('MMMM DD, YYYY')}
          {props.isMobile && props.story.sections[0]?.name
            ? ` - ${props.story.sections[0]?.name ?? ''}`
            : undefined}
          {!props.isMobile ? <GoDeeperLink>Go deeper ⟶</GoDeeperLink> : undefined}
        </PublishedDateWrapper>
      </StoryWrapper>
    )
  }
  return null
}

interface StoryProps {
  story: StoryObj
  isMobile: boolean
}

const StoryWrapper = styled.div<IsMobileProps>`
  width: ${(props) => (props.isMobile ? '218px' : '333px')};
  height: ${(props) => (props.isMobile ? '243px' : 'auto')};
  padding: ${(props) => (props.isMobile ? '0 10px' : '0 50px')};
  border-right: ${(props) => (!props.isMobile ? '1px solid #E9E9EE' : 'none')};
  &:last-of-type {
    border-right: none;
  }
  overflow: hidden;
  cursor: pointer;
`
const SectionText = styled.div<IsMobileProps>`
  height: ${(props) => (props.isMobile ? '0' : '14px')};
  margin: ${(props) => (props.isMobile ? 'unset' : '24px 0 0')};
  color: #ab7d36;
  font-size: 12px;
`

const DesktopImage = styled.img`
  width: 333px;
  height: 205px;
`
const MobileImage = styled.img`
  width: 218px;
  height: 134px;
`
const HeadlineWrapper = styled.div<IsMobileProps>`
  font-size: 18px;
  max-height: 63px;
  min-height: 63px;
  ${(props) =>
    props.isMobile
      ? `
    overflow: hidden;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    display: -webkit-box;
  `
      : ''}
  margin: 16px 0 12px;
  font-weight: normal;
  cursor: pointer;
`
const PublishedDateWrapper = styled.div`
  position: relative;
  display: flex;
  font-size: 12px;
  color: #656568;
`
const GoDeeperLink = styled.a`
  position: absolute;
  right: 0;
  bottom: 0;
  color: #2257da;
  font-size: 18px;
  font-weight: 400;
`

export default Story
export interface IsMobileProps {
  isMobile: boolean
}
