import { formatter } from "@/utils/formatter";
import { getBillionaires } from "../../services/billionaires";
import styles from "./page.module.css";
import Link from "next/link";

interface Billionaires {
  id: string;
  name: string;
  squareImage: string;
  netWorth: number;
  industries: string[];
}

export default async function Home() {
  const billionaires = await getBillionaires();

  return (
    <section className={styles.main}>
      <h1 className={styles.title}>Billionaires</h1>
      <ul className={styles.billionaires}>
        {billionaires.map((b: Billionaires) => (
          <Link href={`/person/${b.id}`} key={b.id}>
            <li className={styles.billionaire}>
              <img
                className={styles.thumbnail}
                src={
                  b.squareImage.includes("undefined")
                    ? "./no-image.png"
                    : b.squareImage
                }
                alt={b.id}
              />
              <div className={styles.metadata}>
                <p className={styles.name}>{b.name}</p>
                <p className={styles.info}>
                  {formatter(b.netWorth)} Billion / {b.industries}
                </p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </section>
  );
}
