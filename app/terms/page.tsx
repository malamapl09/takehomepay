import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for TakeHomePay salary calculator.',
};

export default function TermsPage() {
  return (
    <div className="container py-8 md:py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <h2>Acceptance of Terms</h2>
        <p>
          By accessing and using TakeHomePay (&quot;the Service&quot;), you accept and agree to be
          bound by these Terms of Service. If you do not agree to these terms, please do
          not use the Service.
        </p>

        <h2>Description of Service</h2>
        <p>
          TakeHomePay provides a free online salary calculator that estimates take-home pay
          after federal and state taxes in the United States. The Service is provided for
          informational and educational purposes only.
        </p>

        <h2>Disclaimer of Accuracy</h2>
        <p>
          <strong>IMPORTANT:</strong> The calculations provided by this Service are estimates
          only and should not be relied upon for tax planning, financial decisions, or any
          other purpose requiring precise calculations.
        </p>
        <p>
          Tax laws are complex and subject to change. Our calculations:
        </p>
        <ul>
          <li>Are based on standard deductions only</li>
          <li>Do not account for itemized deductions</li>
          <li>Do not include tax credits</li>
          <li>May not reflect recent tax law changes</li>
          <li>Do not account for local taxes</li>
          <li>Are simplified estimates for educational purposes</li>
        </ul>

        <h2>Not Tax or Financial Advice</h2>
        <p>
          The Service does not provide tax, legal, or financial advice. Nothing on this
          website should be construed as tax, legal, or financial advice. Always consult
          with a qualified tax professional, CPA, or financial advisor for personalized
          guidance.
        </p>

        <h2>Use at Your Own Risk</h2>
        <p>
          You use the Service at your own risk. We make no warranties or representations
          about the accuracy, completeness, or reliability of the calculations or any
          other content on the Service.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, TakeHomePay and its owners, operators,
          and affiliates shall not be liable for any direct, indirect, incidental, special,
          consequential, or punitive damages arising from your use of the Service.
        </p>

        <h2>Intellectual Property</h2>
        <p>
          The Service and its original content, features, and functionality are owned by
          TakeHomePay and are protected by international copyright, trademark, and other
          intellectual property laws.
        </p>

        <h2>User Conduct</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Service for any unlawful purpose</li>
          <li>Attempt to gain unauthorized access to any part of the Service</li>
          <li>Interfere with or disrupt the Service</li>
          <li>Use automated systems to access the Service without permission</li>
        </ul>

        <h2>Modifications to Service</h2>
        <p>
          We reserve the right to modify or discontinue the Service at any time without
          notice. We shall not be liable to you or any third party for any modification,
          suspension, or discontinuance of the Service.
        </p>

        <h2>Changes to Terms</h2>
        <p>
          We may revise these Terms of Service at any time. By continuing to use the
          Service after changes become effective, you agree to be bound by the revised
          terms.
        </p>

        <h2>Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of
          the United States, without regard to its conflict of law provisions.
        </p>

        <h2>Contact</h2>
        <p>
          If you have questions about these Terms of Service, please contact us at
          terms@takehomepay.com.
        </p>
      </div>
    </div>
  );
}
