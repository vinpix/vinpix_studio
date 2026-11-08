import type { Metadata } from "next";
import { LegalPage } from "@/components/lastdungeon/LegalPage";

export const metadata: Metadata = {
  title: "Delete your account",
  description:
    "How to ask Vinpix Studio to delete your The Last Dungeon account and the data linked to it.",
  alternates: { canonical: "/delete-account" },
};

const SUPPORT = "kietle@vinpixstudio.com";

export default function DeleteAccountPage() {
  const subject = encodeURIComponent("The Last Dungeon: delete my account");
  const body = encodeURIComponent(
    "Please delete my The Last Dungeon account and the data linked to it.\n\nPlayer ID (Settings, if you play as a guest): \nAccount email (if you have an account): \n"
  );
  return (
    <LegalPage
      title="Delete your account"
      meta="The Last Dungeon · Vinpix Studio"
    >
      <p>
        You can ask us to delete your The Last Dungeon account and the personal
        data linked to it at any time.
      </p>

      <h2>How to ask</h2>
      <ol>
        <li>
          In the Game open <em>Settings &rsaquo; Delete account</em>. It opens a
          ready-made email to our support, or write to us yourself.
        </li>
        <li>
          Send the email to{" "}
          <a href={`mailto:${SUPPORT}?subject=${subject}&body=${body}`}>
            {SUPPORT}
          </a>{" "}
          with the subject &quot;The Last Dungeon: delete my account&quot;.
        </li>
        <li>
          Write from the email address of your account. If you play as a guest
          (no account), include your player ID instead.
        </li>
      </ol>

      <h2>What we delete</h2>
      <ul>
        <li>
          Your account, display name, progress, inventory, cloud save and
          leaderboard entries.
        </li>
      </ul>

      <h2>What we may keep</h2>
      <ul>
        <li>
          Purchase records, where the law requires us to keep them (purchases are
          processed by Apple or Google).
        </li>
        <li>
          Backups and logs, which are removed on a rolling schedule.
        </li>
        <li>
          Statistics and crash reports already collected under a pseudonymous
          identifier (a one-way hash of your player ID, no name or email): they
          expire on their own after 14 months (Analytics), 120 days (BigQuery)
          and 90 days (Crashlytics), and aggregated summaries do not identify
          you.
        </li>
        <li>
          Ad-related data held by our advertising partners under their own
          policies: use your device&apos;s advertising settings to reset or limit
          it.
        </li>
      </ul>

      <div className="ld-legal-note">
        Deletion is permanent: your progress cannot be restored afterwards. We
        reply within a reasonable time and in any case within the period
        required by applicable law.
      </div>

      <h2>Stop statistics without deleting your account</h2>
      <p>
        Switch off <em>Settings &rsaquo; Share anonymous gameplay statistics</em>.
        The Game then stops sending statistics and crash reports and deletes
        the statistics data waiting on your device.
      </p>

      <p>
        See also our <a href="/privacy">Privacy Policy</a>.
      </p>
    </LegalPage>
  );
}
