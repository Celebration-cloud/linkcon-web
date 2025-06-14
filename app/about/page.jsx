/* eslint-disable prettier/prettier */

/**
 * Metadata for SEO and social sharing.
 * Contains page title, description, keywords, OpenGraph, Twitter, and robots settings.
 */
export const metadata = {
  title: "About Us | Aman Enterprises",
  description:
    "Learn about Aman Enterprises, a leading manufacturer and distributor of premium quality cotton, canvas, jute, and denim bags and pouches since 2003. Discover our commitment to quality, sustainability, and customer satisfaction.",
  keywords: [
    "Aman Enterprises",
    "About Us",
    "cotton bags",
    "canvas bags",
    "jute bags",
    "denim pouches",
    "bag manufacturer",
    "eco-friendly bags",
    "bulk orders",
    "Ghaziabad",
    "Uttar Pradesh",
    "sustainable business",
    "premium bags",
    "Indian manufacturer",
  ],
  openGraph: {
    title: "About Us",
    description:
      "Aman Enterprises has been a cornerstone in the manufacturing and distribution of premium quality bags and pouches since 2003. Learn more about our story, values, and commitment to sustainability.",
    url: "https://yourdomain.com/about", 
    siteName: "Aman Enterprises",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/og-image-about.png", 
        width: 1200,
        height: 630,
        alt: "Aman Enterprises About Us",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Aman Enterprises",
    description:
      "Discover Aman Enterprises' journey in crafting premium quality bags and pouches with a focus on sustainability and customer satisfaction.",
    images: ["https://yourdomain.com/og-image-about.png"], 
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Static content for About Us section
const aboutUsPoints = [
  "Established in 2003, Aman Enterprises has been a cornerstone in the manufacturing and distribution of premium quality bags and pouches.",
  "Nestled within the industrious landscape of Uttar Pradesh State Industrial Development Corporation, Ghaziabad, Uttar Pradesh, our journey began with a vision to blend tradition with modernity, offering products that resonate with our customers' diverse needs.",
  "At Aman Enterprises, we take pride in our extensive range of offerings, including cotton bags, canvas, jute, denim pouches, and more. Our commitment to quality craftsmanship and attention to detail sets us apart in the industry.",
  "Each product is meticulously crafted to meet the highest standards of durability, functionality, and style.",
  "With years of experience and expertise, we have cultivated strong relationships with our customers, both individuals and organizations alike.",
  "We understand the unique requirements of our clients, which is why we offer the flexibility of bulk orders for organizations seeking high-quality bags and pouches for their various needs.",
  "Our dedication to customer satisfaction drives us to continuously innovate and improve our products and services.",
  "Whether you're an individual looking for eco-friendly bags or an organization in need of bulk purchases, Aman Enterprises is your reliable partner every step of the way.",
  "As a proud member of the community, we are committed to sustainability and ethical business practices. We strive to minimize our environmental footprint and contribute positively to society through our operations.",
];

/**
 * About Us Page Component
 * Displays company history, mission, values, and key information.
 *
 * @returns JSX.Element
 */
export default function Page() {
  return (
    <section className="space-y-2 py-3 px-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800">About Us</h2>
      <article>
        <ol className="list-disc ml-6 md:ml-10 space-y-2 text-gray-700">
          {aboutUsPoints.map((point, index) => (
            <li dangerouslySetInnerHTML={{ __html: point }} key={index} />
          ))}
        </ol>
      </article>
    </section>
  );
}