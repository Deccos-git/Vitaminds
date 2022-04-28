import styles from './topbarLanding.module.css'
import Image from 'next/image'
import Logo from '../images/logo.png'

const topbarLanding = () => {

  return (
    <div id={styles.topbarLandingContainer}>
      <Image
      src={Logo}
      height={50} 
      width={50} 
      alt="Logo Vitaminds"
      />
      <button id={styles.topbarButton}>Inloggen</button>
    </div>
  )
}

export default topbarLanding