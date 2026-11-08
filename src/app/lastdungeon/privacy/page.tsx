import type { Metadata } from "next";
import { LegalPage } from "@/components/lastdungeon/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Vinpix Studio collects, uses and shares information when you play The Last Dungeon.",
  alternates: { canonical: "/privacy" },
};

const SUPPORT = "kietle@vinpixstudio.com";

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      meta="The Last Dungeon · Effective date: 8 November 2026"
    >
      <p>
        This Privacy Policy explains how CÔNG TY TNHH VINPIX (&quot;Vinpix
        Studio&quot;, &quot;we&quot;, &quot;us&quot;), Tax ID 0319239233, Số 13,
        Đường CN6, Phường Tây Thạnh, Thành phố Hồ Chí Minh, Việt Nam, collects,
        uses and shares information when you play The Last Dungeon (the
        &quot;Game&quot;) on iOS and Android. By using the Game you acknowledge
        this Policy. Our{" "}
        <a href="https://vinpixstudio.com/eula.html">End User License Agreement</a>{" "}
        is separate.
      </p>

      <h2>1. Information we collect</h2>
      <ul>
        <li>
          <strong>Account information.</strong> If you create or sign in to an
          account, we process your email address and, if you choose Facebook
          login, the identifier and basic profile data Facebook shares with us.
          You can also play as a guest, in which case we create a random player
          ID.
        </li>
        <li>
          <strong>Game data.</strong> Player ID, display name, progress,
          inventory, in-game purchases and rewards, leaderboard scores and cloud
          save (checkpoint) data, so that progress can be restored and
          leaderboards work.
        </li>
        <li>
          <strong>Multiplayer data.</strong> When you play online, our
          multiplayer providers process your player/session identifiers, display
          name, in-game actions and network information (such as IP address)
          needed to connect you to other players.
        </li>
        <li>
          <strong>Device and usage data (statistics).</strong> Device model,
          operating system, CPU architecture, memory and storage size, app
          version, language, graphics quality, frame rate and network latency,
          session information, and gameplay events (for example levels started
          and finished, bosses, items and upgrades chosen, in-game currency
          earned and spent, ads shown, settings changed, errors). Events carry
          numbers, categories and short codes. They do not contain your name,
          email, text you type, chat messages or gift codes.
        </li>
        <li>
          <strong>Crash reports.</strong> If the Game crashes, we receive the
          stack trace, the state of the app at that moment (current screen,
          whether a run was open, names of the most recent game events), device
          details and installation identifiers (Firebase Crashlytics).
        </li>
        <li>
          <strong>Identifiers for statistics.</strong> A Firebase app-instance
          ID and, if you have a game account, a one-way hash (SHA-256 with an
          app-specific secret salt) of your player ID. The hash does not
          contain your name, email or player ID, but it is a pseudonymous
          identifier linked to you.
        </li>
        <li>
          <strong>Advertising data.</strong> Advertising identifier (Google
          Advertising ID / Apple IDFA where you permit it), approximate
          location derived from IP address, and ad interaction data, processed
          by our advertising partners.
        </li>
        <li>
          <strong>Purchase data.</strong> Purchases are processed by Apple or
          Google. We receive purchase receipts/transaction identifiers, not
          your payment card details.
        </li>
        <li>
          <strong>Support communications.</strong> Anything you send us when you
          contact support.
        </li>
      </ul>
      <p>
        We do not knowingly collect precise location, contacts, photos or
        microphone recordings. (In online co-op, voice chat uses your
        microphone only while you are in a voice session, and audio is relayed
        between players, not stored by us.)
      </p>

      <h2>2. How we use information</h2>
      <ul>
        <li>
          To provide and operate the Game, including accounts, cloud saves,
          multiplayer and leaderboards.
        </li>
        <li>
          To process purchases and restore them, and to prevent fraud, cheating
          and abuse.
        </li>
        <li>To show advertising, including rewarded ads, and to measure ad performance.</li>
        <li>
          To analyze and improve gameplay balance, stability and performance,
          and to find and fix crashes.
        </li>
        <li>To respond to support requests and to comply with legal obligations.</li>
      </ul>

      <h2>3. Service providers and third-party SDKs</h2>
      <p>
        We share information with providers that process it on our behalf or
        under their own privacy policies:
      </p>
      <table>
        <thead>
          <tr>
            <th>Provider</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Google Analytics for Firebase (Google LLC)</td>
            <td>Statistics about gameplay, performance and diagnostics</td>
          </tr>
          <tr>
            <td>Firebase Crashlytics (Google LLC)</td>
            <td>Crash reports</td>
          </tr>
          <tr>
            <td>Google BigQuery (Google LLC)</td>
            <td>
              Storage and analysis of the statistics events (data location:
              United States)
            </td>
          </tr>
          <tr>
            <td>
              Google Firebase (Authentication, Realtime Database, Firestore,
              Cloud Functions)
            </td>
            <td>Authentication, game data storage, backend logic</td>
          </tr>
          <tr>
            <td>Amazon Web Services (incl. Amazon Cognito)</td>
            <td>Account sign-up/sign-in, cloud saves, leaderboards</td>
          </tr>
          <tr>
            <td>Facebook (Meta)</td>
            <td>Optional Facebook login</td>
          </tr>
          <tr>
            <td>Epic Online Services; Photon</td>
            <td>Multiplayer connectivity, matchmaking and voice</td>
          </tr>
          <tr>
            <td>
              Unity LevelPlay (ironSource) and its mediated ad networks; Google
              AdMob / User Messaging Platform
            </td>
            <td>Advertising and consent management</td>
          </tr>
          <tr>
            <td>Unity Gaming Services (Analytics, In-App Purchasing)</td>
            <td>Analytics and purchase handling</td>
          </tr>
          <tr>
            <td>Apple App Store; Google Play</td>
            <td>Distribution and payment processing</td>
          </tr>
        </tbody>
      </table>
      <p>
        We may also disclose information if required by law, to protect rights
        and safety, or in connection with a merger or sale of our business. We
        do not sell your personal information for money.
      </p>

      <h2>4. Your choices: statistics, crash reports and advertising</h2>
      <ul>
        <li>
          <strong>Statistics and crash reports.</strong> Nothing is sent before
          you accept the EULA. Where consent is required (for example in the
          EEA, UK and some US states) the Game asks first and sends nothing
          unless you agree. You can switch both off at any time in{" "}
          <em>Settings &rsaquo; Share anonymous gameplay statistics</em>. When
          off, nothing is sent, data waiting on your device is deleted, and a
          crash report created meanwhile stays on your device and is sent only
          if you switch statistics on again.
        </li>
        <li>
          <strong>Advertising.</strong> Where required, the Game shows a consent
          form powered by Google&apos;s User Messaging Platform before ads
          load; the &quot;Ad privacy&quot; button in Settings lets you change
          your choice. On iOS, the Game asks for permission under Apple&apos;s
          App Tracking Transparency; if you decline, ads are not personalized
          using IDFA. You can also reset or limit your advertising identifier in
          your device settings (Settings &rsaquo; Privacy &rsaquo; Ads on
          Android; Settings &rsaquo; Privacy &amp; Security &rsaquo; Tracking on
          iOS).
        </li>
      </ul>

      <h2>5. International transfers</h2>
      <p>
        We and our providers operate globally, so your information may be
        processed in countries other than yours, including Vietnam, the United
        States and Singapore. We rely on appropriate safeguards where required
        by law.
      </p>

      <h2>6. Retention</h2>
      <ul>
        <li>
          Account and game data: while your account is active and for as long as
          needed to provide the Game. Guest data may be deleted after a period
          of inactivity.
        </li>
        <li>
          Statistics in Google Analytics for Firebase: 14 months. Raw
          statistics events copied to BigQuery: 120 days. Aggregated summaries
          that do not identify a player may be kept longer.
        </li>
        <li>Crash reports in Firebase Crashlytics: 90 days.</li>
        <li>
          Backup and log data is removed on a rolling schedule. Some records
          (such as purchase records) may be kept longer where law requires.
        </li>
      </ul>

      <h2>7. Your rights and data deletion</h2>
      <p>
        Depending on where you live, you may have the right to access, correct,
        delete or export your personal data, to object to or restrict certain
        processing, and to withdraw consent. To exercise these rights, or to
        request deletion of your account and associated data, follow the steps
        on our <a href="/delete-account">account deletion page</a> or email{" "}
        <a href={`mailto:${SUPPORT}`}>{SUPPORT}</a> from the address on your
        account, or include your player ID if you play as a guest. We will
        respond within a reasonable time and in any case within the period
        required by applicable law. You may also lodge a complaint with your
        local data-protection authority.
      </p>

      <h2>8. Children</h2>
      <p>
        The Game is not directed to children under 13 (or under 16 where local
        law sets a higher age) and we do not knowingly collect personal
        information from them. If you believe a child has provided us personal
        information, contact us and we will delete it.
      </p>

      <h2>9. Security</h2>
      <p>
        We use reasonable technical and organizational measures, such as
        encrypted connections and access controls, to protect your information.
        No method of transmission or storage is completely secure.
      </p>

      <h2>10. Changes to this Policy</h2>
      <p>
        We may update this Policy from time to time. The effective date above
        shows the latest version; material changes will be highlighted in the
        Game or on this page.
      </p>

      <h2>11. Contact</h2>
      <p>
        Vinpix Studio, Số 13, Đường CN6, Phường Tây Thạnh, Thành phố Hồ Chí
        Minh, Việt Nam ·{" "}
        <a href={`mailto:${SUPPORT}`}>{SUPPORT}</a>
      </p>
    </LegalPage>
  );
}
