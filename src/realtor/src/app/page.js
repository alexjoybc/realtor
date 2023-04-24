import Head from 'next/head'

export default function Home() {
  return (
    <div>
    <Head>
      <title>Next.js TailwindCSS</title>
      <link rel="icon" href="/favicon.ico"/>
    </Head>

    <div className="container mx-auto">
      <h1 className="text-lg text-center m-4">TailwindUI/Next.js</h1>
      <p className="bg-green-600">This is a test of the tailwind next integration.</p>
    </div>
  </div>
  )
}