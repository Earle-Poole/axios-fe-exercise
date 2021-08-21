import {
  useCheckMobileDevice,
  useFetchAxiosContentByUUID,
  useFetchAxiosUUIDs,
} from '../utils/tacklebox.ts'
import Carousel from '../components/Carousel/Carousel.tsx'
import styled from 'styled-components'
import { useEffect } from 'react'
import useStore from '../context/store.ts'

// TODO
// Pagination functionality
// Testing

const Index = () => {
  const isMobileDevice = useCheckMobileDevice()
  const fetchContentUUIDResponse = useStore((store) => store.fetchContentUUIDResponse)
  const fetchUUIDs = useFetchAxiosUUIDs()
  const fetchContentByUUID = useFetchAxiosContentByUUID()

  useEffect(() => {
    const fn = async () => {
      // can assign to variable for immediate access to response
      await fetchUUIDs()
    }
    fn()
  }, [fetchUUIDs])

  useEffect(() => {
    if (fetchContentUUIDResponse?.results) {
      const fn = () => {
        fetchContentUUIDResponse.results.forEach((UUID) => {
          fetchContentByUUID(UUID)
        })
      }
      fn()
    }
  }, [fetchContentByUUID, fetchContentUUIDResponse])

  return (
    <Wrapper>
      <Header isMobile={isMobileDevice}>More from Axios.com</Header>
      {isMobileDevice ? (
        <MobileWrapper>
          <Carousel isMobile />
        </MobileWrapper>
      ) : (
        <DesktopWrapper>
          <Carousel />
        </DesktopWrapper>
      )}
      <VisitAxios onClick={() => window.open('https://www.axios.com/')} isMobile={isMobileDevice}>
        Visit Axios.com ⟶
      </VisitAxios>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: Helvetica, Arial;
`
const Header = styled.h1.attrs((props) => ({
  style: props.isMobile
    ? {
        fontSize: '32px',
        color: '#333335',
        fontWeight: 400,
        fontFamily: 'NB',
      }
    : {
        fontSize: '48px',
        color: '#333335',
        fontWeight: 400,
      },
}))``
const VisitAxios = styled.button.attrs((props) => ({
  style: props.isMobile
    ? {
        width: 'calc(100% - 150px)',
        margin: '15px auto',
      }
    : {
        position: 'absolute',
        right: '50px',
        top: '20px',
        width: '187px',
      },
}))`
  height: 40px;
  cursor: pointer;
  color: white;
  background: #2257da;
  border-radius: 6px;
`

const MobileWrapper = styled.section`
  display: flex;
  align-items: center;
  min-width: 375px;
  max-width: 980px;
  min-height: 243px;
`
const DesktopWrapper = styled.section`
  display: flex;
  align-items: center;
  margin: 0 1px;
`
export default Index
