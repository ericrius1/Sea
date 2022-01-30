import Instructions from '@/components/dom/Instructions'
import dynamic from 'next/dynamic'

const Dreams = dynamic(() => import('@/components/canvas/Dreams'), {
  ssr: false,
})

const DOM = () => {
  return (
    // Step 5 - delete Instructions components
    // <Instructions />
    <div>dream</div>
  )
}

const R3F = () => {
  return (
    <>
      <Dreams route='/' />
    </>
  )
}

const Page = () => {
  return (
    <>
      <DOM />
      <R3F r3f />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Dreams',
    },
  }
}
