"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Select, {
  components,
  type DropdownIndicatorProps,
  type StylesConfig,
} from "react-select";
import Image from "next/image";

import SearchField from "../SearchField/SearchField";
import {
  getCategoriesClient,
  getSexesClient,
  getSpeciesClient,
  getCities,
  type City,
} from "@/app/lib/api";

import css from "./NoticesFilters.module.css";
import { clsx } from "clsx";

type Props = {
  basePath?: string;
};

type Option = {
  value: string;
  label: string;
};

export default function NoticesFilters({ basePath = "/notices" }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sort = searchParams.get("sort") ?? "";

  const query = searchParams.get("query") ?? "";
  const category = searchParams.get("category") ?? "";
  const sex = searchParams.get("sex") ?? "";
  const species = searchParams.get("species") ?? "";
  const locationId = searchParams.get("locationId") ?? "";

  const [queryValue, setQueryValue] = useState(query);

  const [categoryOptions, setCategoryOptions] = useState<Option[]>([]);
  const [sexOptions, setSexOptions] = useState<Option[]>([]);
  const [speciesOptions, setSpeciesOptions] = useState<Option[]>([]);

  const [cities, setCities] = useState<Option[]>([]);
  const [isCitiesLoading, setIsCitiesLoading] = useState(false);

  const sortOptions = [
    { label: "Popular", value: "popular" },
    { label: "Unpopular", value: "unpopular" },
    { label: "Cheap", value: "cheap" },
    { label: "Expensive", value: "expensive" },
  ] as const;

  useEffect(() => {
    const run = async () => {
      try {
        const [categories, sexes, species] = await Promise.all([
          getCategoriesClient(),
          getSexesClient(),
          getSpeciesClient(),
        ]);

        setCategoryOptions(
          categories.map((v: string) => ({ value: v, label: capitalize(v) })),
        );
        setSexOptions(
          sexes.map((v: string) => ({ value: v, label: capitalize(v) })),
        );
        setSpeciesOptions(
          species.map((v: string) => ({ value: v, label: capitalize(v) })),
        );
      } catch (e) {
        console.error(e);
      }
    };

    run();
  }, []);

  useEffect(() => {
    setQueryValue(query);
  }, [query]);

  const updateParams = (patch: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    Object.entries(patch).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });

    router.replace(`${basePath}?${params.toString()}`);
  };

  const handleSearchSubmit = () => {
    updateParams({ query: queryValue.trim() });
  };

  const handleSearchClear = () => {
    setQueryValue("");
    updateParams({ query: "" });
  };

  const handleCitiesInput = async (value: string) => {
    setIsCitiesLoading(true);
    try {
      const data: City[] = await getCities(value.trim());
      setCities(
        data.map((c) => ({
          value: c._id,
          label: `${c.cityEn}, ${c.countyEn}, ${c.stateEn}`,
        })),
      );
    } finally {
      setIsCitiesLoading(false);
    }
  };

  const DropdownIndicator = (props: DropdownIndicatorProps<Option, false>) => (
    <components.DropdownIndicator {...props}>
      <Image src="/chevron-down.svg" width={18} height={18} alt="chevron" />
    </components.DropdownIndicator>
  );

  const SearchIndicator = (props: DropdownIndicatorProps<Option, false>) => (
    <components.DropdownIndicator {...props}>
      <Image src="/search.svg" alt="search" width={16} height={16} />
    </components.DropdownIndicator>
  );

  const selectStyles: StylesConfig<Option, false> = {
    control: (base) => ({
      ...base,
      backgroundColor: "var(--white-color)",
      border: "none",
      borderRadius: 30,
      boxShadow: "none",
      minHeight: 48,
      padding: "0 8px",
    }),
    indicatorSeparator: () => ({ display: "none" }),
    menu: (base) => ({ ...base, borderRadius: 15 }),
    option: (base, state) => ({
      ...base,
      backgroundColor: "transparent",
      width: "100%",
      color:
        state.isSelected || state.isFocused
          ? "var(--accent-color)"
          : "var(--title-color)",
    }),
  };

  const citySelectStyles: StylesConfig<Option, false> = {
    ...selectStyles,
    control: (base) => ({
      ...base,
      backgroundColor: "var(--white-color)",
      border: "none",
      borderRadius: 30,
      boxShadow: "none",
      minHeight: 48,
      padding: "0 12px",
      "&:hover": {
        border: "1px solid var(--accent-color)",
      },
    }),
    valueContainer: (base) => ({
      ...base,
      padding: 0,
      gap: 8,
    }),
    menu: (base) => ({
      ...base,
      borderRadius: 15,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: "transparent",
      color:
        state.isSelected || state.isFocused
          ? "var(--accent-color)"
          : "var(--title-color)",
    }),
  };

  return (
    <div className={css.noticesFilters}>
      <div className={css.noticesSearchFieldWrapp}>
        <SearchField
          value={queryValue}
          onChangeAction={setQueryValue}
          onSubmitAction={handleSearchSubmit}
          onClearAction={handleSearchClear}
          placeholder="Search"
          className={css.noticesSearchField}
        />
      </div>

      <div className={css.categorySexSelectsWrapper}>
        <Select
          instanceId="category-select"
          options={categoryOptions}
          placeholder="Category"
          value={categoryOptions.find((o) => o.value === category) || null}
          onChange={(o) => updateParams({ category: o?.value ?? "" })}
          styles={selectStyles}
          components={{ DropdownIndicator }}
          isSearchable={false}
        />

        <Select
          instanceId="sex-select"
          options={sexOptions}
          placeholder="By gender"
          value={sexOptions.find((o) => o.value === sex) || null}
          onChange={(o) => updateParams({ sex: o?.value ?? "" })}
          styles={selectStyles}
          components={{ DropdownIndicator }}
          isSearchable={false}
        />
      </div>

      <Select
        instanceId="species-select"
        options={speciesOptions}
        placeholder="By type"
        value={speciesOptions.find((o) => o.value === species) || null}
        onChange={(o) => updateParams({ species: o?.value ?? "" })}
        styles={selectStyles}
        components={{ DropdownIndicator }}
        isSearchable={false}
      />

      <Select
        instanceId="city-select"
        placeholder="Location"
        isClearable
        isLoading={isCitiesLoading}
        options={cities}
        value={cities.find((c) => c.value === locationId) ?? null}
        onInputChange={(value, meta) => {
          if (meta.action === "input-change" && value.trim().length >= 2) {
            void handleCitiesInput(value);
          }
          return value;
        }}
        onChange={(o) => updateParams({ locationId: o?.value ?? "" })}
        styles={citySelectStyles}
        components={{
          DropdownIndicator: SearchIndicator,
          IndicatorSeparator: () => null,
          ClearIndicator: () => null,
        }}
        isSearchable
      />

      <div className={css.sortContainer}>
        {sortOptions.map((s) => {
          const isActive = sort === s.value;

          return (
            <label
              key={s.value}
              className={clsx(
                css.sortButton,
                sort === s.value && css.sortButtonActive,
              )}
            >
              <input
                type="radio"
                name="sort"
                checked={isActive}
                onChange={() => updateParams({ sort: s.value })}
                className={css.sortRadio}
              />
              <span>{s.label}</span>

              {isActive && (
                <button
                  type="button"
                  className={css.sortResetBtn}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateParams({ sort: "" });
                  }}
                  aria-label={`Reset ${s.label} sort`}
                >
                  <svg className={css.logoIcon} width="18" height="18">
                    <use href="/symbol-defs.svg#icon-cross-white"></use>
                  </svg>
                </button>
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
}

function capitalize(v: string) {
  return v.charAt(0).toUpperCase() + v.slice(1);
}
