"use client";

import { useRouter, useSearchParams } from "next/navigation";
import SearchField from "../SearchField/SearchField";

type Props = {
  basePath?: string; // чтобы был переиспользуемый
};

export default function NoticesFilters({ basePath = "/notices" }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("query") ?? "";

  const updateQuery = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    if (value) params.set("query", value);
    else params.delete("query");

    router.replace(`${basePath}?${params.toString()}`);
  };

  const submitSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    if (query) params.set("query", query);
    else params.delete("query");

    router.push(`${basePath}?${params.toString()}`);
  };

  return (
    <SearchField
      value={query}
      onChangeAction={updateQuery}
      onSubmitAction={submitSearch}
      placeholder="Search pets"
    />
  );
}
