import Head from 'next/head'
import TopbarLanding from '../components/topbarLanding'
import styles from './index.module.css'
import Image from 'next/image'
import macBookMockup from '../images/MacBookAir.png'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Vitaminds</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
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
            <div className={styles.sectionContainer}>
              <div className={styles.imageContainer}>
                <Image
                    src={macBookMockup}
                    height={260} 
                    width={450} 
                    alt="MacBook air Vitaminds community mockup"
                  />
              </div>
                <div className={styles.textContainer}>
                  <h1>Deel, leer en groei samen</h1>
                  <p>Deel je ervaring, je doelen en obstakels met mensen die weten wat je meemaakt.</p>
                </div>
              </div>
          </div>
        </section>
      </main>

    </div>
  )
}
