import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for TakeHomePay salary calculator.',
};

export default function PrivacyPage() {
  return (
    <div className="container py-8 md:py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <h2>Overview</h2>
        <p>
          TakeHomePay (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
          This Privacy Policy explains how we handle information when you use our salary
          calculator service.
        </p>

        <h2>Information We Collect</h2>
        <h3>Information You Provide</h3>
        <p>
          When you use our calculator, you may enter salary information, state selection,
          filing status, and other financial data. <strong>This information is processed
          entirely in your browser and is never transmitted to our servers.</strong>
        </p>

        <h3>Saved Calculations</h3>
        <p>
          If you save calculations, they are stored locally on your device using browser
          localStorage. We do not have access to this data.
        </p>

        <h3>Analytics</h3>
        <p>
          We may use analytics services (such as Google Analytics) to understand how visitors
          use our site. These services may collect:
        </p>
        <ul>
          <li>Pages visited and time spent on pages</li>
          <li>Browser type and operating system</li>
          <li>Approximate geographic location (country/city level)</li>
          <li>Referring website</li>
        </ul>

        <h2>How We Use Information</h2>
        <p>We use analytics data to:</p>
        <ul>
          <li>Improve our calculator and user experience</li>
          <li>Understand which features are most useful</li>
          <li>Fix bugs and technical issues</li>
        </ul>

        <h2>Data Security</h2>
        <p>
          Your financial data never leaves your browser. All calculations are performed
          client-side using JavaScript. We implement reasonable security measures to
          protect any data we do collect through analytics.
        </p>

        <h2>Third-Party Services</h2>
        <p>We may use third-party services for:</p>
        <ul>
          <li>Analytics (Google Analytics)</li>
          <li>Advertising (Google AdSense) - if enabled</li>
          <li>Hosting (Vercel)</li>
        </ul>

        <h2>Cookies</h2>
        <p>
          We may use cookies for analytics purposes. You can control cookies through your
          browser settings. Essential cookies may be required for the site to function properly.
        </p>

        <h2>Children&apos;s Privacy</h2>
        <p>
          Our service is not directed to children under 13. We do not knowingly collect
          personal information from children under 13.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any
          changes by posting the new Privacy Policy on this page.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, please contact us at
          privacy@takehomepay.com.
        </p>
      </div>
    </div>
  );
}
