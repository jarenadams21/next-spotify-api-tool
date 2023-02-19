import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Spotify API Tool</title>
        <meta name="description" content="Generated for you" />
      </Head>
      <main>
    <h1>Content</h1>
    <p>More Content</p>
    <p>Changes</p>
    </main>
    </div>
  )
}
