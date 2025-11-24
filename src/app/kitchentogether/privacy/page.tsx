export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-20 px-6 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-center text-5xl font-bold tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-4 text-center text-lg opacity-80">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="mt-10 space-y-8 text-base sm:text-lg leading-relaxed">
          <section>
            <h2 className="text-3xl font-semibold tracking-tight mb-4">
              Introduction
            </h2>
            <p className="opacity-90">
              KitchenTogether (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting
              your privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you use our
              application and services.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold tracking-tight mb-4">
              Information We Collect
            </h2>
            <div className="space-y-4 opacity-90">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Personal Information
                </h3>
                <p>
                  We may collect personal information that you provide directly
                  to us, including but not limited to:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Name and contact information</li>
                  <li>Email address</li>
                  <li>Profile information</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Usage Information
                </h3>
                <p>
                  We automatically collect certain information about your device
                  and how you interact with our services, including:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Device information and identifiers</li>
                  <li>Log data and usage patterns</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold tracking-tight mb-4">
              How We Use Your Information
            </h2>
            <p className="opacity-90 mb-3">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside space-y-2 opacity-90 ml-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, prevent, and address technical issues</li>
              <li>Personalize your experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-semibold tracking-tight mb-4">
              Information Sharing and Disclosure
            </h2>
            <div className="space-y-4 opacity-90">
              <p>
                We do not sell, trade, or rent your personal information to
                third parties. We may share your information only in the
                following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Service Providers:</strong> We may share information
                  with third-party service providers who perform services on our
                  behalf
                </li>
                <li>
                  <strong>Legal Requirements:</strong> We may disclose
                  information if required by law or in response to valid legal
                  requests
                </li>
                <li>
                  <strong>Business Transfers:</strong> Information may be
                  transferred in connection with a merger, sale, or other
                  business transaction
                </li>
                <li>
                  <strong>With Your Consent:</strong> We may share information
                  with your explicit consent
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold tracking-tight mb-4">
              Data Security
            </h2>
            <p className="opacity-90">
              We implement appropriate technical and organizational security
              measures to protect your personal information. However, no method
              of transmission over the internet or electronic storage is 100%
              secure. While we strive to use commercially acceptable means to
              protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold tracking-tight mb-4">
              Your Rights and Choices
            </h2>
            <p className="opacity-90 mb-3">
              Depending on your location, you may have certain rights regarding
              your personal information, including:
            </p>
            <ul className="list-disc list-inside space-y-2 opacity-90 ml-4">
              <li>The right to access your personal information</li>
              <li>The right to correct inaccurate information</li>
              <li>The right to delete your information</li>
              <li>The right to restrict or object to processing</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
            <p className="opacity-90 mt-4">
              To exercise these rights, please contact us using the information
              provided below.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold tracking-tight mb-4">
              Cookies and Tracking Technologies
            </h2>
            <p className="opacity-90">
              We use cookies and similar tracking technologies to track activity
              on our services and hold certain information. You can instruct your
              browser to refuse all cookies or to indicate when a cookie is
              being sent. However, if you do not accept cookies, you may not be
              able to use some portions of our services.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold tracking-tight mb-4">
              Children&apos;s Privacy
            </h2>
            <p className="opacity-90">
              Our services are not intended for children under the age of 13. We
              do not knowingly collect personal information from children under
              13. If you are a parent or guardian and believe your child has
              provided us with personal information, please contact us
              immediately.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold tracking-tight mb-4">
              Changes to This Privacy Policy
            </h2>
            <p className="opacity-90">
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the &quot;Last updated&quot; date. You are advised to review
              this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold tracking-tight mb-4">
              Contact Us
            </h2>
            <p className="opacity-90">
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <div className="mt-4 space-y-2 opacity-90">
              <p>
                <span className="font-semibold">Email:</span> kiet57441@gmail.com
              </p>
              <p>
                <span className="font-semibold">Twitter:</span> @QucKiet
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
