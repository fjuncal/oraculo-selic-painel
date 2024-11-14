import Head from "next/head";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Oráculo SELIC</title>
        <meta name="description" content="Aplicação para gestão de mensagens" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <h1>Bem-vindo ao Oráculo Selic</h1>
        <p>Escolha uma opção no menu para começar.</p>
      </div>
    </>
  );
}
