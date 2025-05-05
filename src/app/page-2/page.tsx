import { Metadata } from "next";

export const metadata: Metadata = {
  title: "page 2",
};

export default function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <div>My Page 2</div>;
}
