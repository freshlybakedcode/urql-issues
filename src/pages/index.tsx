import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { CountryProvider, useCountryDetails } from '../providers/CountryContext';

const Home: NextPage = () => {
  const { emoji, currency } = useCountryDetails();
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Issues with URQL
        </h1>
        <p>{emoji.response.data?.country?.emoji}</p>
        <p>{currency.response.data?.country?.currency}</p>
      </main>
    </div>
  )
}

export default Home
