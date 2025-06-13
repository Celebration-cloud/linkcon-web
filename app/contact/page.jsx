/* eslint-disable prettier/prettier */

import {ContactTable} from "@/components/contactTable"

export const metadata = {
  title: "Contact Us",
  description: "Descrição da página",
};

export default function Page() {
  return (
    <div className="py-3">
      <p className="text-2xl font-bold">Contact Us</p>
      <ContactTable />
    </div>
  );
}
