"use client";

import { useRouter, useSearchParams } from "next/navigation";
import SearchField from "../SearchField/SearchField";
import { useState, useEffect } from "react";
import Select from "react-select";
import { getCities } from "@/app/lib/api";

type Props = {
  basePath?: string;
};
type CityOption = {
  value: string;
  label: string;
};
const CATEGORIES = ["found", "free", "lost", "sell"];
const SEXES = ["female", "male", "multiple", "unknown"];
const SPECIES = [
  "dog",
  "cat",
  "monkey",
  "bird",
  "snake",
  "turtle",
  "lizard",
  "frog",
  "fish",
  "ants",
  "bees",
  "butterfly",
  "spider",
  "scorpion",
];

export default function NoticesFilters({ basePath = "/notices" }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("query") ?? "";
  const category = searchParams.get("category") ?? "";
  const sex = searchParams.get("sex") ?? "";
  const species = searchParams.get("species") ?? "";
  const sort = searchParams.get("sort") ?? "popularity";

  const location = searchParams.get("location") ?? "";
  const [cities, setCities] = useState<CityOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  const fetchCities = async (search: string) => {
    setIsLoading(true);
    try {
      const data = await getCities(search); // City[]
      setCities(
        data.map((city) => ({
          value: city.cityEn,
          label: `${city.cityEn}, ${city.countyEn}, ${city.stateEn}`,
        })),
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetFilters = () => {
    router.replace(basePath);
  };

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    if (value) params.set(key, value);
    else params.delete(key);

    router.replace(`${basePath}?${params.toString()}`);
  };

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
    <div className="filters">
      <SearchField
        value={query}
        onChangeAction={updateQuery}
        onSubmitAction={submitSearch}
        placeholder="Search"
      />
      {/* Category */}
      <select
        value={category}
        onChange={(e) => updateParam("category", e.target.value)}
      >
        <option value="">Category</option>
        {CATEGORIES.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      {/* Sex */}
      <select value={sex} onChange={(e) => updateParam("sex", e.target.value)}>
        <option value="">By gender</option>
        {SEXES.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      {/* Species */}
      <select
        value={species}
        onChange={(e) => updateParam("species", e.target.value)}
      >
        <option value="">By type</option>
        {SPECIES.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      {/* Sort */}
      <div>
        <label>
          <input
            type="radio"
            name="sort"
            value="popularity"
            checked={sort === "popularity"}
            onChange={(e) => updateParam("sort", e.target.value)}
          />
          Popular
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            value="popularity"
            checked={sort === "popularity"}
            onChange={(e) => updateParam("sort", e.target.value)}
          />
          Unpopular
        </label>

        <label>
          <input
            type="radio"
            name="sort"
            value="price"
            checked={sort === "price"}
            onChange={(e) => updateParam("sort", e.target.value)}
          />
          Cheap
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            value="price"
            checked={sort === "price"}
            onChange={(e) => updateParam("sort", e.target.value)}
          />
          Expensive
        </label>
      </div>{" "}
      {isClient && (
        <Select
          instanceId="cities-select"
          placeholder="Select city"
          isClearable
          isLoading={isLoading}
          options={cities}
          value={cities.find((c) => c.value === location) ?? null}
          onInputChange={(value) => {
            if (value.length >= 2) fetchCities(value); 
          }}
          onChange={(option) =>
            updateParam("location", option ? option.value : "")
          }
        />
      )}
      {/* Reset */}
      <button type="button" onClick={resetFilters}>
        Reset
      </button>
    </div>
  );
}
