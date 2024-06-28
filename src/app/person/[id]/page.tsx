import { getBillionaire } from "@/services/billionaires";
import styles from "./page.module.css";
import { formatter } from "@/utils/formatter";

interface Params {
  params: {
    id: string;
  };
}

interface FinancialAsset {
  exchange: string;
  ticker: string;
  exerciseOptionPrice?: number;
  numberOfShares: number;
}

interface Billionaire {
  id: string;
  state: string;
  city: string;
  name: string;
  country: string;
  position: number;
  industries: string[];
  financialAssets: FinancialAsset[];
  thumbnail: string;
  squareImage: string;
  bio: string[];
  about: string[];
  netWorth: number;
}

export default async function Billionaire({ params: { id } }: Params) {
  const {
    name,
    netWorth,
    country,
    industries,
    squareImage,
    bio,
    financialAssets,
  }: Billionaire = await getBillionaire(id);

  return (
    <section className={styles.container}>
      <article className={styles.person}>
        <img src={squareImage} alt={name} className={styles.thumbnail} />
        <div className={styles.info}>
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.networth}>
            <span className={styles.title}>Networth:&nbsp;</span>
            {formatter(netWorth)} Billion
          </p>
          <p className={styles.country}>
            <span className={styles.title}>Country:&nbsp;</span>
            {country}
          </p>
          <p className={styles.industries}>
            <span className={styles.title}>Industry:&nbsp;</span>
            {industries.map((industry, index) => (
              <span className={styles.industry} key={index}>
                {industry}
              </span>
            ))}
          </p>
          {bio.map((b, index) => (
            <span className={styles.bio} key={index}>
              {b}
            </span>
          ))}
        </div>
      </article>
      <article className={styles.tickers}>
        <h2 className={styles.financial_title}>Financial Assets</h2>
        <div className={styles.assets_container}>
          {financialAssets ? (
            financialAssets.map(
              ({ ticker, numberOfShares, exerciseOptionPrice }, index) => (
                <div key={index} className={styles.assets}>
                  <p>Ticker: {ticker}</p>
                  <p>Shares: {numberOfShares.toLocaleString()}</p>
                  {exerciseOptionPrice && (
                    <p>
                      Exersie Price: ＄{exerciseOptionPrice.toLocaleString()}
                    </p>
                  )}
                </div>
              )
            )
          ) : (
            <p className={styles.noprovide}>Not Provided</p>
          )}
        </div>
      </article>
    </section>
  );
}
