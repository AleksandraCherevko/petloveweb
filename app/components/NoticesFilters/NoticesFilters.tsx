"use client";

import { useRouter, useSearchParams } from "next/navigation";
import SearchField from "../SearchField/SearchField";
import { useState, useEffect } from "react";

import { getCities } from "@/app/lib/api";
import css from "./NoticesFilters.module.css";
import Select from "react-select";

import Image from "next/image";
import { components } from "react-select";
import type { DropdownIndicatorProps } from "react-select";
import type { StylesConfig } from "react-select";
import type { ControlProps } from "react-select";

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

  const categoryOptions = CATEGORIES.map((item) => ({
    value: item,
    label: item,
  }));

  const sexOptions = SEXES.map((item) => ({
    value: item,
    label: item.charAt(0).toUpperCase() + item.slice(1), // первая буква заглавная
  }));

  const speciesOptions = SPECIES.map((item) => ({
    value: item,
    label: item.charAt(0).toUpperCase() + item.slice(1),
  }));

  const DropdownIndicator = (
    props: DropdownIndicatorProps<CityOption, false>,
  ) => (
    <components.DropdownIndicator {...props}>
      <Image
        src="/chevron-down.svg"
        width={18}
        height={18}
        alt="chevron-icon"
      />
    </components.DropdownIndicator>
  );

  const selectStyles: StylesConfig<CityOption, false> = {
    control: (base) => ({
      ...base,
      backgroundColor: "var(--white-color)",
      border: "none",
      borderRadius: 30,
      padding: "12px 12px",
      width: 143,
      minHeight: "auto",
      boxShadow: "none",
      cursor: "pointer",

      fontFamily: "Manrope",
      fontWeight: 500,
      fontSize: 14,
      lineHeight: "1.2",
      letterSpacing: "-0.03em",

      "&:hover": {
        color: "var(--accent-color)",
      },
    }),

    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: 0,
    }),

    menu: (base) => ({
      ...base,
      backgroundColor: "var(--white-color)",
      borderRadius: 15,
      width: 143,
    }),

    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? "rgba(0,0,0,0.05)"
        : "var(--white-color)",
      color: state.isFocused ? "var(--accent-color)" : "inherit",
      fontFamily: "Manrope, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      "::first-letter": {
        textTransform: "uppercase",
      },
    }),

    singleValue: (base) => ({
      ...base,
      textTransform: "lowercase",
      "::first-letter": {
        textTransform: "uppercase",
      },
    }),
  };

  const ControlWithSearchIcon = (props: ControlProps<CityOption, false>) => (
    <components.Control {...props}>
      <Image
        src="/search.svg"
        alt="search"
        width={16}
        height={16}
        style={{ marginRight: 0 }}
      />
      {props.children}
    </components.Control>
  );

  const citySelectStyles: StylesConfig<CityOption, false> = {
    control: (base) => ({
      ...base,
      backgroundColor: "var(--white-color)",
      border: "none",
      borderRadius: 30,
      padding: "12px", // оставляем место слева под иконку
      width: 295,
      minHeight: "auto",
      boxShadow: "none",
      cursor: "text",
      fontFamily: "Manrope",
      fontWeight: 500,
      fontSize: 14,
      lineHeight: "1.2",
      letterSpacing: "-0.03em",
      position: "relative", // чтобы позиционировать иконку
      flexDirection: "row-reverse",
    }),
    menu: (base) => ({
      ...base,
      width: 295,
      borderRadius: 15,
      backgroundColor: "var(--white-color)",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? "rgba(0,0,0,0.05)"
        : "var(--white-color)",
      color: state.isFocused ? "var(--accent-color)" : "inherit",
      fontFamily: "Manrope, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textTransform: "capitalize",
    }),
    singleValue: (base) => ({
      ...base,
      fontFamily: "Manrope, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      textTransform: "capitalize",
    }),
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: () => ({ display: "none" }),
  };

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
    <div className={css.noticesFilters}>
      <div className={css.noticesSearchField}>
        <SearchField
          value={query}
          onChangeAction={updateQuery}
          onSubmitAction={submitSearch}
          placeholder="Search"
        />
      </div>
      {/* Category */}
      {isClient && (
        <Select
          instanceId="category-select"
          options={categoryOptions}
          placeholder="Category"
          value={categoryOptions.find((o) => o.value === category) || null}
          onChange={(option) =>
            updateParam("category", option ? option.value : "")
          }
          styles={selectStyles}
          components={{ DropdownIndicator }}
          isSearchable={false}
        />
      )}
      {/* Sex */}
      {isClient && (
        <Select
          instanceId="sex-select"
          options={sexOptions}
          placeholder="By gender"
          value={sexOptions.find((o) => o.value === sex) || null}
          onChange={(option) => updateParam("sex", option ? option.value : "")}
          styles={selectStyles}
          components={{ DropdownIndicator }}
          isSearchable={false}
        />
      )}
      {/* Species */}
      {isClient && (
        <Select
          instanceId="species-select"
          options={speciesOptions}
          placeholder="By type"
          value={speciesOptions.find((o) => o.value === species) || null}
          onChange={(option) =>
            updateParam("species", option ? option.value : "")
          }
          styles={selectStyles}
          components={{ DropdownIndicator }}
          isSearchable={false}
        />
      )}
      {isClient && (
        <Select
          instanceId="cities-select"
          placeholder="Location"
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
          styles={citySelectStyles}
          components={{
            Control: ControlWithSearchIcon,
            IndicatorSeparator: () => null,
            ClearIndicator: () => null,
          }}
          isSearchable
        />
      )}
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
      </div>

      {/* Reset */}
      <button type="button" onClick={resetFilters}>
        Reset
      </button>
    </div>
  );
}
