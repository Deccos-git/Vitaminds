import Head from 'next/head'
import TopbarLanding from '../components/topbarLanding'
import styles from './index.module.css'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Vitaminds</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section id='page'>
          <TopbarLanding/>
          <div id={styles.landingContainer}>
          <div id={styles.heroContainer}>
            <div id={styles.titleContainer}>
              <h1>Online herstelcommunity</h1>
              <p>Voor en door ervaringsdeskundigen</p>
              <button>Aanmelden</button>
            </div>

          </div>
          </div>
        </section>
      </main>

    </div>
  )
}
