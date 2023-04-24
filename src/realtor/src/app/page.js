import Head from 'next/head'

const stats = [
  { name: 'Total Subscribers', stat: '71,897' },
  { name: 'Avg. Open Rate', stat: '58.16%' },
  { name: 'Avg. Click Rate', stat: '24.57%' },
]

export default function Home() {
  return (
    <div>
    <Head>
      <title>Next.js TailwindCSS</title>
      <link rel="icon" href="/favicon.ico"/>
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
    </Head>

    <div className="container mx-auto">
      <h1 className="text-lg text-center m-4">TailwindUI/Next.js</h1>
      <p className="bg-green-600">This is a test of the tailwind next integration.</p>
    </div>
    <div>
      <h3 className="text-base font-semibold leading-6 text-gray-900">Last 30 days</h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div key={item.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{item.stat}</dd>
          </div>
        ))}
      </dl>
    </div>
  </div>
  )
}