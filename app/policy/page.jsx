/* eslint-disable prettier/prettier */
export const metadata = {
  title: "Privacy Policy",
  description: "Descrição da página",
};

export default function Page() {
  return (
    <div className="space-y-5">
      <h1 className="text-4xl font-bold">Privacy Policy</h1>
      <div className="space-y-3">
        <h3 className="text-2xl font-semibold">How We Use Your Information</h3>
        <p>
          We use the information we collect to process your orders, communicate
          with you about your purchases, provide customer support, and improve
          our products and services.
        </p>
        <p>
          We do not use your personal information for promotional email
          campaigns or direct marketing purposes.
        </p>
      </div>
      <div className="space-y-3">
        <h3 className="text-2xl font-semibold">
          Information Sharing and Disclosure
        </h3>
        <p>
          We use the information we collect to process your orders, communicate
          with you about your purchases, provide customer support, and improve
          our products and services.
        </p>
      </div>
      <div className="space-y-3">
        <h3 className="text-2xl font-semibold">Data Security</h3>
        <p>
          We use the information we collect to process your orders, communicate
          with you about your purchases, provide customer support, and improve
          our products and services.
        </p>
      </div>
    </div>
  );
}
