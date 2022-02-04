import dynamic from 'next/dynamic'

const Sea = dynamic(() => import('@/components/canvas/Sea/Sea'), {
  ssr: false,
})

const DOM = () => {
  return (
    // Step 5 - delete Instructions components
    // <Instructions />
    <div>sea</div>
  )
}

const R3F = () => {
  return (
    <>
      <Sea route='/' />
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
      title: 'Sea',
    },
  }
}
