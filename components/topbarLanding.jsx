import styles from './topbarLanding.module.css'
import Image from 'next/image'

const topbarLanding = () => {

  return (
    <div id={styles.topbarLandingContainer}>
      <Image
      src="/../images/logo.png"
      height={100} 
      width={100} 
      alt="Logo Vitaminds"
      />
      <button>Inloggen</button>
    </div>
  )
}

export default topbarLanding