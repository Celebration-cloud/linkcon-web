/* eslint-disable prettier/prettier */
export const metadata = {
  title: "Return and Refund Policy",
  description: "Descrição da página",
};

export default function refund() {
  return (
    <section className="space-y-5">
      <h1 className="text-4xl font-bold">Return and Refund Policy</h1>
      <div className="space-y-3">
        <h3 className="text-2xl font-semibold">Handcrafted Products</h3>
        <p>
          At Aman Enterprise, we take pride in offering handcrafted products,
          where slight differences in detailing may occur. These minor printing
          and weaving irregularities contribute to the uniqueness and beauty of
          each handcrafted bag and cannot be labeled as defects.
        </p>
      </div>
      <div className="space-y-3">
        <h3 className="text-2xl font-semibold">Color Fastness</h3>
        <p>
          We do not provide guarantees on color fastness. Natural colors, such
          as indigo, may bleed during the first wash. Therefore, we do not offer
          refunds or exchanges in such cases.
        </p>
      </div>
      <div className="space-y-3">
        <h3 className="text-2xl font-semibold">Care Instructions</h3>
        <p>
          Handmade bags require special care to preserve their beauty and
          strength. We recommend reading our instruction manual for washing and
          care before using the bags. Requests for bag replacement or refund
          will not be considered valid if incorrect washing and caring methods
          cause damage.
        </p>
      </div>
      <div className="space-y-3">
        <h3 className="text-2xl font-semibold">Customer Satisfaction</h3>
        <p>
          Your satisfaction is of utmost importance to us. If you are not
          satisfied with your purchase, we are prepared to replace the product
          when the parameters of our return policy are met.
        </p>
      </div>
      <div className="space-y-3">
        <h3 className="text-2xl font-semibold">
          In the Uncommon Occurrence That
        </h3>
        <ol className="list-disc ml-10 space-y-2">
          <li>
            Wrong product has been delivered to you (i.e., the size or color
            differs from the option you selected).
          </li>
          <li>The product you have received is defective.</li>
          <li>
            Minor differences due to monitor settings should be measured as
            normal and are not subject to return.
          </li>
        </ol>
      </div>
      <div className="space-y-3">
        <h3 className="text-2xl font-semibold">Steps to Notify Us</h3>
        <p>Please notify us immediately by following the steps below:</p>
        <ol className="list-disc ml-10 space-y-2">
          <li>
            Send an email to $info@oxabags.com along with a photo of the damaged
            product.
          </li>
          <li>
            A Returns and Exchanges form is also required with necessary
            information. (To download a form click here)
          </li>
        </ol>
      </div>
      <div className="space-y-3">
        <h3 className="text-2xl font-semibold">Return Procedure</h3>
        <ol className="list-disc ml-10 space-y-2">
          <li>
            Goods are returnable within 48 hours of receiving, provided they
            contain the original tags and sales invoice and are in unused
            condition.
          </li>
          <li>
            Choose any trusted courier service or place a pickup request with
            our courier partner. Our team will coordinate the process if the
            service is available in your area.
          </li>
          <li>
            Safely package the return packets to eliminate chances of further
            damage during transit. Refunds and replacements will be void on
            arrival of damaged products.
          </li>
        </ol>
      </div>
      <div className="space-y-3">
        <h3 className="text-2xl font-semibold">After Receiving the Package</h3>
        <p>
          Our team will decide whether the product is eligible for refunds or
          replacement and inform you via email.
        </p>
        <ol className="list-disc ml-10 space-y-2">
          <li>
            If eligible for return, the item will be replaced free of cost
            (subject to availability), or the cost of the goods (excluding
            freight charges) will be refunded to the credit/debit card used for
            purchasing.
          </li>
          <li>
            Freight charges for returning the goods will be deducted based on
            our predetermined tariff, depending on your location. If our courier
            partner is involved, no additional payments are required for the
            service.
          </li>
          <li>
            If the product is deemed unfit for return, goods will be delivered
            back to you.
          </li>
        </ol>
      </div>
      <div className="space-y-3">
        <h3 className="text-2xl font-semibold">Processing Time</h3>
        <p>
          It may take up to 10 days from our end to process and close a
          refund/replacement issue.
        </p>
        <p>
          Allow one billing cycle for credits issued to your debit/credit card
          to appear on your statement.
        </p>
        <p>
          The issuing bank manages the cardholder's account. We are not
          responsible for any delays in the amount being credited to a bank
          account. The time taken for the refund to appear on the cardholder's
          account may vary depending on the bank.
        </p>
      </div>
    </section>
  );
}
