import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ChainCard from '../components/ChainCard'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

export default function Home({ chainData }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>ChainovaX - All Chain Data</title>
        <meta name="description" content="Comprehensive blockchain data from all chains" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to ChainovaX
        </h1>

        <p className={styles.description}>
          Your gateway to blockchain data across all chains
        </p>

        <div className={styles.grid}>
          {chainData.map((chain, index) => (
            <ChainCard key={index} chain={chain.name} data={chain.data} />
          ))}
        </div>

        <div className={styles.chart}>
          <h2>Latest Block Heights</h2>
          <BarChart width={600} height={300} data={chainData.map(c => ({ name: c.name, height: c.data.latestBlock }))}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="height" fill="#8884d8" />
          </BarChart>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Next.js
        </a>
      </footer>
    </div>
  )
}

export async function getServerSideProps() {
  // Fetch data from APIs
  const chains = [
    { name: 'Ethereum', api: 'https://api.blockcypher.com/v1/eth/main' },
    { name: 'Bitcoin', api: 'https://api.blockcypher.com/v1/btc/main' },
    { name: 'Litecoin', api: 'https://api.blockcypher.com/v1/ltc/main' },
    { name: 'Dash', api: 'https://api.blockcypher.com/v1/dash/main' },
    // Add more chains as needed
  ]

  const chainData = await Promise.all(
    chains.map(async (chain) => {
      try {
        const res = await fetch(chain.api)
        const data = await res.json()
        return {
          name: chain.name,
          data: {
            latestBlock: data.height || data.latestBlock,
            transactions: data.unconfirmed_count || data.txCount,
            gasPrice: data.gasPrice || 'N/A'
          }
        }
      } catch (error) {
        return {
          name: chain.name,
          data: { latestBlock: 'Error', transactions: 'Error', gasPrice: 'Error' }
        }
      }
    })
  )

  return {
    props: {
      chainData,
    },
  }
}