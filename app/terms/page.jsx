/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unescaped-entities */
export const metadata = {
  title: "Terms and Conditions",
  description: "Descrição da página",
};

export default function Page() {
  return (
    <div className="space-y-5 py-3">
      <h2 className="text-2xl font-bold">Terms Of Service</h2>
      <ol className="list-decimal space-y-5">
        <li className="text-xl font-semibold ml-5">Acceptance of Terms</li>
        <p>
          By accessing and using oxabags.com, you agree to comply with and be
          bound by these Terms of Service.
        </p>
        <li className="text-xl font-semibold ml-5">Use of the Service</li>
        <p>
          Our website and its content are intended solely for personal and
          non-commercial use. You may not use our website for any illegal or
          unauthorized purpose.
        </p>
        <li className="text-xl font-semibold ml-5">
          Intellectual Property Rights
        </li>
        <p>
          All content, trademarks, logos, and intellectual property displayed on
          oxabags.com are the property of Aman Enterprise. You may not use,
          reproduce, or distribute any content from our website without prior
          written permission.
        </p>
        <li className="text-xl font-semibold ml-5">Payment Processing</li>
        <div className="space-y-3">
          <p>
            We utilize Razorpay, a third-party payment gateway, for processing
            payments on our website. By making a purchase through oxabags.com,
            you agree to abide by Razorpay's terms and conditions.
          </p>
          <p>
            Aman Enterprise shall not be liable for any issues, disputes, or
            discrepancies arising from payment processing through Razorpay.
            Please refer to Razorpay's policies and procedures for more
            information.
          </p>
        </div>

        <li className="text-xl font-semibold ml-5">Limitation of Liability</li>
        <div className="space-y-3">
          <p>
            We strive to provide accurate and up-to-date information on our
            website. However, we do not guarantee the accuracy, completeness, or
            reliability of any content.
          </p>
          <p>
            Aman Enterprise shall not be liable for any direct, indirect,
            incidental, special, or consequential damages arising out of or in
            any way connected with the use of our website or services.
          </p>
        </div>
      </ol>
    </div>
  );
}
