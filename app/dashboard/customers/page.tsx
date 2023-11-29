import { lusitana } from "@/app/ui/fonts";
import { fetchCustomers, fetchFilteredCustomers } from "@/app/lib/data";
import { Metadata } from "next";
import { Suspense } from "react";
import { TableRowSkeleton } from "@/app/ui/skeletons";
import CustomersTable from "@/app/ui/customers/table";

export const metadata: Metadata = {
  title: "Customers",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const customers = await fetchCustomers();
  const filteredCustomers = await fetchFilteredCustomers(query);
  return (
    <div className="w-full">
      <Suspense fallback={<TableRowSkeleton />}>
        <CustomersTable customers={filteredCustomers} />
      </Suspense>
    </div>
  );
}
