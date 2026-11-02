import Image from "next/image";
import { Wordmark } from "@/components/Wordmark";
import { PosDemo } from "@/components/pos/PosDemo";

const PHONE = "98240 88989";
const PHONE_TEL = "tel:+9779824088989";
const EMAIL = "ujjwal.poudel.2003@gmail.com";

export default function Home() {
  return (
    <>
      <header className="nav">
        <div className="wrap">
          <a className="brand" href="#top" aria-label="eSahuji home">
            <Image src="/assets/icon-e-128.png" alt="" width={40} height={40} priority />
            <Wordmark />
          </a>
          <nav className="nav-links" aria-label="Sections">
            <a href="#billing">Billing</a>
            <a href="#udharo">Udharo</a>
            <a href="#owner">Owner app</a>
            <a href="#plan">Pricing</a>
          </nav>
          <a className="btn btn-blue" href="#demo">Book a demo</a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="wrap">
            <span className="tag-np">तपाईंको डिजिटल साहुजी</span>
            <h1>
              Run your shop.
              <br />
              <span>Not the hisab.</span>
            </h1>
            <p className="sub">Billing, udharo, stock and sales on one tablet, made for Nepali shops.</p>
            <div className="cta">
              <a className="btn btn-blue" href="#demo">Book a free demo</a>
              <a className="btn btn-line" href="#billing">See how it works</a>
            </div>
          </div>
          <div className="scene">
            <div className="greet">
              <div className="mascot">
                <Image src="/assets/icon-full-360.png" alt="The eSahuji sahuji mascot" width={360} height={360} priority />
              </div>
              <div className="bubble">नमस्ते! डिजिटल साहुजी ट्राई गर्नुहोस्।</div>
            </div>
            <PosDemo />
          </div>
          <div className="hero-foot" aria-hidden="true" />
        </section>

        <section className="band on-blue" aria-label="eSahuji in numbers">
          <div className="wrap stats">
            <div><b>18</b><span>best sellers, one tap away</span></div>
            <div><b>0</b><span>bills lost when the internet goes</span></div>
            <div><b>1</b><span>plan, tablet included</span></div>
          </div>
        </section>

        <section className="show">
          <div className="wrap">
            <div className="row" id="billing">
              <div className="copy">
                <span className="k">Fast 18</span>
                <h2>A bill in seconds.</h2>
                <p>Your 18 best sellers sit on the first screen. Tap, tap, done.</p>
              </div>
              <div className="art a-gold">
                <div className="timer">Fast 18</div>
                <Image className="crop" src="/assets/pos-fast18.webp" width={805} height={630} alt="The Fast 18 grid with the shop's best sellers" />
              </div>
            </div>

            <div className="row flip">
              <div className="copy">
                <span className="k">Cash and QR</span>
                <h2>Pay any way. Even both.</h2>
                <p>Part cash, the rest by QR or udharo. One bill, no maths.</p>
              </div>
              <div className="art a-blue">
                <Image className="panel" src="/assets/pos-cash-split.webp" width={420} height={800} alt="Cash screen: Rs 500 received, Rs 293 still to pay, rest by QR or udharo" />
              </div>
            </div>

            <div className="row" id="udharo">
              <div className="copy">
                <span className="k">Udharo</span>
                <h2>Your khata, digital.</h2>
                <p>Pick the customer, see the new balance, done. Know who owes what.</p>
              </div>
              <div className="art a-gold">
                <Image className="panel" src="/assets/pos-udharo.webp" width={420} height={800} alt="Udharo screen: pick a customer and see the new balance" />
                <span className="stamp" aria-hidden="true">उधारो</span>
              </div>
            </div>

            <div className="row flip" id="owner">
              <div className="copy">
                <span className="k">Owner app</span>
                <h2>Your shop, in your pocket.</h2>
                <p>Sales, best sellers, udharo and staff, live on your phone.</p>
              </div>
              <div className="art a-green">
                <div className="phone" role="img" aria-label="Owner app showing today's sales">
                  <div className="ps">
                    <div className="hd"><b>Namaste, Sahuji</b><span>Today</span></div>
                    <div className="bigv"><small>Sales today</small><b>Rs 18,420</b></div>
                    <svg className="spark" viewBox="0 0 260 84" preserveAspectRatio="none" aria-hidden="true">
                      <defs>
                        <linearGradient id="sg" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0" stopColor="var(--green)" stopOpacity=".3" />
                          <stop offset="1" stopColor="var(--green)" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0 66 L37 58 L74 63 L111 42 L148 48 L185 31 L222 36 L256 14 L256 84 L0 84Z" fill="url(#sg)" />
                      <path d="M0 66 L37 58 L74 63 L111 42 L148 48 L185 31 L222 36 L256 14" fill="none" stroke="var(--green)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
                      <circle cx="256" cy="14" r="5" fill="var(--green)" />
                    </svg>
                    <div className="mini"><div>Bills<b>63</b></div><div>Udharo out<b>Rs 2,830</b></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="also">
          <div className="wrap">
            <h2>And the rest, handled.</h2>
            <div className="three">
              <Feature title="Stock" text="Goes down with every sale. Low items warn you.">
                <path d="M21 8l-9-5-9 5 9 5 9-5z" /><path d="M3 8v8l9 5 9-5V8" /><path d="M12 13v8" />
              </Feature>
              <Feature title="Works offline" text="Keep selling. It syncs when the internet is back.">
                <path d="M2 8.5a15 15 0 0 1 20 0" /><path d="M5.5 12a10 10 0 0 1 13 0" /><path d="M9 15.5a5 5 0 0 1 6 0" /><circle cx="12" cy="19" r="1" />
              </Feature>
              <Feature title="Staff PINs" text="Each staff has a PIN. Big discounts need yours.">
                <rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </Feature>
            </div>
          </div>
        </section>

        <section className="plan" id="plan">
          <div className="wrap">
            <h2>Cheap. Affordable.<br />Tablet included.</h2>
            <p className="sub">One small monthly plan with everything your shop needs.</p>
            <ul className="incl">
              {["Tablet with POS app", "Owner phone app", "Billing and udharo", "Stock and insights", "Staff PINs", "Updates and support"].map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <a className="callp" href={PHONE_TEL}>
              <span>Call for price and information</span>
              <b>{PHONE}</b>
            </a>
          </div>
        </section>

        <section className="close on-blue" id="demo">
          <div className="wrap">
            <div className="face">
              <Image src="/assets/icon-full-360.png" alt="The eSahuji sahuji mascot" width={360} height={360} />
            </div>
            <div>
              <span className="np">तपाईंको डिजिटल साहुजी</span>
              <h2>Let&apos;s go digital.</h2>
              <p>Call us for the price and a free demo. We&apos;ll show you <Wordmark /> in your own shop.</p>
              <div className="cta">
                <a className="btn btn-w" href={PHONE_TEL}>Call {PHONE}</a>
                <a className="btn btn-o" href={`mailto:${EMAIL}`}>Email us</a>
              </div>
              <div className="contact">
                <span>+977 {PHONE}</span>
                <span>{EMAIL}</span>
                <span>Kathmandu, Nepal</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <a className="brand" href="#top">
            <Image src="/assets/icon-e-128.png" alt="" width={32} height={32} />
            <Wordmark />
          </a>
          <nav aria-label="Footer">
            <a href="#billing">Billing</a>
            <a href="#udharo">Udharo</a>
            <a href="#owner">Owner app</a>
            <a href="#plan">Pricing</a>
            <a href="#demo">Contact</a>
          </nav>
          <span>© 2026 <Wordmark />. Made in Nepal.</span>
        </div>
      </footer>
    </>
  );
}

function Feature({ title, text, children }: { title: string; text: string; children: React.ReactNode }) {
  return (
    <div>
      <span className="ic">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {children}
        </svg>
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
