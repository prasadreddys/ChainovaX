import styles from '../styles/ChainCard.module.css'

export default function ChainCard({ chain, data }) {
  return (
    <div className={styles.card}>
      <h2>{chain}</h2>
      <p>Latest Block: {data?.latestBlock || 'Loading...'}</p>
      <p>Transactions: {data?.transactions || 'Loading...'}</p>
      <p>Gas Price: {data?.gasPrice || 'N/A'}</p>
    </div>
  )
}